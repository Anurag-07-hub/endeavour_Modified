import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCMS } from '../context/CMSContext';
import { LogOut, User, FileText, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export const UserDashboard = () => {
  const { user, isUser, logout } = useAuth();
  const { documents, contactInfo } = useCMS();

  if (!user || !isUser) {
    return <Navigate to="/join-us" />;
  }

  // Users can see all docs including private ones, but cannot edit them.
  const privateDocs = documents.filter(d => !d.isPublic);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-brand-bg text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-12 bg-brand-bg border border-brand-accent/25 rounded-2xl p-6 shadow-[0_0_0_1px_rgba(164,5,5,0.08),0_4px_24px_rgba(164,5,5,0.10)] relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-brand-accent/40 bg-brand-accent/5 flex items-center justify-center">
              <User className="w-6 h-6 text-brand-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-[1px]">User Dashboard</h1>
              <p className="text-[12px] font-bold text-brand-muted uppercase tracking-[1px]">Welcome to your portal</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-transparent border border-brand-muted/40 text-brand-muted rounded-lg hover:bg-brand-muted/10 transition"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-bold text-[12px] uppercase tracking-[1px]">Logout</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Internal Documents */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="bg-brand-bg border border-brand-accent/25 rounded-2xl p-6 h-full shadow-sm hover:shadow-[0_0_0_1px_rgba(164,5,5,0.08),0_4px_24px_rgba(164,5,5,0.10)] transition-all">
              <h2 className="text-[14px] font-black uppercase tracking-[2px] mb-4 flex items-center gap-2 border-b border-brand-accent/25 pb-2 text-brand-muted">
                <Lock className="w-5 h-5 text-brand-accent" /> Internal Documents
              </h2>
              {privateDocs.length > 0 ? (
                <div className="space-y-4">
                  {privateDocs.map(doc => (
                    <div key={doc.id} className="bg-brand-bg p-4 rounded-xl border border-brand-accent/10 hover:border-brand-accent/40 transition">
                      <h3 className="font-bold text-[13px] uppercase tracking-[1px]">{doc.title}</h3>
                      <p className="text-[11px] text-brand-muted mt-1 leading-[1.6] uppercase tracking-[1px]">{doc.description}</p>
                      <a href={doc.driveLink} target="_blank" rel="noopener noreferrer" className="text-brand-accent text-[11px] font-bold uppercase tracking-[1px] mt-3 inline-flex items-center gap-1 hover:underline">
                        <FileText className="w-4 h-4" /> View Document
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-brand-muted text-[11px] uppercase tracking-[1px]">No internal documents available at this time.</p>
              )}
            </div>
          </motion.div>

          {/* Quick Contact Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="bg-brand-bg border border-brand-accent/25 rounded-2xl p-6 h-full shadow-sm hover:shadow-[0_0_0_1px_rgba(164,5,5,0.08),0_4px_24px_rgba(164,5,5,0.10)] transition-all">
              <h2 className="text-[14px] font-black uppercase tracking-[2px] mb-4 text-brand-muted border-b border-brand-accent/25 pb-2">Support Contact</h2>
              <p className="text-brand-muted text-[11px] uppercase tracking-[1px] mb-6">Need help? Contact the administration using the details below.</p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-brand-accent uppercase tracking-wider font-bold">Email</p>
                  <p className="font-bold text-[12px]">{contactInfo.email}</p>
                </div>
                <div>
                  <p className="text-[10px] text-brand-accent uppercase tracking-wider font-bold">Phone</p>
                  <p className="font-bold text-[12px]">{contactInfo.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] text-brand-accent uppercase tracking-wider font-bold">Region / Address</p>
                  <p className="font-bold text-[12px] whitespace-pre-line">{contactInfo.address}</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
