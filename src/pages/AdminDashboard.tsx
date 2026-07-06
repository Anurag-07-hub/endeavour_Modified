import React, { useState, useEffect, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCMS, TeamCategory, Member, DocumentInfo, ContactInfo, DeletedMember } from '../context/CMSContext';
import { GalleryItem } from '../data/gallery';
import { Users, FileText, Phone, Plus, Trash2, Edit2, LogOut, Check, X, Upload, RefreshCcw, Save, Undo, GripVertical, GitBranch, Loader, Image as ImageIcon, Sliders } from 'lucide-react';
import { motion } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';

function AdminCarModel({ scale, position, rotation }: { scale: number; position: [number, number, number]; rotation: [number, number, number] }) {
  const { scene } = useGLTF('/textured_mesh.glb');
  return <primitive object={scene} scale={scale} position={position} rotation={rotation} />;
}

export const AdminDashboard = () => {
  const { user, isAdmin, logout } = useAuth();
  const { team, documents, contactInfo, deletedMembers, gallery, model3D, recruitment, saveTeam, saveDocuments, saveContactInfo, saveDeletedMembers, saveGallery, saveModel3D, saveRecruitment } = useCMS();
  const [activeTab, setActiveTab] = useState<'team' | 'docs' | 'contact' | 'recycle' | 'gallery' | 'model3d' | 'recruitment' | 'domains'>('team');

  const apiBase = `http://${window.location.hostname}:3001`;

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
  const [galleryCommitStatus, setGalleryCommitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [galleryCommitMessage, setGalleryCommitMessage] = useState('');
  const [recruitmentCommitStatus, setRecruitmentCommitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [recruitmentCommitMessage, setRecruitmentCommitMessage] = useState('');

  // 3D Model Local Editing States
  const [modelScale, setModelScale] = useState<number>(model3D ? model3D.scale : 3.4);
  const [modelPosX, setModelPosX] = useState<number>(model3D ? model3D.position[0] : 0.3);
  const [modelPosY, setModelPosY] = useState<number>(model3D ? model3D.position[1] : -0.3);
  const [modelPosZ, setModelPosZ] = useState<number>(model3D ? model3D.position[2] : 0.0);
  const [modelRotX, setModelRotX] = useState<number>(model3D ? model3D.rotation[0] : 0.02);
  const [modelRotY, setModelRotY] = useState<number>(model3D ? model3D.rotation[1] : 0.89);
  const [modelRotZ, setModelRotZ] = useState<number>(model3D ? model3D.rotation[2] : 0.02);

  const [modelCommitStatus, setModelCommitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [modelCommitMessage, setModelCommitMessage] = useState('');

  // Sync state if CMS model3D updates
  useEffect(() => {
    if (model3D) {
      setModelScale(model3D.scale);
      setModelPosX(model3D.position[0]);
      setModelPosY(model3D.position[1]);
      setModelPosZ(model3D.position[2]);
      setModelRotX(model3D.rotation[0]);
      setModelRotY(model3D.rotation[1]);
      setModelRotZ(model3D.rotation[2]);
    }
  }, [model3D]);

  const handleModel3DChange = (key: string, value: number) => {
    let nextScale = modelScale;
    let nextPosX = modelPosX;
    let nextPosY = modelPosY;
    let nextPosZ = modelPosZ;
    let nextRotX = modelRotX;
    let nextRotY = modelRotY;
    let nextRotZ = modelRotZ;

    if (key === 'scale') { setModelScale(value); nextScale = value; }
    else if (key === 'posX') { setModelPosX(value); nextPosX = value; }
    else if (key === 'posY') { setModelPosY(value); nextPosY = value; }
    else if (key === 'posZ') { setModelPosZ(value); nextPosZ = value; }
    else if (key === 'rotX') { setModelRotX(value); nextRotX = value; }
    else if (key === 'rotY') { setModelRotY(value); nextRotY = value; }
    else if (key === 'rotZ') { setModelRotZ(value); nextRotZ = value; }

    saveModel3D({
      scale: nextScale,
      position: [nextPosX, nextPosY, nextPosZ],
      rotation: [nextRotX, nextRotY, nextRotZ]
    });
  };

  const handleCommitModel3DToGit = async () => {
    setModelCommitStatus('loading');
    try {
      const res = await fetch(`${apiBase}/api/commit-model3d`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          config: {
            scale: modelScale,
            position: [modelPosX, modelPosY, modelPosZ],
            rotation: [modelRotX, modelRotY, modelRotZ]
          },
          commitMessage: modelCommitMessage.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setModelCommitStatus('success');
        setModelCommitMessage('');
        setTimeout(() => setModelCommitStatus('idle'), 4000);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err: any) {
      console.error('Git commit failed:', err);
      setModelCommitStatus('error');
      setTimeout(() => setModelCommitStatus('idle'), 5000);
    }
  };

  useEffect(() => {
    setDraftTeam(team);
    setHasUnsavedChanges(false);
  }, [team]);

  // Contact State
  const [contactEdit, setContactEdit] = useState<ContactInfo>(contactInfo);

  // Docs State
  const [newDoc, setNewDoc] = useState<Partial<DocumentInfo>>({});

  // Gallery State
  const [newGalleryItem, setNewGalleryItem] = useState<{ url: string; type: 'image' | 'video' }>({ url: '', type: 'image' });

  // Recruitment State
  const [recruitmentEdit, setRecruitmentEdit] = useState(recruitment);

  // Sync state if CMS recruitment updates
  useEffect(() => {
    if (recruitment) {
      setRecruitmentEdit(recruitment);
    }
  }, [recruitment]);


  if (!user || !isAdmin) {
    return <Navigate to="/join-us" />;
  }

  const handleContactSave = () => {
    saveContactInfo(contactEdit);
    alert('Contact info updated successfully!');
  };

  const handleRecruitmentSave = () => {
    saveRecruitment(recruitmentEdit);
    alert('Recruitment settings updated successfully locally. Click Commit to save to server.');
  };


  const handleCommitRecruitmentToGit = async () => {
    setRecruitmentCommitStatus('loading');
    try {
      const res = await fetch(`${apiBase}/api/commit-recruitment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recruitment: recruitmentEdit,
          commitMessage: recruitmentCommitMessage.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setRecruitmentCommitStatus('success');
        setRecruitmentCommitMessage('');
        setTimeout(() => setRecruitmentCommitStatus('idle'), 4000);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err: any) {
      console.error('Git commit failed:', err);
      setRecruitmentCommitStatus('error');
      setTimeout(() => setRecruitmentCommitStatus('idle'), 5000);
    }
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

  const handleAddGalleryItem = () => {
    if (newGalleryItem.url) {
      const item: GalleryItem = {
        id: Math.random().toString(36).substr(2, 9),
        type: newGalleryItem.type,
        url: newGalleryItem.url,
      };
      saveGallery([...gallery, item]);
      setNewGalleryItem({ url: '', type: 'image' });
    } else {
      alert("Please provide an image or video URL");
    }
  };

  const removeGalleryItem = (id: string) => {
    saveGallery(gallery.filter(g => g.id !== id));
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVideo = file.type.startsWith('video/');
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewGalleryItem({ url: reader.result as string, type: isVideo ? 'video' : 'image' });
      };
      reader.readAsDataURL(file);
    }
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
   * and create a git commit. Contact info is intentionally excluded â€”
   * it stays in localStorage only and is never committed to Git.
   */
  const handleCommitToGit = async () => {
    setCommitStatus('loading');
    try {
      const res = await fetch(`${apiBase}/api/commit-team`, {
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
      const res = await fetch(`${apiBase}/api/commit-contact`, {
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
      const res = await fetch(`${apiBase}/api/commit-documents`, {
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

  const handleCommitGalleryToGit = async () => {
    setGalleryCommitStatus('loading');
    try {
      const res = await fetch(`${apiBase}/api/commit-gallery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gallery,
          commitMessage: galleryCommitMessage.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setGalleryCommitStatus('success');
        setGalleryCommitMessage('');
        setTimeout(() => setGalleryCommitStatus('idle'), 4000);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err: any) {
      console.error('Git commit failed:', err);
      setGalleryCommitStatus('error');
      setTimeout(() => setGalleryCommitStatus('idle'), 5000);
    }
  };

  return (
    <div data-cursor-system="true" className="pt-24 pb-16 min-h-screen bg-brand-bg text-brand-accent relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-[1px] text-brand-accent">
              Admin Portal
            </h1>
            <p className="text-brand-accent/80 text-[13px] uppercase tracking-[1px]">Manage site content and settings</p>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-bold text-[12px] uppercase tracking-[1px]">Logout</span>
          </button>
        </div>

        {/* Top Navigation / Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-brand-bg border border-brand-accent/25 p-2 rounded-xl shadow-[0_0_0_1px_rgba(164,5,5,0.08),0_4px_24px_rgba(164,5,5,0.10)]">
          <button
            onClick={() => setActiveTab('team')}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all font-bold text-[12px] uppercase tracking-[1px] ${
              activeTab === 'team' ? 'bg-brand-accent text-white shadow-[0_0_15px_rgba(164,5,5,0.4)]' : 'text-brand-accent/80 hover:bg-brand-accent/10 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" /> Team
          </button>
          <button
            onClick={() => setActiveTab('recycle')}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all font-bold text-[12px] uppercase tracking-[1px] ${
              activeTab === 'recycle' ? 'bg-brand-accent text-white shadow-[0_0_15px_rgba(164,5,5,0.4)]' : 'text-brand-accent/80 hover:bg-brand-accent/10 hover:text-white'
            }`}
          >
            <Trash2 className="w-4 h-4" /> Recycle Bin
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all font-bold text-[12px] uppercase tracking-[1px] ${
              activeTab === 'gallery' ? 'bg-brand-accent text-white shadow-[0_0_15px_rgba(164,5,5,0.4)]' : 'text-brand-accent/80 hover:bg-brand-accent/10 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" /> Gallery
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all font-bold text-[12px] uppercase tracking-[1px] ${
              activeTab === 'docs' ? 'bg-brand-accent text-white shadow-[0_0_15px_rgba(164,5,5,0.4)]' : 'text-brand-accent/80 hover:bg-brand-accent/10 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" /> Documentation
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all font-bold text-[12px] uppercase tracking-[1px] ${
              activeTab === 'contact' ? 'bg-brand-accent text-white shadow-[0_0_15px_rgba(164,5,5,0.4)]' : 'text-brand-accent/80 hover:bg-brand-accent/10 hover:text-white'
            }`}
          >
            <Phone className="w-4 h-4" /> Contact
          </button>
          <button
            onClick={() => setActiveTab('model3d')}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all font-bold text-[12px] uppercase tracking-[1px] ${
              activeTab === 'model3d' ? 'bg-brand-accent text-white shadow-[0_0_15px_rgba(164,5,5,0.4)]' : 'text-brand-accent/80 hover:bg-brand-accent/10 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" /> 3D Model
          </button>
          <button
            onClick={() => setActiveTab('domains')}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all font-bold text-[12px] uppercase tracking-[1px] ${
              activeTab === 'domains' ? 'bg-brand-accent text-white shadow-[0_0_15px_rgba(164,5,5,0.4)]' : 'text-brand-accent/80 hover:bg-brand-accent/10 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" /> Domains Config
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-brand-bg border border-brand-accent/25 rounded-2xl p-6 shadow-[0_0_0_1px_rgba(164,5,5,0.08),0_4px_24px_rgba(164,5,5,0.10)] relative">
            
            {/* Team Tab */}
            {activeTab === 'team' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-black uppercase tracking-[1px] text-brand-accent mb-6">Team Management</h2>
                
                {/* Add Member Form */}
                <div className="bg-brand-accent/5 p-4 rounded-xl mb-8 border border-brand-accent/25">
                  <h3 className="font-bold mb-4 text-brand-accent uppercase tracking-[1px] text-[13px]">Add New Member</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input 
                      type="text" placeholder="Full Name" 
                      value={newMember.name || ''} onChange={e => setNewMember({...newMember, name: e.target.value})}
                      className="bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-brand-accent focus:border-brand-accent focus:outline-none" 
                    />
                    <input 
                      type="text" placeholder="Position (e.g. Coordinator)" 
                      value={newMember.position || ''} onChange={e => setNewMember({...newMember, position: e.target.value})}
                      className="bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-brand-accent focus:border-brand-accent focus:outline-none" 
                    />
                    <div className="flex gap-2">
                      <input 
                        type="text" placeholder="Image URL" 
                        value={newMember.image || ''} onChange={e => setNewMember({...newMember, image: e.target.value})}
                        className="flex-1 bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-brand-accent focus:border-brand-accent focus:outline-none min-w-0" 
                      />
                      <label className="bg-brand-bg border border-brand-accent/25 rounded-lg px-3 py-2 text-brand-accent flex items-center gap-2 cursor-pointer hover:border-brand-accent transition shrink-0 group" title="Upload from Device">
                        <Upload className="w-4 h-4 text-brand-accent group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-[1px] text-brand-accent/80 group-hover:text-brand-accent transition-colors">Upload</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </label>
                    </div>
                    <select 
                      value={targetCategory} onChange={e => setTargetCategory(e.target.value)}
                      className="bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-brand-accent focus:border-brand-accent focus:outline-none"
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
                  <p className="text-[11px] text-brand-accent/80 mb-3 leading-[1.5]">
                    This writes <code className="text-brand-accent bg-brand-accent/10 px-1 rounded">src/data/team.ts</code> and creates a git commit. Make sure the <code className="text-brand-accent bg-brand-accent/10 px-1 rounded">npm run server</code> CMS API is running on port 3001.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Commit message (optional)"
                      value={commitMessage}
                      onChange={e => setCommitMessage(e.target.value)}
                      className="flex-1 bg-brand-bg border border-brand-accent/25 rounded-lg px-3 py-2 text-brand-accent text-[12px] focus:border-brand-accent focus:outline-none"
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
                      <h3 className="text-[14px] font-bold uppercase tracking-[2px] text-brand-accent/80 mb-3 border-b border-brand-accent/25 pb-2">{category.category}</h3>
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
                                  className="w-full bg-brand-bg border border-brand-accent/25 rounded px-2 py-1 text-brand-accent focus:border-brand-accent text-[12px] focus:outline-none" 
                                  placeholder="Name"
                                />
                                <input 
                                  type="text" value={editFormState.position || ''} 
                                  onChange={e => setEditFormState({...editFormState, position: e.target.value})}
                                  className="w-full bg-brand-bg border border-brand-accent/25 rounded px-2 py-1 text-brand-accent focus:border-brand-accent text-[12px] focus:outline-none" 
                                  placeholder="Position"
                                />
                                {editFormState.image && (
                                  <div className="flex items-center gap-3 bg-brand-accent/5 border border-brand-accent/15 rounded p-2 mb-1">
                                    <img src={editFormState.image} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-brand-accent/30 shrink-0" onError={e => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48?text=?'; }} />
                                    <span className="text-[10px] text-brand-accent/80 uppercase tracking-[1px]">Image preview</span>
                                  </div>
                                )}
                                <div className="flex gap-2">
                                  <input 
                                    type="text" value={editFormState.image || ''} 
                                    onChange={e => setEditFormState({...editFormState, image: e.target.value})}
                                    className="flex-1 bg-brand-bg border border-brand-accent/25 rounded px-2 py-1 text-brand-accent focus:border-brand-accent text-[12px] min-w-0 focus:outline-none" 
                                    placeholder="Image URL"
                                  />
                                  <label className="bg-brand-accent/10 text-brand-accent px-2 py-1 rounded cursor-pointer hover:bg-brand-accent hover:text-white transition flex items-center justify-center shrink-0" title="Upload Image">
                                    <Upload className="w-3 h-3" />
                                    <input type="file" accept="image/*" className="hidden" onChange={handleEditImageUpload} />
                                  </label>
                                </div>
                                <div className="flex justify-end gap-2 mt-2">
                                  <button onClick={handleCancelEdit} className="text-[10px] font-bold uppercase tracking-[1px] text-brand-accent/80 hover:text-brand-accent transition">Cancel</button>
                                  <button onClick={() => handleSaveEdit(category.category!)} className="text-[10px] font-bold uppercase tracking-[1px] bg-brand-accent text-white px-3 py-1 rounded hover:bg-brand-accent/90 transition">Save</button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="flex items-center gap-3">
                                  <div className="text-brand-accent/80/50 hover:text-brand-accent transition cursor-grab active:cursor-grabbing px-1">
                                    <GripVertical className="w-5 h-5" />
                                  </div>
                                  <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-brand-accent/20" style={{ pointerEvents: "none" }} />
                                  <div>
                                    <p className="font-bold text-[13px] uppercase tracking-[1px]">{member.name}</p>
                                    <p className="text-[11px] uppercase tracking-[1px] text-brand-accent/80">{member.position}</p>
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
                <h2 className="text-2xl font-black uppercase tracking-[1px] text-brand-accent mb-6">Recycle Bin</h2>
                
                <div className="space-y-4">
                  {deletedMembers.length > 0 ? deletedMembers.map(deleted => (
                    <div key={deleted.member.id} className="bg-brand-bg border border-brand-accent/10 rounded-lg p-4 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-4">
                        <img src={deleted.member.image} alt={deleted.member.name} className="w-12 h-12 rounded-full object-cover border border-brand-accent/20 grayscale opacity-70" />
                        <div>
                          <p className="font-bold text-[14px] uppercase tracking-[1px] text-brand-accent/80">{deleted.member.name}</p>
                          <p className="text-[11px] uppercase tracking-[1px] text-brand-accent/80/70">
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
                      <Trash2 className="w-12 h-12 text-brand-accent/80/30 mx-auto mb-4" />
                      <p className="text-[12px] font-bold uppercase tracking-[1px] text-brand-accent/80">Recycle bin is empty</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Documentation Tab */}
            {activeTab === 'docs' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-black uppercase tracking-[1px] text-brand-accent mb-6">Documentation Management</h2>
                
                {/* Git Commit Panel for Documents */}
                <div className="bg-[#0a0a0a] border border-brand-accent/30 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <GitBranch className="w-4 h-4 text-brand-accent" />
                    <span className="font-bold text-[12px] uppercase tracking-[1px] text-brand-accent">Commit Documents to Git</span>
                  </div>
                  <p className="text-[11px] text-brand-accent/80 mb-3 leading-[1.5]">
                    This writes <code className="text-brand-accent bg-brand-accent/10 px-1 rounded">src/data/documents.ts</code> and creates a git commit. Make sure the <code className="text-brand-accent bg-brand-accent/10 px-1 rounded">npm run server</code> CMS API is running on port 3001.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Commit message (optional)"
                      value={docCommitMessage}
                      onChange={e => setDocCommitMessage(e.target.value)}
                      className="flex-1 bg-brand-bg border border-brand-accent/25 rounded-lg px-3 py-2 text-brand-accent text-[12px] focus:border-brand-accent focus:outline-none"
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
                      className="w-full bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-brand-accent focus:border-brand-accent focus:outline-none" 
                    />
                    <textarea 
                      placeholder="Project Description" 
                      value={newDoc.description || ''} onChange={e => setNewDoc({...newDoc, description: e.target.value})}
                      className="w-full bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 h-24 text-brand-accent focus:border-brand-accent focus:outline-none" 
                    />
                    <input 
                      type="text" placeholder="Google Drive / Cloud Link" 
                      value={newDoc.driveLink || ''} onChange={e => setNewDoc({...newDoc, driveLink: e.target.value})}
                      className="w-full bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-brand-accent focus:border-brand-accent focus:outline-none" 
                    />
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={!!newDoc.isPublic} 
                        onChange={e => setNewDoc({...newDoc, isPublic: e.target.checked})}
                        className="rounded border-brand-accent/40 bg-brand-bg text-brand-accent focus:ring-brand-accent"
                      />
                      <span className="text-[12px] font-bold text-brand-accent/80 uppercase tracking-[1px]">Showcase on web (Visible to everyone)</span>
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
                            <span className="text-[9px] bg-brand-muted/20 text-brand-accent/80 px-2 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-[1px]"><X className="w-3 h-3"/> Hidden</span>
                          }
                        </h4>
                        <p className="text-[12px] text-brand-accent/80 mt-1 leading-[1.6]">{doc.description}</p>
                        <a href={doc.driveLink} target="_blank" rel="noopener noreferrer" className="text-brand-accent text-[11px] font-bold uppercase tracking-[1px] hover:underline mt-2 inline-block">
                          View Link Attachment
                        </a>
                      </div>
                      <div className="flex items-start gap-2">
                        <button 
                          onClick={() => toggleDocPublic(doc.id)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[1px] transition-colors border ${doc.isPublic ? 'border-brand-muted/40 text-brand-accent/80 hover:bg-brand-muted/10' : 'bg-brand-accent text-white border-brand-accent hover:bg-brand-accent/90'}`}
                        >
                          {doc.isPublic ? 'Hide' : 'Showcase'}
                        </button>
                        <button onClick={() => removeDoc(doc.id)} className="p-1.5 border border-transparent text-red-500 rounded-lg hover:border-red-500 hover:bg-red-500 hover:text-white transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {documents.length === 0 && <p className="text-brand-accent/80 text-[12px] uppercase tracking-[1px] text-center py-4">No documents uploaded yet.</p>}
                </div>
              </motion.div>
            )}

            {/* Contact Info Tab */}
            {activeTab === 'contact' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-black uppercase tracking-[1px] text-brand-accent mb-4">Contact Details</h2>

                {/* Git Commit Panel for Contact */}
                <div className="bg-[#0a0a0a] border border-brand-accent/30 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <GitBranch className="w-4 h-4 text-brand-accent" />
                    <span className="font-bold text-[12px] uppercase tracking-[1px] text-brand-accent">Commit Contact to Git</span>
                  </div>
                  <p className="text-[11px] text-brand-accent/80 mb-3 leading-[1.5]">
                    First save your changes below, then click this to write <code className="text-brand-accent bg-brand-accent/10 px-1 rounded">src/data/contact.ts</code> and create a git commit.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Commit message (optional)"
                      value={contactCommitMessage}
                      onChange={e => setContactCommitMessage(e.target.value)}
                      className="flex-1 bg-brand-bg border border-brand-accent/25 rounded-lg px-3 py-2 text-brand-accent text-[12px] focus:border-brand-accent focus:outline-none"
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
                    <label className="block text-[11px] font-bold text-brand-accent/80 uppercase tracking-[1px] mb-1">Email Address</label>
                    <input 
                      type="text" value={contactEdit.email} onChange={e => setContactEdit({...contactEdit, email: e.target.value})}
                      className="w-full bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-brand-accent focus:border-brand-accent focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-brand-accent/80 uppercase tracking-[1px] mb-1">Main Phone Number</label>
                    <input 
                      type="text" value={contactEdit.phone} onChange={e => setContactEdit({...contactEdit, phone: e.target.value})}
                      className="w-full bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-brand-accent focus:border-brand-accent focus:outline-none" 
                    />
                  </div>
                  
                  {/* Two contacts */}
                  <div className="pt-4 border-t border-white/10">
                    <label className="block text-[11px] font-bold text-brand-accent/80 uppercase tracking-[1px] mb-2">Member Contact 1</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" placeholder="Name" value={contactEdit.contacts?.[0]?.name || ''} 
                        onChange={e => setContactEdit({...contactEdit, contacts: [{...contactEdit.contacts?.[0] || {name:'', phone:''}, name: e.target.value}, contactEdit.contacts?.[1] || {name:'', phone:''}]})}
                        className="flex-1 bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-brand-accent focus:border-brand-accent focus:outline-none text-[12px]" 
                      />
                      <input 
                        type="text" placeholder="Phone" value={contactEdit.contacts?.[0]?.phone || ''} 
                        onChange={e => setContactEdit({...contactEdit, contacts: [{...contactEdit.contacts?.[0] || {name:'', phone:''}, phone: e.target.value}, contactEdit.contacts?.[1] || {name:'', phone:''}]})}
                        className="flex-1 bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-brand-accent focus:border-brand-accent focus:outline-none text-[12px]" 
                      />
                    </div>
                  </div>
                  <div className="pb-4 border-b border-white/10">
                    <label className="block text-[11px] font-bold text-brand-accent/80 uppercase tracking-[1px] mb-2">Member Contact 2</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" placeholder="Name" value={contactEdit.contacts?.[1]?.name || ''} 
                        onChange={e => setContactEdit({...contactEdit, contacts: [contactEdit.contacts?.[0] || {name:'', phone:''}, {...contactEdit.contacts?.[1] || {name:'', phone:''}, name: e.target.value}]})}
                        className="flex-1 bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-brand-accent focus:border-brand-accent focus:outline-none text-[12px]" 
                      />
                      <input 
                        type="text" placeholder="Phone" value={contactEdit.contacts?.[1]?.phone || ''} 
                        onChange={e => setContactEdit({...contactEdit, contacts: [contactEdit.contacts?.[0] || {name:'', phone:''}, {...contactEdit.contacts?.[1] || {name:'', phone:''}, phone: e.target.value}]})}
                        className="flex-1 bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 text-brand-accent focus:border-brand-accent focus:outline-none text-[12px]" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-brand-accent/80 uppercase tracking-[1px] mb-1">Main Region / Address</label>
                    <textarea 
                      value={contactEdit.address} onChange={e => setContactEdit({...contactEdit, address: e.target.value})}
                      className="w-full bg-brand-bg border border-brand-accent/25 rounded-lg px-4 py-2 h-24 text-brand-accent focus:border-brand-accent focus:outline-none" 
                    />
                  </div>
                  <button onClick={handleContactSave} className="bg-brand-accent text-white font-bold uppercase tracking-[1px] text-[12px] px-6 py-3 rounded-lg hover:bg-brand-accent/90 transition mt-4">
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-black uppercase tracking-[1px] text-brand-accent mb-6">Gallery Management</h2>
                
                {/* Git Commit Panel for Gallery */}
                <div className="bg-[#0a0a0a] border border-brand-accent/30 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <GitBranch className="w-4 h-4 text-brand-accent" />
                    <span className="font-bold text-[12px] uppercase tracking-[1px] text-brand-accent">Commit Gallery to Git</span>
                  </div>
                  <p className="text-[11px] text-brand-accent/80 mb-3 leading-[1.5]">
                    This writes <code className="text-brand-accent bg-brand-accent/10 px-1 rounded">src/data/gallery.ts</code> and creates a git commit. Make sure the <code className="text-brand-accent bg-brand-accent/10 px-1 rounded">npm run server</code> CMS API is running on port 3001.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Commit message (optional)"
                      value={galleryCommitMessage}
                      onChange={e => setGalleryCommitMessage(e.target.value)}
                      className="flex-1 bg-brand-bg border border-brand-accent/25 rounded-lg px-3 py-2 text-brand-accent text-[12px] focus:border-brand-accent focus:outline-none"
                    />
                    <button
                      onClick={handleCommitGalleryToGit}
                      disabled={galleryCommitStatus === 'loading'}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-[12px] uppercase tracking-[1px] transition ${
                        galleryCommitStatus === 'success'
                          ? 'bg-green-600 text-white'
                          : galleryCommitStatus === 'error'
                          ? 'bg-red-600 text-white'
                          : 'bg-brand-accent text-white hover:bg-brand-accent/90'
                      } disabled:opacity-60`}
                    >
                      {galleryCommitStatus === 'loading' ? (
                        <><Loader className="w-4 h-4 animate-spin" /> Committing...</>
                      ) : galleryCommitStatus === 'success' ? (
                        <><Check className="w-4 h-4" /> Committed!</>
                      ) : galleryCommitStatus === 'error' ? (
                        <><X className="w-4 h-4" /> Failed — check server</>
                      ) : (
                        <><GitBranch className="w-4 h-4" /> Commit to Git</>
                      )}
                    </button>
                  </div>
                </div>

                {/* 20 Box Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {Array.from({ length: 20 }).map((_, index) => {
                    const item = gallery[index] || { id: `empty-${index}`, type: 'empty', url: '' };
                    return (
                      <div key={index} className="relative group bg-[#050505] rounded-lg overflow-hidden border border-brand-accent/20 aspect-[3/4] flex flex-col items-center justify-center">
                        {item.type === 'video' && item.url ? (
                          <video src={item.url} className="w-full h-full object-cover opacity-80" muted loop autoPlay playsInline />
                        ) : item.type === 'image' && item.url ? (
                          <img src={item.url} alt={`Box ${index + 1}`} className="w-full h-full object-cover opacity-80" />
                        ) : (
                          <div className="text-center text-brand-accent/80 font-bold text-[10px] uppercase tracking-[1px] p-2 break-words">
                            Empty Box<br/>{index + 1}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 gap-2 backdrop-blur-sm">
                           <div className="text-brand-accent font-black text-[12px] uppercase mb-1">Box {index + 1}</div>
                           <input 
                             type="text" 
                             placeholder="Paste URL + Enter"
                             className="w-full bg-black/50 border border-brand-accent/30 rounded p-1 text-[9px] text-brand-accent outline-none focus:border-brand-accent"
                             onKeyDown={(e) => {
                               if (e.key === 'Enter') {
                                 const val = e.currentTarget.value;
                                 if (val) {
                                   const newGallery = [...gallery];
                                   while (newGallery.length <= index) newGallery.push({ id: `empty-${newGallery.length}`, type: 'empty', url: '' });
                                   newGallery[index] = { id: `box-${index}-${Date.now()}`, type: val.includes('.mp4') || val.includes('video') ? 'video' : 'image', url: val };
                                   saveGallery(newGallery);
                                   e.currentTarget.value = '';
                                 }
                               }
                             }}
                           />
                           <label className="text-[10px] bg-brand-accent/20 text-brand-accent px-2 py-1 rounded cursor-pointer hover:bg-brand-accent hover:text-white transition w-full text-center">
                             Upload File
                             <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => {
                               const file = e.target.files?.[0];
                               if (file) {
                                 const isVideo = file.type.startsWith('video/');
                                 const reader = new FileReader();
                                 reader.onloadend = () => {
                                   const newGallery = [...gallery];
                                   while (newGallery.length <= index) newGallery.push({ id: `empty-${newGallery.length}`, type: 'empty', url: '' });
                                   newGallery[index] = { id: `box-${index}-${Date.now()}`, type: isVideo ? 'video' : 'image', url: reader.result as string };
                                   saveGallery(newGallery);
                                 };
                                 reader.readAsDataURL(file);
                               }
                             }} />
                           </label>
                           {item.type !== 'empty' && (
                             <button 
                               onClick={() => {
                                 const newGallery = [...gallery];
                                 newGallery[index] = { id: `empty-${index}`, type: 'empty', url: '' };
                                 saveGallery(newGallery);
                               }}
                               className="text-[10px] text-red-500 hover:text-white hover:bg-red-500 px-2 py-1 rounded transition w-full text-center"
                             >
                               Clear Box
                             </button>
                           )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* 3D Model Tab */}
            {activeTab === 'model3d' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-black uppercase tracking-[1px] text-brand-accent mb-6">3D Model Configuration</h2>

                {/* Git Commit Panel for 3D Model */}
                <div className="bg-[#0a0a0a] border border-brand-accent/30 rounded-xl p-4 mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <GitBranch className="w-4 h-4 text-brand-accent" />
                    <span className="font-bold text-[12px] uppercase tracking-[1px] text-brand-accent">Commit 3D Model to Git</span>
                  </div>
                  <p className="text-[11px] text-brand-accent/80 mb-3 leading-[1.5]">
                    This writes <code className="text-brand-accent bg-brand-accent/10 px-1 rounded">src/data/model3d.ts</code> and commits + pushes to GitHub. Make sure the backend server is running on port 3001.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Commit message (optional)"
                      value={modelCommitMessage}
                      onChange={e => setModelCommitMessage(e.target.value)}
                      className="flex-1 bg-brand-bg border border-brand-accent/25 rounded-lg px-3 py-2 text-brand-accent text-[12px] focus:border-brand-accent focus:outline-none"
                    />
                    <button
                      onClick={handleCommitModel3DToGit}
                      disabled={modelCommitStatus === 'loading'}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-[12px] uppercase tracking-[1px] transition ${
                        modelCommitStatus === 'success'
                          ? 'bg-green-600 text-white'
                          : modelCommitStatus === 'error'
                          ? 'bg-red-600 text-white'
                          : 'bg-brand-accent text-white hover:bg-brand-accent/90'
                      } disabled:opacity-60`}
                    >
                      {modelCommitStatus === 'loading' ? (
                        <><Loader className="w-4 h-4 animate-spin" /> Committing...</>
                      ) : modelCommitStatus === 'success' ? (
                        <><Check className="w-4 h-4" /> Committed!</>
                      ) : modelCommitStatus === 'error' ? (
                        <><X className="w-4 h-4" /> Failed — check server</>
                      ) : (
                        <><GitBranch className="w-4 h-4" /> Commit to Git</>
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Sliders Column */}
                  <div className="space-y-4">
                    <h3 className="text-[13px] font-bold uppercase tracking-[2px] text-brand-accent/80 mb-4 border-b border-brand-accent/25 pb-2">Adjust Parameters</h3>
                    
                    {/* Scale */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span>Scale</span>
                        <span className="text-brand-accent">{modelScale.toFixed(2)}</span>
                      </div>
                      <input 
                        type="range" min="0.5" max="10" step="0.1" 
                        value={modelScale} 
                        onChange={e => handleModel3DChange('scale', parseFloat(e.target.value))}
                        className="w-full accent-brand-accent h-1 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Position X */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span>Position X</span>
                        <span className="text-brand-accent">{modelPosX.toFixed(2)}</span>
                      </div>
                      <input 
                        type="range" min="-10" max="10" step="0.1" 
                        value={modelPosX} 
                        onChange={e => handleModel3DChange('posX', parseFloat(e.target.value))}
                        className="w-full accent-brand-accent h-1 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Position Y */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span>Position Y</span>
                        <span className="text-brand-accent">{modelPosY.toFixed(2)}</span>
                      </div>
                      <input 
                        type="range" min="-10" max="10" step="0.1" 
                        value={modelPosY} 
                        onChange={e => handleModel3DChange('posY', parseFloat(e.target.value))}
                        className="w-full accent-brand-accent h-1 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Position Z */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span>Position Z</span>
                        <span className="text-brand-accent">{modelPosZ.toFixed(2)}</span>
                      </div>
                      <input 
                        type="range" min="-20" max="20" step="0.1" 
                        value={modelPosZ} 
                        onChange={e => handleModel3DChange('posZ', parseFloat(e.target.value))}
                        className="w-full accent-brand-accent h-1 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Rotation X */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span>Rotation X</span>
                        <span className="text-brand-accent">{modelRotX.toFixed(2)} rad</span>
                      </div>
                      <input 
                        type="range" min="-3.14" max="3.14" step="0.01" 
                        value={modelRotX} 
                        onChange={e => handleModel3DChange('rotX', parseFloat(e.target.value))}
                        className="w-full accent-brand-accent h-1 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Rotation Y */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span>Rotation Y</span>
                        <span className="text-brand-accent">{modelRotY.toFixed(2)} rad</span>
                      </div>
                      <input 
                        type="range" min="-3.14" max="3.14" step="0.01" 
                        value={modelRotY} 
                        onChange={e => handleModel3DChange('rotY', parseFloat(e.target.value))}
                        className="w-full accent-brand-accent h-1 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Rotation Z */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span>Rotation Z</span>
                        <span className="text-brand-accent">{modelRotZ.toFixed(2)} rad</span>
                      </div>
                      <input 
                        type="range" min="-3.14" max="3.14" step="0.01" 
                        value={modelRotZ} 
                        onChange={e => handleModel3DChange('rotZ', parseFloat(e.target.value))}
                        className="w-full accent-brand-accent h-1 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Real-time 3D Viewport Column */}
                  <div className="flex flex-col">
                    <h3 className="text-[13px] font-bold uppercase tracking-[2px] text-brand-accent/80 mb-4 border-b border-brand-accent/25 pb-2">Live Viewport</h3>
                    <div className="flex-1 min-h-[300px] bg-[#050505] rounded-xl border border-brand-accent/20 overflow-hidden relative">
                      <Canvas camera={{ position: [0, 2, 10], fov: 45 }} style={{ background: 'transparent' }}>
                        <Suspense fallback={null}>
                          <ambientLight intensity={0.6} />
                          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
                          <directionalLight position={[-10, 5, -5]} intensity={0.8} color="#c8102e" />
                          <Environment preset="city" />
                          <AdminCarModel 
                            scale={modelScale}
                            position={[modelPosX, modelPosY, modelPosZ]}
                            rotation={[modelRotX, modelRotY, modelRotZ]}
                          />
                        </Suspense>
                      </Canvas>
                      <div className="absolute bottom-3 left-3 bg-[#0a0a0a]/90 px-2 py-1 rounded text-[10px] font-mono border border-white/5 text-brand-accent/80">
                        CAM: [0, 2, 10] | FOV: 45
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'domains' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center bg-black/40 p-6 rounded-xl border border-white/5">
                  <div>
                    <h2 className="font-bebas text-3xl tracking-wide text-white">DOMAINS WATERMARK CONFIG</h2>
                    <p className="text-brand-muted text-sm mt-1">Adjust position and opacity for the large background text on the Domains page.</p>
                  </div>
                  <button
                    onClick={handleDomainsSave}
                    className="flex items-center gap-2 bg-brand-accent hover:bg-red-600 text-white px-6 py-2.5 rounded-lg font-bold tracking-widest text-xs transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    SAVE CONFIG
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['uav', 'ugv', 'research'].map((domain) => {
                    const typedDomain = domain as keyof typeof domainsEdit;
                    return (
                      <div key={domain} className="bg-black/40 rounded-xl p-6 border border-white/5 space-y-4">
                        <h3 className="font-bebas text-2xl tracking-wide text-brand-accent uppercase border-b border-white/10 pb-2">{domain} config</h3>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <label className="text-xs font-bold tracking-wider text-brand-muted uppercase">Opacity ({domainsEdit[typedDomain].opacity.toFixed(2)})</label>
                          </div>
                          <input 
                            type="range" 
                            min="0" max="1" step="0.01" 
                            value={domainsEdit[typedDomain].opacity}
                            onChange={(e) => setDomainsEdit(prev => ({ ...prev, [typedDomain]: { ...prev[typedDomain], opacity: parseFloat(e.target.value) } }))}
                            className="w-full accent-brand-accent"
                          />
                        </div>

                        <div className="border-t border-white/5 pt-3 mt-3">
                          <span className="text-[10px] font-bold text-brand-accent uppercase tracking-wider block mb-2">Part 1 (ENDEAVOUR / WORKIN)</span>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between mb-1">
                                <label className="text-[10px] font-medium tracking-wider text-brand-muted uppercase">X Offset ({domainsEdit[typedDomain].part1X}px)</label>
                              </div>
                              <input 
                                type="range" 
                                min="-1000" max="1000" step="1" 
                                value={domainsEdit[typedDomain].part1X}
                                onChange={(e) => setDomainsEdit(prev => ({ ...prev, [typedDomain]: { ...prev[typedDomain], part1X: parseInt(e.target.value) } }))}
                                className="w-full accent-brand-accent"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <label className="text-[10px] font-medium tracking-wider text-brand-muted uppercase">Y Offset ({domainsEdit[typedDomain].part1Y}px)</label>
                              </div>
                              <input 
                                type="range" 
                                min="-1000" max="1000" step="1" 
                                value={domainsEdit[typedDomain].part1Y}
                                onChange={(e) => setDomainsEdit(prev => ({ ...prev, [typedDomain]: { ...prev[typedDomain], part1Y: parseInt(e.target.value) } }))}
                                className="w-full accent-brand-accent"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-white/5 pt-3 mt-3">
                          <span className="text-[10px] font-bold text-brand-accent uppercase tracking-wider block mb-2">Part 2 ({domain.toUpperCase()})</span>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between mb-1">
                                <label className="text-[10px] font-medium tracking-wider text-brand-muted uppercase">X Offset ({domainsEdit[typedDomain].part2X}px)</label>
                              </div>
                              <input 
                                type="range" 
                                min="-1000" max="1000" step="1" 
                                value={domainsEdit[typedDomain].part2X}
                                onChange={(e) => setDomainsEdit(prev => ({ ...prev, [typedDomain]: { ...prev[typedDomain], part2X: parseInt(e.target.value) } }))}
                                className="w-full accent-brand-accent"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <label className="text-[10px] font-medium tracking-wider text-brand-muted uppercase">Y Offset ({domainsEdit[typedDomain].part2Y}px)</label>
                              </div>
                              <input 
                                type="range" 
                                min="-1000" max="1000" step="1" 
                                value={domainsEdit[typedDomain].part2Y}
                                onChange={(e) => setDomainsEdit(prev => ({ ...prev, [typedDomain]: { ...prev[typedDomain], part2Y: parseInt(e.target.value) } }))}
                                className="w-full accent-brand-accent"
                              />
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

        </div>
      </div>
    </div>
  );
};
