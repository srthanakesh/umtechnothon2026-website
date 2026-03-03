import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from "../../context/UserProvider";

const FormAndSubmission = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [taskDescription, setTaskDescription] = useState('');
  const [deliverables, setDeliverables] = useState('');
  const [task, setTask] = useState(null); 
  const [criteria, setCriteria] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  const taskId = 7;
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTaskAndCriteria = async () => {
      setIsLoading(true);
      try {
        const taskResponse = await axios.get(`${API_URL}/tasks/${taskId}`);
        setTask(taskResponse.data);

        const rubricResponse = await axios.get(`${API_URL}/rubrics?task_id=${taskId}`);
        if (rubricResponse.data && rubricResponse.data.length > 0) {
          const rubricId = rubricResponse.data[0].rubric_id;
          const criteriaResponse = await axios.get(`${API_URL}/criteria?rubric_id=${rubricId}`);
          setCriteria(criteriaResponse.data);
        } else {
          console.log('No rubrics found for this task');
          setCriteria([]);
        }
      } catch (error) {
        console.error('Error fetching task or criteria:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTaskAndCriteria();
  }, [taskId, API_URL]);

  const handleSubmit = async () => {
    if (!taskDescription || !deliverables) {
      alert("Both 'Describe your Task' and 'Deliverables' fields are required.");
      return;
    }

    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + 
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + 
        '((\\d{1,3}\\.){3}\\d{1,3}))' + 
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + 
        '(\\?[;&a-z\\d%_.~+=-]*)?' + 
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); 

    if (!urlPattern.test(deliverables)) {
      alert("The 'Deliverables' field must be a valid URL.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to submit this task?\nYou can only submit it once."
    );
    if (!confirmed) return;

    try {
      // FIX 1: Added optional chaining to prevent crash if user or task is null
      await axios.post(`${API_URL}/deliverables`, {
        description: taskDescription,
        submission_link: deliverables,
        team_id: user?.team_id,
        task_id: task?.task_id,
      });

      alert('Deliverable submitted successfully!');
      setTaskDescription('');
      setDeliverables('');
      setIsExpanded(false);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(error.response.data.error || 'Your team already has a submission for this task.');
      } else {
        alert('Failed to submit deliverable. Please try again.');
      }
    }
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const closeExpand = () => setIsExpanded(false);

  // FIX 2: Early return if user context isn't ready
  if (!user) return <div className="p-8 text-center text-white">Loading session...</div>;

  return (
    <div className="bg-[#0a0c1b] min-h-screen p-4 md:p-8 text-center relative text-white">
      <h2 className="text-xl md:text-2xl text-cyan-400 font-bold my-4 uppercase tracking-wider">
        Preliminary Round: 25 April - 3 May 2026
      </h2>
      
      <div className="flex flex-col md:flex-row gap-4 mt-4 text-left">
        <div 
          className="w-full md:w-2/3 bg-[#161b33] border border-white/10 rounded-2xl shadow-lg p-4 md:p-6 flex flex-col"
          style={{ overflow: 'auto' }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <p className="text-xl text-cyan-400 animate-pulse">Loading task details...</p>
            </div>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 md:mb-6 uppercase tracking-tighter">Task</h2>
              
              <div className="mb-4 md:mb-6">
                <p className="text-base md:text-lg text-cyan-400 font-semibold mb-2">Task Name:</p>
                <div className="p-2 md:p-3 bg-black/40 border border-white/10 rounded-lg w-full min-h-10 text-gray-200">
                  {task ? task.task_name : 'No task found'}
                </div>
              </div>
              
              <div className="mb-6 md:mb-8">
                <p className="text-base md:text-lg text-cyan-400 font-semibold mb-2">Task Description:</p>
                <div className="p-2 md:p-3 bg-black/40 border border-white/10 rounded-lg w-full min-h-20 text-gray-200 leading-relaxed">
                  {task ? task.task_description : 'No description available'}
                </div>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4 md:mb-6 uppercase tracking-tighter">Criteria</h2>
              
              {Array.isArray(criteria) && criteria.length > 0 ? (
                <div className="space-y-6 md:space-y-8">
                  {criteria.map((item, index) => (
                    <div key={item.criteria_id || index} className="p-3 md:p-4 bg-white/5 border border-white/5 rounded-lg">
                      <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-purple-400">
                        Criteria {index + 1}
                      </h3>
                      <div className="mb-3">
                        <p className="text-gray-400 font-medium mb-2 text-sm uppercase">Name:</p>
                        <div className="p-2 bg-black/20 border border-white/5 rounded-lg">{item.criteria_name}</div>
                      </div>
                      {item.criteria_description && (
                        <div>
                          <p className="text-gray-400 font-medium mb-2 text-sm uppercase">Description:</p>
                          <div className="p-2 bg-black/20 border border-white/5 rounded-lg min-h-16 text-gray-300">{item.criteria_description}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 md:p-6 bg-white/5 rounded-lg">
                  <p className="text-gray-500 italic">No criteria available for this task</p>
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="mt-4 md:mt-0 w-full md:w-1/3">
          <div className={`w-full transition-all duration-300 ease-in-out bg-[#161b33] border border-cyan-500/30 rounded-2xl shadow-lg ${isExpanded ? 'p-4 md:p-6' : 'p-2 md:p-4'}`}>
            {isExpanded ? (
              <div className="relative">
                <button onClick={closeExpand} className="absolute top-0 right-0 text-red-500 text-xl font-bold p-2 hover:bg-red-500/10 rounded">X</button>
                <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-4 mt-2">Submission</h3>
                <div className="mb-4">
                  <label htmlFor="taskDescription" className="block text-cyan-400 font-medium mb-2 text-sm uppercase">Describe your Task:</label>
                  <textarea
                    id="taskDescription"
                    className="p-2 bg-black/40 border border-white/10 rounded-lg w-full h-32 md:h-40 text-white outline-none focus:border-cyan-500"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Describe your task here..."
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="deliverables" className="block text-cyan-400 font-medium mb-2 text-sm uppercase">Deliverables:</label>
                  <textarea
                    id="deliverables"
                    className="p-2 bg-black/40 border border-white/10 rounded-lg w-full h-20 text-white outline-none focus:border-cyan-500"
                    value={deliverables}
                    onChange={(e) => setDeliverables(e.target.value)}
                    placeholder="Insert link"
                  />
                </div>
                <div className="flex justify-center mt-4">
                  <button onClick={handleSubmit} className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-none py-3 px-6 text-lg font-bold rounded-2xl w-full hover:opacity-90 transition-all uppercase tracking-widest">SUBMIT</button>
                </div>
              </div>
            ) : (
              <button onClick={toggleExpand} className="w-full text-lg font-bold px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90 transition-all uppercase tracking-tight">Ready to Submit?</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAndSubmission;