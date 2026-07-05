import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { Check, AlertCircle, Phone } from 'lucide-react';

export const RecruitmentPage = () => {
  const { recruitment } = useCMS();
  
  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    regNo: '',
    email: '',
    percent10th: '',
    percent12th: '',
  });
  
  const [no12th, setNo12th] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'duplicate'>('idle');
  const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);

  useEffect(() => {
    if (!recruitment.endDate) return;
    
    const calculateTimeLeft = () => {
      const difference = new Date(recruitment.endDate).getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft(null);
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [recruitment.endDate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Check for duplicate in localStorage
    const hasRegistered = localStorage.getItem(`endeavour_registered_${formData.email}`);
    if (hasRegistered) {
      setStatus('duplicate');
      return;
    }

    setStatus('submitting');

    try {
      if (recruitment.webhookUrl) {
        // Simple POST request, no-cors to prevent preflight issues with typical Google Apps Script
        await fetch(recruitment.webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            percent12th: no12th ? 'N/A' : formData.percent12th,
            timestamp: new Date().toISOString()
          }),
        });
      }
      
      // Simulate network delay if no webhook
      if (!recruitment.webhookUrl) {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      localStorage.setItem(`endeavour_registered_${formData.email}`, 'true');
      setStatus('success');
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  };

  const formStyle = {
    fontFamily: recruitment.typography.fontFamily || 'Inter',
    fontWeight: recruitment.typography.fontWeight === 'bold' || recruitment.typography.fontWeight === '900' 
      ? parseInt(recruitment.typography.fontWeight) || 700 
      : 400
  };

  return (
    <div className="min-h-screen bg-brand-bg text-white relative overflow-hidden flex flex-col items-center pt-8 pb-20 selection:bg-brand-accent selection:text-white" style={formStyle}>
      
      {/* 3D Doodles / Decorations */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Placeholder doodle shapes - using simple CSS geometric patterns for demo if no image */}
        <div className="absolute top-[20%] left-[10%] w-32 h-32 border border-brand-accent/30 rounded-full animate-pulse blur-sm opacity-20" />
        <div className="absolute top-[60%] right-[15%] w-48 h-48 border-2 border-brand-accent/20 rotate-45 opacity-10" />
        <div className="absolute bottom-[10%] left-[20%] w-24 h-24 bg-brand-accent/10 rounded-full blur-xl animate-bounce" style={{ animationDuration: '4s' }} />
      </div>

      <div className="w-full max-w-6xl px-6 lg:px-12 flex justify-between items-start z-10 relative mt-4">
        <Link to="/" className="flex items-center gap-4 group">
          <img src="/logo.svg" alt="Endeavour Logo" className="h-10 w-auto md:h-12" />
          <div className="hidden sm:block">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-[2px] leading-none group-hover:text-brand-accent transition-colors">
              Endeavour
            </h1>
            <p className="text-[10px] uppercase tracking-[3px] text-brand-muted">Recruitment Form</p>
          </div>
        </Link>

        {timeLeft && (
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[2px] text-brand-muted mb-1 text-brand-accent">Registration Closes In:</p>
            <div className="flex gap-2 text-center text-sm md:text-base font-mono bg-[#050505] border border-brand-accent/20 p-2 rounded-lg shadow-[0_0_15px_rgba(164,5,5,0.15)]">
              <div className="flex flex-col"><span className="font-bold">{String(timeLeft.days).padStart(2, '0')}</span><span className="text-[8px] uppercase text-brand-muted">Days</span></div>
              <span className="text-brand-accent font-bold">:</span>
              <div className="flex flex-col"><span className="font-bold">{String(timeLeft.hours).padStart(2, '0')}</span><span className="text-[8px] uppercase text-brand-muted">Hrs</span></div>
              <span className="text-brand-accent font-bold">:</span>
              <div className="flex flex-col"><span className="font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span><span className="text-[8px] uppercase text-brand-muted">Min</span></div>
              <span className="text-brand-accent font-bold">:</span>
              <div className="flex flex-col"><span className="font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span><span className="text-[8px] uppercase text-brand-muted">Sec</span></div>
            </div>
            {recruitment.endDate && (
               <p className="text-[9px] text-brand-muted mt-2 tracking-[1px] uppercase">
                 Ends: {new Date(recruitment.endDate).toLocaleDateString()}
               </p>
            )}
          </div>
        )}
      </div>

      <div className="w-full max-w-2xl px-4 z-10 relative mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#050505]/80 backdrop-blur-xl border border-brand-accent/20 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] shadow-brand-accent/10"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-[1px] text-white">Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-red-500">Legacy</span></h2>
            <p className="text-sm text-brand-muted mt-3">Fill out the details below to enroll for Endeavour.</p>
          </div>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-500/20 border-2 border-green-500 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <Check className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Registration Successful!</h3>
                <p className="text-brand-muted">We have received your details. Welcome to Endeavour!</p>
                <p className="mt-8 text-sm text-brand-muted bg-[#111] p-4 rounded border border-white/10">
                  Made a mistake? Contact us at <br/>
                  <span className="text-brand-accent font-mono mt-1 block font-bold">{recruitment.contactNumber || "team member"}</span>
                </p>
              </motion.div>
            ) : status === 'duplicate' ? (
              <motion.div 
                key="duplicate"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-yellow-500/20 border-2 border-yellow-500 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                  <AlertCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-yellow-500">Already Registered</h3>
                <p className="text-brand-muted mb-8">This email address has already been registered on this device.</p>
                
                <div className="bg-[#111] p-6 rounded-xl border border-brand-accent/20">
                  <Phone className="w-6 h-6 text-brand-accent mx-auto mb-3" />
                  <p className="text-sm">Need to refill or make changes?</p>
                  <p className="text-xs text-brand-muted mt-1">Please contact our team member:</p>
                  <p className="text-lg font-mono text-brand-accent font-bold mt-2">{recruitment.contactNumber || "Admin"}</p>
                </div>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm text-brand-muted hover:text-white underline"
                >
                  Go back
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-[1px] mb-2">Name of Student</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-accent focus:bg-brand-accent/5 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-[1px] mb-2">Branch</label>
                    <input
                      required
                      type="text"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-accent focus:bg-brand-accent/5 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-[1px] mb-2">Reg No.</label>
                    <input
                      required
                      type="text"
                      name="regNo"
                      value={formData.regNo}
                      onChange={handleChange}
                      className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-accent focus:bg-brand-accent/5 transition-all font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-[1px] mb-2">Email (College/Personal)</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-accent focus:bg-brand-accent/5 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                  <div>
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-[1px] mb-2">10th Percentage</label>
                    <div className="relative">
                      <input
                        required
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        name="percent10th"
                        value={formData.percent10th}
                        onChange={handleChange}
                        className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-accent focus:bg-brand-accent/5 transition-all pr-10 font-mono"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted font-bold">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-[1px] mb-2">12th Percentage</label>
                    <div className="relative">
                      <input
                        required={!no12th}
                        disabled={no12th}
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        name="percent12th"
                        value={formData.percent12th}
                        onChange={handleChange}
                        className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-accent focus:bg-brand-accent/5 transition-all pr-10 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted font-bold">%</span>
                    </div>
                    <label className="flex items-center gap-2 mt-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-4 h-4">
                        <input
                          type="checkbox"
                          checked={no12th}
                          onChange={(e) => setNo12th(e.target.checked)}
                          className="peer appearance-none w-4 h-4 border border-brand-muted rounded-sm checked:bg-brand-accent checked:border-brand-accent transition-colors"
                        />
                        <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" strokeWidth={4} />
                      </div>
                      <span className="text-[11px] text-brand-muted group-hover:text-white transition-colors">I didn't participate in 12th Board</span>
                    </label>
                  </div>
                </div>

                {status === 'error' && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-sm rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Failed to submit. Please try again or contact support.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 mt-8 bg-brand-accent hover:bg-[#c8102e] text-white font-black uppercase tracking-[2px] rounded-lg transition-all hover:shadow-[0_0_25px_rgba(164,5,5,0.6)] hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 relative overflow-hidden group"
                >
                  <span className={`relative z-10 flex items-center justify-center gap-2 ${status === 'submitting' ? 'opacity-0' : 'opacity-100'}`}>
                    Submit Registration
                  </span>
                  {status === 'submitting' && (
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
