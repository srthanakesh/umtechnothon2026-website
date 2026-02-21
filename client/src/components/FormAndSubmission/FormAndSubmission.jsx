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
  // initiate a user variable and call the method to get the user
  const { user } = useUser();

  // TODO: Step 2: Replace task id with the correct one here.
  const taskId = 7;

  // Base API URL from environment variables
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch task and criteria data
  useEffect(() => {
    const fetchTaskAndCriteria = async () => {
      setIsLoading(true);
      try {
        // Fetch the specific task by task_id
        const taskResponse = await axios.get(`${API_URL}/tasks/${taskId}`);
        setTask(taskResponse.data);

        // Fetch criteria data
        const rubricResponse = await axios.get(`${API_URL}/rubrics?task_id=${taskId}`);
        if (rubricResponse.data && rubricResponse.data.length > 0) {
          const rubricId = rubricResponse.data[0].rubric_id;
          
          // Then get criteria filtered by rubric_id
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
  }, [taskId, API_URL]); // Dependency array includes taskId and API_URL to refetch if they change

  const handleSubmit = async () => {
    // Validation logic
    if (!taskDescription || !deliverables) {
      alert("Both 'Describe your Task' and 'Deliverables' fields are required.");
      return;
    }

    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator

    if (!urlPattern.test(deliverables)) {
      alert("The 'Deliverables' field must be a valid URL.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to submit this task?\nYou can only submit it once."
    );
    if (!confirmed) {
      console.log('User canceled the action.');
      return;
    }

    try {
      // Send the deliverable data to the backend
      const response = await axios.post(`${API_URL}/deliverables`, {
        description: taskDescription,
        submission_link: deliverables,
        team_id: user.team_id,
        task_id: task.task_id,
      });

      if (response.status === 201) {
        alert('Deliverable submitted successfully!');
        setTaskDescription('');
        setDeliverables('');
        setIsExpanded(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(error.response.data.error || 'Your team already has a submission for this task.');
      } else {
        // Generic error for other cases
        alert('Failed to submit deliverable. Please try again.');
      }
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const closeExpand = () => {
    setIsExpanded(false);
  };

  return (
    <div className="bg-gradient-to-b from-[#b7dcff] to-[#6a6fa5] min-h-screen p-4 md:p-8 text-center relative">
      {/* Week indicator - responsive positioning */}
      <h2 className="text-xl md:text-2xl text-black font-bold my-4">
        {/* TODO: Step 1: Update date here */}
        Preliminary Round: 5 May - 14 May 2025
      </h2>
      
      {/* Main content container */}
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        {/* Task and criteria container - full width on mobile, left side on desktop */}
        <div 
          className="w-full md:w-2/3 bg-[#efece6] rounded-2xl shadow-lg p-4 md:p-6 flex flex-col"
          style={{ overflow: 'auto' }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <p className="text-xl text-gray-700">Loading task details...</p>
            </div>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4 md:mb-6">
                Task
              </h2>
              
              {/* Task Name */}
              <div className="mb-4 md:mb-6">
                <p className="text-base md:text-lg text-gray-800 font-semibold mb-2">
                  Task Name:
                </p>
                <div className="p-2 md:p-3 bg-gray-300 rounded-lg w-full min-h-10">
                  {task ? task.task_name : 'No task found'}
                </div>
              </div>
              
              {/* Task Description */}
              <div className="mb-6 md:mb-8">
                <p className="text-base md:text-lg text-gray-800 font-semibold mb-2">
                  Task Description:
                </p>
                <div className="p-2 md:p-3 bg-gray-300 rounded-lg w-full min-h-20">
                  {task ? task.task_description : 'No description available'}
                </div>
              </div>
              
              {/* Criteria Section */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-4 md:mb-6">
                Criteria
              </h2>
              
              {criteria.length > 0 ? (
                <div className="space-y-6 md:space-y-8">
                  {criteria.map((item, index) => (
                    <div key={item.criteria_id} className="p-3 md:p-4 bg-gray-100 rounded-lg">
                      <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
                        Criteria {index + 1}
                      </h3>
                      
                      <div className="mb-3 md:mb-4">
                        <p className="text-gray-800 font-medium mb-2">
                          Name:
                        </p>
                        <div className="p-2 bg-gray-300 rounded-lg">
                          {item.criteria_name}
                        </div>
                      </div>

                      {item.criteria_description && (
                        <div>
                          <p className="text-gray-800 font-medium mb-2">
                            Description:
                          </p>
                          <div className="p-2 bg-gray-300 rounded-lg min-h-16">
                            {item.criteria_description}
                          </div>
                        </div>
                      )}
                      
                      {item.max_points && (
                        <div className="mt-2 text-right">
                          <span className="text-sm font-medium bg-blue-100 text-blue-800 py-1 px-2 rounded">
                            Max Points: {item.max_points}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 md:p-6 bg-gray-100 rounded-lg">
                  <p className="text-gray-500 italic">No criteria available for this task</p>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Submission section - full width on mobile, right side on desktop */}
        <div className="mt-4 md:mt-0 w-full md:w-1/3">
          {/* Submission button or form */}
          <div 
            className={`w-full transition-all duration-300 ease-in-out bg-white rounded-2xl shadow-lg ${
              isExpanded ? 'p-4 md:p-6' : 'p-2 md:p-4'
            }`}
          >
            {isExpanded ? (
              <div className="relative">
                {/* Close button */}
                <button
                  onClick={closeExpand}
                  className="absolute top-0 right-0 text-red-500 text-xl font-bold p-2 border border-red-500 rounded"
                  aria-label="Close submission form"
                >
                  X
                </button>
                
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-4 mt-2">
                  Submission
                </h3>
                
                <div className="mb-4">
                  <label 
                    htmlFor="taskDescription" 
                    className="block text-gray-800 font-medium mb-2"
                  >
                    Describe your Task:
                  </label>
                  <textarea
                    id="taskDescription"
                    className="p-2 bg-gray-300 rounded-lg w-full h-32 md:h-40"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Describe your task here..."
                  />
                </div>
                
                <div className="mb-6">
                  <label 
                    htmlFor="deliverables" 
                    className="block text-gray-800 font-medium mb-2"
                  >
                    Deliverables:
                  </label>
                  <textarea
                    id="deliverables"
                    className="p-2 bg-gray-300 rounded-lg w-full h-20"
                    value={deliverables}
                    onChange={(e) => setDeliverables(e.target.value)}
                    placeholder="Insert link"
                  />
                </div>
                
                {/* Submit button centered and with proper spacing */}
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleSubmit}
                    className="bg-[#e09af3] text-black border-none py-3 px-6 text-lg font-bold cursor-pointer rounded-2xl transition duration-300 ease-in-out transform hover:bg-[#de94f2] hover:scale-105 w-full md:w-auto"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={toggleExpand}
                className="w-full text-lg font-bold cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 px-4 py-2 rounded-2xl bg-[#de94f2] text-black"
              >
                Ready to Submit?
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAndSubmission;
