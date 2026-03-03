import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TaskDetailsForm from '../../components/Admin/TaskDetailsForm';
import RubricDetailsForm from '../../components/Admin/RubricDetailsForm';
import CriteriaForm from '../../components/Admin/CriteriaForm';

const AddTask = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Task state
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  // Rubric state
  const [rubricName, setRubricName] = useState('Evaluation Rubric');
  const [rubricDescription, setRubricDescription] = useState('Evaluation criteria for this task');

  // Criteria state - array of criteria objects
  const [criteria, setCriteria] = useState([
    { name: '', description: '', maxPoints: 10 }
  ]);

  // Add a new empty criteria
  const addCriteria = () => {
    setCriteria([...criteria, { name: '', description: '', maxPoints: 10 }]);
  };

  // Remove a criteria at a specific index
  const removeCriteria = (index) => {
    const updatedCriteria = criteria.filter((_, i) => i !== index);
    setCriteria(updatedCriteria);
  };

  // Update a specific criteria field
  const updateCriteria = (index, field, value) => {
    const updatedCriteria = [...criteria];
    updatedCriteria[index] = { ...updatedCriteria[index], [field]: value };
    setCriteria(updatedCriteria);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Validate inputs
    if (!taskName.trim()) {
      setErrorMessage('Task name is required');
      setIsSubmitting(false);
      return;
    }

    // Validate that each criteria has a name
    const invalidCriteria = criteria.findIndex(c => !c.name.trim());
    if (invalidCriteria !== -1) {
      setErrorMessage(`Criteria #${invalidCriteria + 1} needs a name`);
      setIsSubmitting(false);
      return;
    }

    try {
      // Step 1: Create the task
      const taskResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/tasks`,
        {
          task_name: taskName,
          task_description: taskDescription
        });

      const taskId = taskResponse.data.task.task_id;

      // Step 2: Create the rubric for this task
      const rubricResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/rubrics`,
        {
          task_id: taskId,
          rubric_name: rubricName,
          rubric_description: rubricDescription,
        });

      const rubricId = rubricResponse.data.rubric.rubric_id;

      // Step 3: Create each criteria for this rubric
      const criteriaPromises = criteria.map(c => axios.post(`${import.meta.env.VITE_API_URL}/criteria`, {
        rubric_id: rubricId,
          criteria_name: c.name,
          criteria_description: c.description,
          max_points: parseInt(c.maxPoints)
      })
      );

      await Promise.all(criteriaPromises);

      setSuccessMessage('Task created successfully!');
      // Reset form fields
      setTaskName('');
      setTaskDescription('');
      setRubricName('Evaluation Rubric');
      setRubricDescription('Evaluation criteria for this task');
      setCriteria([{ name: '', description: '', maxPoints: 10 }]);

    } catch (error) {
      console.error('Error creating task:', error);
      setErrorMessage(error.response?.data?.error || 'An error occurred while creating the task');
    } finally {
      setIsSubmitting(false);
    }


  };

  return (
    /* Outer wrapper forces the dark bg to fill the entire screen width and height */
  <div className="min-h-screen bg-[#0b0e14] w-full text-[#fafdff]">
    
    {/* Inner container stays centered and constrained */}
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#fafdff] mb-6">Add New Task</h1>

      <form onSubmit={handleSubmit}>
        <TaskDetailsForm
          taskName={taskName}
          setTaskName={setTaskName}
          taskDescription={taskDescription}
          setTaskDescription={setTaskDescription}
        />

        <RubricDetailsForm
          rubricName={rubricName}
          setRubricName={setRubricName}
          rubricDescription={rubricDescription}
          setRubricDescription={setRubricDescription}
        />

        <CriteriaForm
          criteria={criteria}
          addCriteria={addCriteria}
          removeCriteria={removeCriteria}
          updateCriteria={updateCriteria}
        />

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Creating Task...' : 'Create Task'}
          </button>
        </div>
      </form>

      <br></br><br></br>
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

    </div>
  </div>
  );
};

export default AddTask;