import React from 'react';

const TaskDetailsForm = ({ taskName, setTaskName, taskDescription, setTaskDescription }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-[#fafdff]">Task Details</h2>

      <div className="mb-4">
        <label className="block text-[#2dcefb] text-sm font-bold mb-2" htmlFor="taskName">
          Task Name *
        </label>
        <input
          id="taskName"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 bg-[#111827] text-white border-white/10 focus:ring-2 focus:ring-[#2dcefb] focus:border-transparent leading-tight focus:outline-none focus:shadow-outline"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-[#2dcefb] text-sm font-bold mb-2" htmlFor="taskDescription">
          Task Description
        </label>
        <textarea
          id="taskDescription"
          className="shadow appearance-none border rounded w-full py-2 px-3 bg-[#111827] text-white border-white/10 focus:ring-2 focus:ring-[#2dcefb] focus:border-transparent leading-tight focus:outline-none focus:shadow-outline h-32"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Enter task description"
        />
      </div>
    </div>
  );
};

export default TaskDetailsForm;