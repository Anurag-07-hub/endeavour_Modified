import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCMS, TeamCategory, Member, DocumentInfo, ContactInfo, DeletedMember } from '../context/CMSContext';
import { Users, FileText, Phone, Plus, Trash2, Edit2, LogOut, Check, X, Upload, RefreshCcw, Save, Undo, GripVertical, GitBranch, Loader } from 'lucide-react';
import { motion } from 'motion/react';

export const AdminDashboard = () => {
  const { user, isAdmin, logout } = useAuth();
  const { team, documents, contactInfo, deletedMembers, saveTeam, saveDocuments, saveContactInfo, saveDeletedMembers } = useCMS();
  const [activeTab, setActiveTab] = useState<'team' | 'docs' | 'contact' | 'recycle'>('team');

  // Draft Team State for reordering
  const [draftTeam, setDraftTeam] = useState<TeamCategory[]>(team);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [draggedMember, setDraggedMember] = useState<{catName: string, index: number} | null>(null);
  const [commitStatus, setCommitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [commitMessage, setCommitMessage] = useState('');
  const [contactCommitStatus, setContactCommitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [contactCommitMessage, setContactCommitMessage] = useState('');
  const [docCommitStatus, setDocCommitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [docCommitMessage, setDocCommitMessage] = useState('');

  useEffect(() => {
    setDraftTeam(team);
    setHasUnsavedChanges(false);
  }, [team]);

  // Contact State
  const [contactEdit, setContactEdit] = useState<ContactInfo>(contactInfo);

  // Docs State
  const [newDoc, setNewDoc] = useState<Partial<DocumentInfo>>({});

  if (!user || !isAdmin) {
    return <Navigate to="/join-us" />;
  }

  const handleContactSave = () => {
    saveContactInfo(contactEdit);
    alert('Contact info updated successfully!');
  };

  const handleAddDoc = () => {
    if (newDoc.title && newDoc.driveLink) {
      const doc: DocumentInfo = {
        id: Math.random().toString(36).substr(2, 9),
        title: newDoc.title,
        description: newDoc.description || '',
        driveLink: newDoc.driveLink,
        isPublic: !!newDoc.isPublic,
      };
      saveDocuments([...documents, doc]);
      setNewDoc({});
    } else {
      alert("Please provide title and link");
    }
  };

  const toggleDocPublic = (id: string) => {
    saveDocuments(documents.map(d => d.id === id ? { ...d, isPublic: !d.isPublic } : d));
  };

  const removeDoc = (id: string) => {
    saveDocuments(documents.filter(d => d.id !== id));
  };

  // Simple Team Member Addition to first category for simplicity in demo
  // In a real app, you'd select the category
  const [newMember, setNewMember] = useState<Partial<Member>>({});
  const [targetCategory, setTargetCategory] = useState<string>(team[1]?.category || '');

  const handleAddMember = () => {
    if (newMember.name && newMember.position && targetCategory) {
      const member: Member = {
        id: Math.random().toString(36).substr(2, 9),
        name: newMember.name,
        position: newMember.position,
        image: newMember.image || 'https://via.placeholder.com/150',
        linkedin: newMember.linkedin,
        email: newMember.email,
      };
      
      const newTeam = team.map(cat => {
        if (cat.category === targetCategory && cat.members) {
          return { ...cat, members: [...cat.members, member] };
        }
        return cat;
      });
      saveTeam(newTeam);
      setNewMember({});
    } else {
      alert("Please provide name, position and select a category");
    }
  };

  const removeMember = (catName: string | undefined, memberId: string) => {
    if (!catName) return;
    
    // Find member to delete
    const category = team.find(c => c.category === catName);
    const memberIndex = category?.members?.findIndex(m => m.id === memberId);
    
    if (category && category.members && memberIndex !== undefined && memberIndex !== -1) {
      const memberToDelete = category.members[memberIndex];
      saveDeletedMembers([...deletedMembers, {
        category: catName,
        member: memberToDelete,
        deletedAt: Date.now(),
        originalIndex: memberIndex
      }]);
    }

    const newTeam = team.map(cat => {
      if (cat.category === catName && cat.members) {
        return { ...cat, members: cat.members.filter(m => m.id !== memberId) };
      }
      return cat;
    });
    saveTeam(newTeam);
  };

  const handleRestoreMember = (deletedMember: DeletedMember) => {
    const newTeam = team.map(cat => {
      if (cat.category === deletedMember.category) {
        const members = [...(cat.members || [])];
        const insertIndex = Math.min(deletedMember.originalIndex || 0, members.length);
        members.splice(insertIndex, 0, deletedMember.member);
        return { ...cat, members };
      }
      return cat;
    });
    saveTeam(newTeam);
    saveDeletedMembers(deletedMembers.filter(d => d.member.id !== deletedMember.member.id));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMember({ ...newMember, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Editing state
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [editFormState, setEditFormState] = useState<Partial<Member>>({});

  const handleEditClick = (member: Member) => {
    setEditingMemberId(member.id);
    setEditFormState(member);
  };

  const handleCancelEdit = () => {
    setEditingMemberId(null);
    setEditFormState({});
  };

  const handleSaveEdit = (catName: string) => {
    if (!editingMemberId) return;
    
    const newTeam = team.map(cat => {
      if (cat.category === catName && cat.members) {
        return {
          ...cat,
          members: cat.members.map(m => m.id === editingMemberId ? { ...m, ...editFormState } as Member : m)
        };
      }
      return cat;
    });
    saveTeam(newTeam);

    const newDraft = draftTeam.map(cat => {
      if (cat.category === catName && cat.members) {
        return {
          ...cat,
          members: cat.members.map(m => m.id === editingMemberId ? { ...m, ...editFormState } as Member : m)
        };
      }
      return cat;
    });
    setDraftTeam(newDraft);

    setEditingMemberId(null);
    setEditFormState({});
  };
  
  const handleEditImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFormState({ ...editFormState, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragStart = (e: React.DragEvent, catName: string, index: number) => {
    setDraggedMember({ catName, index });
    e.dataTransfer.effectAllowed = 'move';
    // Optional: make it look semi-transparent while dragging
    setTimeout(() => {
      const target = e.target as HTMLElement;
      if (target && target.style) {
        target.style.opacity = '0.4';
      }
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.target as HTMLElement;
    if (target && target.style) {
      target.style.opacity = '1';
    }
    setDraggedMember(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetCatName: string, targetIndex: number) => {
    e.preventDefault();
    if (!draggedMember) return;
    if (draggedMember.catName !== targetCatName) return; // Only allow reordering within the same category
    if (draggedMember.index === targetIndex) return;

    const newDraft = [...draftTeam];
    const catIndex = newDraft.findIndex(c => c.category === targetCatName);
    if (catIndex === -1) return;
    
    const members = [...(newDraft[catIndex].members || [])];
    
    // Remove from old index
    const [movedItem] = members.splice(draggedMember.index, 1);
    // Insert at new index
    members.splice(targetIndex, 0, movedItem);
    
    newDraft[catIndex] = { ...newDraft[catIndex], members };
    setDraftTeam(newDraft);
    setHasUnsavedChanges(true);
    setDraggedMember(null);
  };

  const handleSaveOrder = () => {
    saveTeam(draftTeam);
    setHasUnsavedChanges(false);
    alert('Team order saved successfully!');
  };

  const handleUndoOrder = () => {
    setDraftTeam(team);
    setHasUnsavedChanges(false);
  };

  /**
   * Calls the local CMS API server (port 3001) to write team.ts
   * and create a git commit. Contact info is intentionally excluded —
   * it stays in localStorage only and is never committed to Git.
   */
  const handleCommitToGit = async () => {
    setCommitStatus('loading');
    try {
      const res = await fetch('http://localhost:3001/api/commit-team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          team,
          commitMessage: commitMessage.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCommitStatus('success');
        setCommitMessage('');
        setTimeout(() => setCommitStatus('idle'), 4000);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err: any) {
      console.error('Git commit failed:', err);
      setCommitStatus('error');
      setTimeout(() => setCommitStatus('idle'), 5000);
    }
  };

  const handleCommitContactToGit = async () => {
    setContactCommitStatus('loading');
    try {
      const res = await fetch('http://localhost:3001/api/commit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: contactInfo,
          commitMessage: contactCommitMessage.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setContactCommitStatus('success');
        setContactCommitMessage('');
        setTimeout(() => setContactCommitStatus('idle'), 4000);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err: any) {
      console.error('Git commit failed:', err);
      setContactCommitStatus('error');
      setTimeout(() => setContactCommitStatus('idle'), 5000);
    }
  };

  const handleCommitDocsToGit = async () => {
    setDocCommitStatus('loading');
    try {
      const res = await fetch('http://localhost:3001/api/commit-documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documents,
          commitMessage: docCommitMessage.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setDocCommitStatus('success');
        setDocCommitMessage('');
        setTimeout(() => setDocCommitStatus('idle'), 4000);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err: any) {
      console.error('Git commit failed:', err);
      setDocCommitStatus('error');
      setTimeout(() => setDocCommitStatus('idle'), 5000);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-brand-bg text-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-[1px] text-brand-accent">
              Admin Portal
            </h1>
            <p className="text-brand-muted text-[13px] uppercase tracking-[1px]">Manage site content and settings</p>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-bold text-[12px] uppercase tracking-[1px]">Logout</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-2">
            <button
              onClick={() => setActiveTab('team')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all border font-bold text-[12px] uppercase tracking-[1px] ${
                activeTab === 'team' ? 'bg-brand-accent border-brand-accent text-white shadow-[0_0_15px_rgba(164,5,5,0.4)]' : 'bg-transparent border-brand-accent/25 text-brand-muted hover:border-brand-accent/60'
              }`}
            >
              <Users className="w-5 h-5" /> Team
            </button>
            <button
              onClick={() => setActiveTab('recycle')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all border font-bold text-[12px] uppercase tracking-[1px] ${
                activeTab === 'recycle' ? 'bg-brand-accent border-brand-accent text-white shadow-[0_0_15px_rgba(164,5,5,0.4)]' : 'bg-transparent border-brand-accent/25 text-brand-muted hover:border-brand-accent/60'
              }`}
            >
              <Trash2 className="w-5 h-5" /> Recycle Bin
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all border font-bold text-[12px] uppercase tracking-[1px] ${
                activeTab === 'docs' ? 'bg-brand-accent border-brand-accent text-white shadow-[0_0_15px_rgba(164,5,5,0.4)]' : 'bg-transparent border-brand-accent/25 text-brand-muted hover:border-brand-accent/60'
              }`}
            >
              <FileText className="w-5 h-5" /> Documentation
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all border font-bold text-[12px] uppercase tracking-[1px] ${
                activeTab === 'contact' ? 'bg-brand-accent border-brand-accent text-white shadow-[0_0_15px_rgba(164,5,5,0.4)]' : 'bg-transparent border-brand-accent/25 text-brand-muted hover:border-brand-accent/60'
              }`}
            >
              <Phone className="w-5 h-5" /> Contact Info
            </button>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3 bg-brand-bg border border-brand-accent/25 rounded-2xl p-6 shadow-[0_0_0_1px_rgba(164,5,5,0.08),0_4px_24px_rgba(164,5,5,0.10)] relative">
            
            {/* Team Tab */}
            {activeTab === 'team' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-black uppercase tracking-[1px] text-white mb-6">Team Management</h2>
                
                {/* Add Member Form */}
                <div className="bg-brand-accent/5 p-4 rounded-xl mb-8 border border-brand-accent/25">
                  <h3 className="font-bold mb-4 text-brand-accent uppercase tracking-[1px] text-[13px]">Add New Member</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input 
                      type="text" placeholder="Full Name" 
                      value={newMember.name || ''} onChange={e => setNewMember({...newMember, name: e.target.value})}
                      className="bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-white focus:border-brand-accent focus:outline-none" 
                    />
                    <input 
                      type="text" placeholder="Position (e.g. Coordinator)" 
                      value={newMember.position || ''} onChange={e => setNewMember({...newMember, position: e.target.value})}
                      className="bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-white focus:border-brand-accent focus:outline-none" 
                    />
                    <div className="flex gap-2">
                      <input 
                        type="text" placeholder="Image URL" 
                        value={newMember.image || ''} onChange={e => setNewMember({...newMember, image: e.target.value})}
                        className="flex-1 bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-white focus:border-brand-accent focus:outline-none min-w-0" 
                      />
                      <label className="bg-brand-bg border border-brand-accent/25 rounded-lg px-3 py-2 text-white flex items-center gap-2 cursor-pointer hover:border-brand-accent transition shrink-0 group" title="Upload from Device">
                        <Upload className="w-4 h-4 text-brand-accent group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-[1px] text-brand-muted group-hover:text-white transition-colors">Upload</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </label>
                    </div>
                    <select 
                      value={targetCategory} onChange={e => setTargetCategory(e.target.value)}
                      className="bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-white focus:border-brand-accent focus:outline-none"
                    >
                      {team.filter(c => c.category).map(c => (
                        <option key={c.category} value={c.category}>{c.category}</option>
                      ))}
                    </select>
                  </div>
                  <button onClick={handleAddMember} className="bg-brand-accent text-white font-bold text-[12px] uppercase tracking-[1px] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-accent/90 transition">
                    <Plus className="w-4 h-4" /> Add Member
                  </button>
                </div>

                {/* Git Commit Panel */}
                <div className="bg-[#0a0a0a] border border-brand-accent/30 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <GitBranch className="w-4 h-4 text-brand-accent" />
                    <span className="font-bold text-[12px] uppercase tracking-[1px] text-brand-accent">Commit Team to Git</span>
                  </div>
                  <p className="text-[11px] text-brand-muted mb-3 leading-[1.5]">
                    This writes <code className="text-brand-accent bg-brand-accent/10 px-1 rounded">src/data/team.ts</code> and creates a git commit. Make sure the <code className="text-brand-accent bg-brand-accent/10 px-1 rounded">npm run server</code> CMS API is running on port 3001.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Commit message (optional)"
                      value={commitMessage}
                      onChange={e => setCommitMessage(e.target.value)}
                      className="flex-1 bg-brand-bg border border-brand-accent/25 rounded-lg px-3 py-2 text-white text-[12px] focus:border-brand-accent focus:outline-none"
                    />
                    <button
                      onClick={handleCommitToGit}
                      disabled={commitStatus === 'loading'}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-[12px] uppercase tracking-[1px] transition ${
                        commitStatus === 'success'
                          ? 'bg-green-600 text-white'
                          : commitStatus === 'error'
                          ? 'bg-red-600 text-white'
                          : 'bg-brand-accent text-white hover:bg-brand-accent/90'
                      } disabled:opacity-60`}
                    >
                      {commitStatus === 'loading' ? (
                        <><Loader className="w-4 h-4 animate-spin" /> Committing...</>
                      ) : commitStatus === 'success' ? (
                        <><Check className="w-4 h-4" /> Committed!</>
                      ) : commitStatus === 'error' ? (
                        <><X className="w-4 h-4" /> Failed — check server</>  
                      ) : (
                        <><GitBranch className="w-4 h-4" /> Commit to Git</>
                      )}
                    </button>
                  </div>
                </div>

                {/* List Members */}
                <div className="space-y-6">
                  {/* Save/Undo Bar */}
                  {hasUnsavedChanges && (
                    <div className="bg-brand-accent/10 border border-brand-accent text-brand-accent p-4 rounded-xl flex items-center justify-between mb-6 shadow-[0_0_15px_rgba(164,5,5,0.2)]">
                      <p className="font-bold text-[12px] uppercase tracking-[1px]">Unsaved order changes</p>
                      <div className="flex gap-2">
                        <button onClick={handleUndoOrder} className="flex items-center gap-1 px-3 py-1.5 border border-brand-accent/50 rounded hover:bg-brand-accent/20 transition">
                          <Undo className="w-3 h-3" /> <span className="text-[10px] font-bold uppercase tracking-[1px]">Undo</span>
                        </button>
                        <button onClick={handleSaveOrder} className="flex items-center gap-1 px-3 py-1.5 bg-brand-accent text-white rounded hover:bg-brand-accent/90 transition">
                          <Save className="w-3 h-3" /> <span className="text-[10px] font-bold uppercase tracking-[1px]">Save Order</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {draftTeam.filter(c => c.category).map(category => (
                    <div key={category.category}>
                      <h3 className="text-[14px] font-bold uppercase tracking-[2px] text-brand-muted mb-3 border-b border-brand-accent/25 pb-2">{category.category}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {category.members?.map((member, index) => (
                          <div 
                            key={member.id} 
                            draggable={editingMemberId !== member.id}
                            onDragStart={(e) => handleDragStart(e, category.category!, index)}
                            onDragEnd={handleDragEnd}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, category.category!, index)}
                            className={`bg-brand-bg border rounded-lg p-3 flex items-center justify-between shadow-sm transition ${editingMemberId === member.id ? 'border-brand-accent' : 'border-brand-accent/10 hover:border-brand-accent/40 cursor-grab active:cursor-grabbing'}`}
                          >
                            {editingMemberId === member.id ? (
                              <div className="flex-1 space-y-2 pr-2 w-full">
                                <input 
                                  type="text" value={editFormState.name || ''} 
                                  onChange={e => setEditFormState({...editFormState, name: e.target.value})}
                                  className="w-full bg-brand-bg border border-brand-accent/25 rounded px-2 py-1 text-white focus:border-brand-accent text-[12px] focus:outline-none" 
                                  placeholder="Name"
                                />
                                <input 
                                  type="text" value={editFormState.position || ''} 
                                  onChange={e => setEditFormState({...editFormState, position: e.target.value})}
                                  className="w-full bg-brand-bg border border-brand-accent/25 rounded px-2 py-1 text-white focus:border-brand-accent text-[12px] focus:outline-none" 
                                  placeholder="Position"
                                />
                                {editFormState.image && (
                                  <div className="flex items-center gap-3 bg-brand-accent/5 border border-brand-accent/15 rounded p-2 mb-1">
                                    <img src={editFormState.image} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-brand-accent/30 shrink-0" onError={e => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48?text=?'; }} />
                                    <span className="text-[10px] text-brand-muted uppercase tracking-[1px]">Image preview</span>
                                  </div>
                                )}
                                <div className="flex gap-2">
                                  <input 
                                    type="text" value={editFormState.image || ''} 
                                    onChange={e => setEditFormState({...editFormState, image: e.target.value})}
                                    className="flex-1 bg-brand-bg border border-brand-accent/25 rounded px-2 py-1 text-white focus:border-brand-accent text-[12px] min-w-0 focus:outline-none" 
                                    placeholder="Image URL"
                                  />
                                  <label className="bg-brand-accent/10 text-brand-accent px-2 py-1 rounded cursor-pointer hover:bg-brand-accent hover:text-white transition flex items-center justify-center shrink-0" title="Upload Image">
                                    <Upload className="w-3 h-3" />
                                    <input type="file" accept="image/*" className="hidden" onChange={handleEditImageUpload} />
                                  </label>
                                </div>
                                <div className="flex justify-end gap-2 mt-2">
                                  <button onClick={handleCancelEdit} className="text-[10px] font-bold uppercase tracking-[1px] text-brand-muted hover:text-white transition">Cancel</button>
                                  <button onClick={() => handleSaveEdit(category.category!)} className="text-[10px] font-bold uppercase tracking-[1px] bg-brand-accent text-white px-3 py-1 rounded hover:bg-brand-accent/90 transition">Save</button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="flex items-center gap-3">
                                  <div className="text-brand-muted/50 hover:text-brand-accent transition cursor-grab active:cursor-grabbing px-1">
                                    <GripVertical className="w-5 h-5" />
                                  </div>
                                  <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-brand-accent/20" pointerEvents="none" />
                                  <div>
                                    <p className="font-bold text-[13px] uppercase tracking-[1px]">{member.name}</p>
                                    <p className="text-[11px] uppercase tracking-[1px] text-brand-muted">{member.position}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <button onClick={() => handleEditClick(member)} className="text-red-500 hover:bg-red-500/10 hover:text-red-400 transition p-2 rounded-lg border border-transparent" title="Edit Member">
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button onClick={() => removeMember(category.category, member.id)} className="text-red-500 hover:bg-red-500/10 hover:text-red-400 transition p-2 rounded-lg border border-transparent" title="Delete Member">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Recycle Bin Tab */}
            {activeTab === 'recycle' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-black uppercase tracking-[1px] text-white mb-6">Recycle Bin</h2>
                
                <div className="space-y-4">
                  {deletedMembers.length > 0 ? deletedMembers.map(deleted => (
                    <div key={deleted.member.id} className="bg-brand-bg border border-brand-accent/10 rounded-lg p-4 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-4">
                        <img src={deleted.member.image} alt={deleted.member.name} className="w-12 h-12 rounded-full object-cover border border-brand-accent/20 grayscale opacity-70" />
                        <div>
                          <p className="font-bold text-[14px] uppercase tracking-[1px] text-brand-muted">{deleted.member.name}</p>
                          <p className="text-[11px] uppercase tracking-[1px] text-brand-muted/70">
                            {deleted.member.position} • Removed from <span className="text-brand-accent">{deleted.category}</span>
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleRestoreMember(deleted)} 
                        className="flex items-center gap-2 bg-brand-accent/10 text-brand-accent border border-brand-accent/30 hover:bg-brand-accent hover:text-white transition px-4 py-2 rounded-lg"
                        title="Restore Member"
                      >
                        <RefreshCcw className="w-4 h-4" />
                        <span className="font-bold text-[11px] uppercase tracking-[1px] hidden sm:inline">Restore</span>
                      </button>
                    </div>
                  )) : (
                    <div className="text-center py-12">
                      <Trash2 className="w-12 h-12 text-brand-muted/30 mx-auto mb-4" />
                      <p className="text-[12px] font-bold uppercase tracking-[1px] text-brand-muted">Recycle bin is empty</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Documentation Tab */}
            {activeTab === 'docs' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-black uppercase tracking-[1px] text-white mb-6">Documentation Management</h2>
                
                {/* Git Commit Panel for Documents */}
                <div className="bg-[#0a0a0a] border border-brand-accent/30 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <GitBranch className="w-4 h-4 text-brand-accent" />
                    <span className="font-bold text-[12px] uppercase tracking-[1px] text-brand-accent">Commit Documents to Git</span>
                  </div>
                  <p className="text-[11px] text-brand-muted mb-3 leading-[1.5]">
                    This writes <code className="text-brand-accent bg-brand-accent/10 px-1 rounded">src/data/documents.ts</code> and creates a git commit. Make sure the <code className="text-brand-accent bg-brand-accent/10 px-1 rounded">npm run server</code> CMS API is running on port 3001.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Commit message (optional)"
                      value={docCommitMessage}
                      onChange={e => setDocCommitMessage(e.target.value)}
                      className="flex-1 bg-brand-bg border border-brand-accent/25 rounded-lg px-3 py-2 text-white text-[12px] focus:border-brand-accent focus:outline-none"
                    />
                    <button
                      onClick={handleCommitDocsToGit}
                      disabled={docCommitStatus === 'loading'}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-[12px] uppercase tracking-[1px] transition ${
                        docCommitStatus === 'success'
                          ? 'bg-green-600 text-white'
                          : docCommitStatus === 'error'
                          ? 'bg-red-600 text-white'
                          : 'bg-brand-accent text-white hover:bg-brand-accent/90'
                      } disabled:opacity-60`}
                    >
                      {docCommitStatus === 'loading' ? (
                        <><Loader className="w-4 h-4 animate-spin" /> Committing...</>
                      ) : docCommitStatus === 'success' ? (
                        <><Check className="w-4 h-4" /> Committed!</>
                      ) : docCommitStatus === 'error' ? (
                        <><X className="w-4 h-4" /> Failed — check server</>
                      ) : (
                        <><GitBranch className="w-4 h-4" /> Commit to Git</>
                      )}
                    </button>
                  </div>
                </div>

                {/* Add Document Form */}
                <div className="bg-brand-accent/5 p-4 rounded-xl mb-8 border border-brand-accent/25">
                  <h3 className="font-bold mb-4 text-brand-accent uppercase tracking-[1px] text-[13px]">Add Document (Up to 15GB Link)</h3>
                  <div className="space-y-4 mb-4">
                    <input 
                      type="text" placeholder="Document Title" 
                      value={newDoc.title || ''} onChange={e => setNewDoc({...newDoc, title: e.target.value})}
                      className="w-full bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-white focus:border-brand-accent focus:outline-none" 
                    />
                    <textarea 
                      placeholder="Project Description" 
                      value={newDoc.description || ''} onChange={e => setNewDoc({...newDoc, description: e.target.value})}
                      className="w-full bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 h-24 text-white focus:border-brand-accent focus:outline-none" 
                    />
                    <input 
                      type="text" placeholder="Google Drive / Cloud Link" 
                      value={newDoc.driveLink || ''} onChange={e => setNewDoc({...newDoc, driveLink: e.target.value})}
                      className="w-full bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-white focus:border-brand-accent focus:outline-none" 
                    />
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={!!newDoc.isPublic} 
                        onChange={e => setNewDoc({...newDoc, isPublic: e.target.checked})}
                        className="rounded border-brand-accent/40 bg-brand-bg text-brand-accent focus:ring-brand-accent"
                      />
                      <span className="text-[12px] font-bold text-brand-muted uppercase tracking-[1px]">Showcase on web (Visible to everyone)</span>
                    </label>
                  </div>
                  <button onClick={handleAddDoc} className="bg-brand-accent text-white font-bold text-[12px] uppercase tracking-[1px] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-accent/90 transition">
                    <Plus className="w-4 h-4" /> Add Document
                  </button>
                </div>

                {/* List Documents */}
                <div className="space-y-4">
                  {documents.map(doc => (
                    <div key={doc.id} className="bg-brand-bg rounded-lg p-4 flex flex-col md:flex-row justify-between gap-4 border border-brand-accent/25 shadow-sm hover:border-brand-accent/50 transition">
                      <div>
                        <h4 className="font-bold text-[14px] uppercase tracking-[1px] flex items-center gap-2">
                          {doc.title}
                          {doc.isPublic ? 
                            <span className="text-[9px] bg-brand-accent text-white px-2 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-[1px]"><Check className="w-3 h-3"/> Web</span> : 
                            <span className="text-[9px] bg-brand-muted/20 text-brand-muted px-2 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-[1px]"><X className="w-3 h-3"/> Hidden</span>
                          }
                        </h4>
                        <p className="text-[12px] text-brand-muted mt-1 leading-[1.6]">{doc.description}</p>
                        <a href={doc.driveLink} target="_blank" rel="noopener noreferrer" className="text-brand-accent text-[11px] font-bold uppercase tracking-[1px] hover:underline mt-2 inline-block">
                          View Link Attachment
                        </a>
                      </div>
                      <div className="flex items-start gap-2">
                        <button 
                          onClick={() => toggleDocPublic(doc.id)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[1px] transition-colors border ${doc.isPublic ? 'border-brand-muted/40 text-brand-muted hover:bg-brand-muted/10' : 'bg-brand-accent text-white border-brand-accent hover:bg-brand-accent/90'}`}
                        >
                          {doc.isPublic ? 'Hide' : 'Showcase'}
                        </button>
                        <button onClick={() => removeDoc(doc.id)} className="p-1.5 border border-transparent text-red-500 rounded-lg hover:border-red-500 hover:bg-red-500 hover:text-white transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {documents.length === 0 && <p className="text-brand-muted text-[12px] uppercase tracking-[1px] text-center py-4">No documents uploaded yet.</p>}
                </div>
              </motion.div>
            )}

            {/* Contact Info Tab */}
            {activeTab === 'contact' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-black uppercase tracking-[1px] text-white mb-4">Contact Details</h2>

                {/* Git Commit Panel for Contact */}
                <div className="bg-[#0a0a0a] border border-brand-accent/30 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <GitBranch className="w-4 h-4 text-brand-accent" />
                    <span className="font-bold text-[12px] uppercase tracking-[1px] text-brand-accent">Commit Contact to Git</span>
                  </div>
                  <p className="text-[11px] text-brand-muted mb-3 leading-[1.5]">
                    First save your changes below, then click this to write <code className="text-brand-accent bg-brand-accent/10 px-1 rounded">src/data/contact.ts</code> and create a git commit.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Commit message (optional)"
                      value={contactCommitMessage}
                      onChange={e => setContactCommitMessage(e.target.value)}
                      className="flex-1 bg-brand-bg border border-brand-accent/25 rounded-lg px-3 py-2 text-white text-[12px] focus:border-brand-accent focus:outline-none"
                    />
                    <button
                      onClick={handleCommitContactToGit}
                      disabled={contactCommitStatus === 'loading'}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-[12px] uppercase tracking-[1px] transition ${
                        contactCommitStatus === 'success'
                          ? 'bg-green-600 text-white'
                          : contactCommitStatus === 'error'
                          ? 'bg-red-600 text-white'
                          : 'bg-brand-accent text-white hover:bg-brand-accent/90'
                      } disabled:opacity-60`}
                    >
                      {contactCommitStatus === 'loading' ? (
                        <><Loader className="w-4 h-4 animate-spin" /> Committing...</>
                      ) : contactCommitStatus === 'success' ? (
                        <><Check className="w-4 h-4" /> Committed!</>
                      ) : contactCommitStatus === 'error' ? (
                        <><X className="w-4 h-4" /> Failed — check server</>
                      ) : (
                        <><GitBranch className="w-4 h-4" /> Commit to Git</>
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-[11px] font-bold text-brand-muted uppercase tracking-[1px] mb-1">Email Address</label>
                    <input 
                      type="text" value={contactEdit.email} onChange={e => setContactEdit({...contactEdit, email: e.target.value})}
                      className="w-full bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-white focus:border-brand-accent focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-brand-muted uppercase tracking-[1px] mb-1">Main Phone Number</label>
                    <input 
                      type="text" value={contactEdit.phone} onChange={e => setContactEdit({...contactEdit, phone: e.target.value})}
                      className="w-full bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-white focus:border-brand-accent focus:outline-none" 
                    />
                  </div>
                  
                  {/* Two contacts */}
                  <div className="pt-4 border-t border-white/10">
                    <label className="block text-[11px] font-bold text-brand-muted uppercase tracking-[1px] mb-2">Member Contact 1</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" placeholder="Name" value={contactEdit.contacts?.[0]?.name || ''} 
                        onChange={e => setContactEdit({...contactEdit, contacts: [{...contactEdit.contacts?.[0] || {name:'', phone:''}, name: e.target.value}, contactEdit.contacts?.[1] || {name:'', phone:''}]})}
                        className="flex-1 bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-white focus:border-brand-accent focus:outline-none text-[12px]" 
                      />
                      <input 
                        type="text" placeholder="Phone" value={contactEdit.contacts?.[0]?.phone || ''} 
                        onChange={e => setContactEdit({...contactEdit, contacts: [{...contactEdit.contacts?.[0] || {name:'', phone:''}, phone: e.target.value}, contactEdit.contacts?.[1] || {name:'', phone:''}]})}
                        className="flex-1 bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-white focus:border-brand-accent focus:outline-none text-[12px]" 
                      />
                    </div>
                  </div>
                  <div className="pb-4 border-b border-white/10">
                    <label className="block text-[11px] font-bold text-brand-muted uppercase tracking-[1px] mb-2">Member Contact 2</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" placeholder="Name" value={contactEdit.contacts?.[1]?.name || ''} 
                        onChange={e => setContactEdit({...contactEdit, contacts: [contactEdit.contacts?.[0] || {name:'', phone:''}, {...contactEdit.contacts?.[1] || {name:'', phone:''}, name: e.target.value}]})}
                        className="flex-1 bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-white focus:border-brand-accent focus:outline-none text-[12px]" 
                      />
                      <input 
                        type="text" placeholder="Phone" value={contactEdit.contacts?.[1]?.phone || ''} 
                        onChange={e => setContactEdit({...contactEdit, contacts: [contactEdit.contacts?.[0] || {name:'', phone:''}, {...contactEdit.contacts?.[1] || {name:'', phone:''}, phone: e.target.value}]})}
                        className="flex-1 bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-white focus:border-brand-accent focus:outline-none text-[12px]" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-brand-muted uppercase tracking-[1px] mb-1">Main Region / Address</label>
                    <textarea 
                      value={contactEdit.address} onChange={e => setContactEdit({...contactEdit, address: e.target.value})}
                      className="w-full bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 h-24 text-white focus:border-brand-accent focus:outline-none" 
                    />
                  </div>
                  <button onClick={handleContactSave} className="bg-brand-accent text-white font-bold uppercase tracking-[1px] text-[12px] px-6 py-3 rounded-lg hover:bg-brand-accent/90 transition mt-4">
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
