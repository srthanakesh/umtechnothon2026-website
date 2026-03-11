import React from 'react';

const SubmissionViewer = ({
  selectedTeam,
  setSelectedTeam,
  selectedTask,
  setSelectedTask,
  teams,
  tasks,
  submission
}) => {
  return (
    <div className="flex-1 bg-[#111827] border border-white/10 rounded-2xl shadow-2xl p-6">
      <h2 className="text-xl font-semibold mb-4 ">Team Submission</h2>

      {/* Team Selection Dropdown */}
      <div className="mb-4">
        <label className="block text-[#2dcefb] text-sm font-bold mb-2">
          Select Team
        </label>
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="w-full bg-[#0b0e14] text-white border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-[#2dcefb] outline-none transition-all appearance-none"
        >
          <option value="">-- Select Team --</option>
          {teams.map(team => (
            <option key={team.team_id} value={team.team_id}>
              {team.team_name}
            </option>
          ))}
        </select>
      </div>

      {/* Task Selection Dropdown */}
      <div className="mb-6">
        <label className="block text-[#2dcefb] text-sm font-bold mb-2">
          Select Task
        </label>
        <select
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value)}
          className="w-full bg-[#0b0e14] text-white border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-[#2dcefb] outline-none transition-all appearance-none"
        >
          <option value="">-- Select Task --</option>
          {tasks.map(task => (
            <option key={task.task_id} value={task.task_id}>
              {task.task_name}
            </option>
          ))}
        </select>
      </div>

      {/* Task Details and Submission */}
      {selectedTask && tasks.length > 0 && (
        <div className="mb-6 p-4 bg-[#0b0e14] border border-white/5 rounded-xl">
          <h3 className="text-lg font-medium mb-2 text-[#e151af]">Task Details</h3>
          {tasks.find(t => t.task_id == selectedTask)?.task_description && (
            <div className="mb-4">
              <p className="text-white/70 whitespace-pre-wrap text-sm italic">
                {tasks.find(t => t.task_id == selectedTask)?.task_description}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Submission Details */}
      {submission ? (
        <div className="mt-6 p-4 bg-[#0b0e14] border border-[#2dcefb]/20 rounded-xl">
          <h3 className="text-[#2dcefb] font-bold mb-2 uppercase text-xs tracking-widest">Team's Submission</h3>
          <p className="mb-2 text-sm text-gray-500">
            Submitted on: {new Date(submission.submitted_at).toLocaleString()}
          </p>
          <div className="mb-4">
            <p className="text-white/80 font-medium mb-3">Submission Link:</p>
            <a
              href={submission.submission_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 break-all"
            >
              {submission.submission_link}
            </a>
          </div>
        </div>
      ) : selectedTeam && selectedTask ? (
        <div className="text-center p-4 bg-yellow-50 rounded-md">
          <p className="text-yellow-600">No submission found for this team and task.</p>
        </div>
      ) : null}
    </div>
  );
};

export default SubmissionViewer;