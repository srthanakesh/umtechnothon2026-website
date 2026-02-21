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
    <div className="min-h-screen bg-gradient-to-b from-[#696ea5] to-[#f8f7f7] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Team Registration</h1>
        
        {showMembers ? (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Team Created Successfully!</h2>
            <p className="text-center mb-6">Your team "{formData.teamName}" has been created with the following members:</p>
            
            <ul className="space-y-2 mb-8">
              {registeredMembers.map((member, index) => (
                <li key={index} className="bg-gray-100 p-3 rounded">
                  {member.full_name} ({member.email})
                </li>
              ))}
            </ul>
            
            <p className="text-center text-gray-600">Redirecting to team page...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8">
            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {successMessage}
              </div>
            )}
            
            {errors.submit && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {errors.submit}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="teamName" className="block text-gray-700 font-semibold mb-2">Team Name</label>
                <input
                  type="text"
                  id="teamName"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg ${errors.teamName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your team name"
                />
                {errors.teamName && <p className="text-red-500 text-sm mt-1">{errors.teamName}</p>}
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Team Members</h3>
                <p className="text-gray-600 mb-4">Enter up to 4 email addresses of registered participants to add to your team. You (the team leader) will be automatically added.</p>
                
                {formData.memberEmails.map((email, index) => (
                  <div key={index} className="mb-3">
                    <label htmlFor={`email${index}`} className="block text-gray-700 mb-1">Member {index + 1} Email</label>
                    <input
                      type="email"
                      id={`email${index}`}
                      value={email}
                      onChange={(e) => handleEmailChange(index, e.target.value)}
                      className={`w-full p-3 border rounded-lg ${
                        errors.invalidEmails?.some(e => e.index === index) ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="participant@example.com"
                    />
                    {errors.invalidEmails?.some(e => e.index === index) && (
                      <p className="text-red-500 text-sm mt-1">Invalid email format</p>
                    )}
                  </div>
                ))}
                
                {errors.memberEmails && <p className="text-red-500 text-sm">{errors.memberEmails}</p>}
              </div>

              <div className="mb-4">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    name="paymentConfirmation"
                    className="mt-1 mr-2"
                    checked={formData.paymentConfirmation}
                    onChange={(e) => setFormData({...formData, paymentConfirmation: e.target.checked})}
                    required
                  />
                  <span>
                    I have paid for the deposit and team registration <a
                    href="https://app.youths.asia/event/9L2QcsK8NvXFCUgB9UeE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    here
                  </a>.
                  </span>
                </label>
                {errors.paymentConfirmation && <p className="text-red-500 text-sm mt-1">{errors.paymentConfirmation}</p>}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-[#696ea5] text-white py-3 rounded-lg font-semibold text-lg transition ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#5a5f95]'
                }`}
              >
                {isSubmitting ? 'Creating Team...' : 'Create Team'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamRegistration;