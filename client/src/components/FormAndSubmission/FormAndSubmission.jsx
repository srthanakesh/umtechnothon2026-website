import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from "../../context/UserProvider";
import envConfig from '../../config/envConfig';

const FormAndSubmission = () => {
  const [task, setTask] = useState(null); 
  const [criteria, setCriteria] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  const API_URL = envConfig.serverBaseApi;

  useEffect(() => {
    const fetchTaskAndCriteria = async () => {
      setIsLoading(true);
      try {
        // Fetch all tasks and use the latest one
        const allTasksResponse = await axios.get(`${API_URL}/tasks`);
        const allTasks = allTasksResponse.data;

        if (!allTasks || allTasks.length === 0) {
          setTask(null);
          setCriteria([]);
          setIsLoading(false);
          return;
        }

        const latestTask = allTasks[allTasks.length - 1];
        setTask(latestTask);
        const currentTaskId = latestTask.task_id;

        const rubricResponse = await axios.get(`${API_URL}/rubrics?task_id=${currentTaskId}`);
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
  }, [API_URL]);



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
          <div className="w-full transition-all duration-300 ease-in-out bg-[#161b33] border border-cyan-500/30 rounded-2xl shadow-lg p-4 md:p-6 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 mt-2">Submission</h3>
            <p className="text-gray-400 mb-6 text-sm">
              Task submissions are handled via Google Forms. Click the button below to submit your deliverables.
            </p>
            <button 
              onClick={() => {}} 
              className="w-full text-lg font-bold px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90 transition-all uppercase tracking-tight"
            >
              Ready to Submit?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAndSubmission;