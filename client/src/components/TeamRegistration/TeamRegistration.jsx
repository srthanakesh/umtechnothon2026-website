import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserProvider';
import axiosInstance from '../../lib/AxiosInstance';

const TeamRegistration = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    teamName: '',
    memberEmails: ['', '', '', ''],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [registeredMembers, setRegisteredMembers] = useState([]);
  const [showMembers, setShowMembers] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...formData.memberEmails];
    updatedEmails[index] = value;
    setFormData({
      ...formData,
      memberEmails: updatedEmails
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate team name
    if (!formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required';
    }
    
    // Validate that at least one email is provided
    const filledEmails = formData.memberEmails.filter(email => email.trim() !== '');
    if (filledEmails.length === 0) {
      newErrors.memberEmails = 'At least one team member email is required';
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    formData.memberEmails.forEach((email, index) => {
      if (email.trim() !== '' && !emailRegex.test(email)) {
        if (!newErrors.invalidEmails) newErrors.invalidEmails = [];
        newErrors.invalidEmails.push({ index, email });
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const filledEmails = formData.memberEmails.filter(email => email.trim() !== '');
    
    setIsSubmitting(true);
    
    try {
      // Use axiosInstance which has our token refresh logic
      const response = await axiosInstance.post('/teams', {
        teamName: formData.teamName,
        memberEmails: filledEmails,
      });
      
      setSuccessMessage('Team created successfully!');
      setRegisteredMembers(response.data.members);
      setShowMembers(true);
      
      // Update user context to include new team_id if needed
      if (response.data.team && response.data.team.team_id && user) {
        // This will likely trigger a re-render of components that use the user context
        window.dispatchEvent(new Event("authChanged"));
      }
      
      // Reset form
      setFormData({
        teamName: '',
        memberEmails: ['', '', '', ''],
      });
      
      // Redirect to team page after 3 seconds
      setTimeout(() => {
        navigate('/team');
      }, 3000);
      
    } catch (error) {
      setErrors({
        submit: error.response?.data?.error || error.message || 'An error occurred while creating the team'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] py-12 px-4 text-[#fafdff]">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-black text-center mb-2 uppercase tracking-tighter italic">
          Team Registration
        </h1>
        <div className="w-5/6 h-1 bg-[#e151af] mx-auto mb-10 shadow-[0_0_10px_#e151af]"></div>
        
        {showMembers ? (
          <div className="bg-[#111827] border border-[#2dcefb]/30 rounded-2xl shadow-2xl p-8 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-[#2dcefb]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#2dcefb]">
              <svg className="w-8 h-8 text-[#2dcefb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-[#2dcefb]">Team Activated</h2>
            <p className="text-white/60 mb-6 font-medium italic">
              "{formData.teamName}" is ready for battle.
            </p>
            
            <div className="space-y-2 mb-8">
              {registeredMembers.map((member, index) => (
                <div key={index} className="bg-[#0b0e14] border border-white/5 p-3 rounded-xl flex justify-between items-center px-6">
                  <span className="font-bold text-white">{member.full_name}</span>
                  <span className="text-xs text-[#e151af] uppercase tracking-widest">{member.email}</span>
                </div>
              ))}
            </div>
            
            <p className="text-sm text-white/30 animate-pulse uppercase tracking-[0.2em]">Redirecting to command center...</p>
          </div>
        ) : (
          <div className="bg-[#111827] border border-white/10 rounded-2xl shadow-2xl p-8">
            {errors.submit && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-xl mb-6 text-sm font-bold flex items-center gap-2">
                <span>⚠️</span> {errors.submit}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Team Name Section */}
              <div>
                <label htmlFor="teamName" className="block text-[#e151af] text-xs font-black uppercase tracking-widest mb-2">Team Name</label>
                <input
                  type="text"
                  id="teamName"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  className={`w-full bg-[#0b0e14] p-4 border rounded-xl outline-none focus:ring-2 transition-all font-bold tracking-tight text-xl ${
                    errors.teamName ? 'border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:ring-[#2dcefb]/50 focus:border-[#2dcefb]'
                  }`}
                  placeholder="The Cyber Warriors"
                />
                {errors.teamName && <p className="text-red-500 text-xs mt-2 font-bold uppercase">{errors.teamName}</p>}
              </div>
              
              {/* Members Section */}
              <div className="pt-4">
                <h3 className="text-[#2dcefb] text-xs font-black uppercase tracking-[0.2em] mb-4">Roster Acquisition</h3>
                <p className="text-white/40 text-xs mb-6 italic">Enter emails for up to 4 registered participants. You are added automatically as the leader.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.memberEmails.map((email, index) => (
                    <div key={index}>
                      <input
                        type="email"
                        id={`email${index}`}
                        value={email}
                        onChange={(e) => handleEmailChange(index, e.target.value)}
                        className={`w-full bg-[#0b0e14] p-3 border rounded-xl outline-none focus:ring-1 transition-all text-sm ${
                          errors.invalidEmails?.some(e => e.index === index) ? 'border-red-500' : 'border-white/5 focus:border-[#e151af]'
                        }`}
                        placeholder={`Member ${index + 1} Email`}
                      />
                    </div>
                  ))}
                </div>
                {errors.memberEmails && <p className="text-red-500 text-xs mt-4 font-bold uppercase">{errors.memberEmails}</p>}
              </div>

              {/* Checkbox Section */}
              <div className="bg-[#0b0e14] p-4 rounded-xl border border-white/5">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-white/10 bg-[#111827] text-[#2dcefb] focus:ring-offset-0 focus:ring-0 cursor-pointer"
                    checked={formData.paymentConfirmation || false}
                    onChange={(e) => setFormData({...formData, paymentConfirmation: e.target.checked})}
                    required
                  />
                  <span className="ml-3 text-xs text-white/60 group-hover:text-white transition-colors leading-relaxed">
                    I confirm the deposit and registration fee has been finalized 
                    <a href="https://app.youths.asia/event/9L2QcsK8NvXFCUgB9UeE" target="_blank" rel="noopener noreferrer" className="text-[#2dcefb] hover:underline ml-1 font-bold">
                      here
                    </a>.
                  </span>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] text-sm transition-all shadow-lg
                  ${isSubmitting 
                    ? 'bg-white/5 text-white/20 cursor-not-allowed' 
                    : 'bg-[#2dcefb] hover:bg-[#2dcefb]/90 text-[#0b0e14] hover:shadow-[0_0_20px_rgba(45,206,251,0.4)] active:scale-95'
                  }`}
              >
                {isSubmitting ? 'Initializing Team...' : 'Create Team'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamRegistration;