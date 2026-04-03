// client/src/components/admin/SubmissionMarker.jsx
import React from 'react';

const SubmissionMarker = ({
  selectedTask,
  submission,
  rubric,
  criteria,
  criteriaScores,
  totalScore,
  handlePointsChange,
  handleJustificationChange,
  handleSubmit
}) => {
  return (
    <div className="flex-1 bg-[#111827] border border-white/10 rounded-2xl shadow-2xl p-6 text-[#fafdff]">
      <h2 className="text-xl font-bold mb-4">Marking</h2>

      {/* Rubric Display */}
      {rubric ? (
        <div className="mb-6 p-4 border border-white/10 bg-[#0b0e14]/50 rounded-md">
          <h3 className="text-lg font-medium mb-2 text-[#2dcefb]">{rubric.rubric_name}</h3>
          <p className="text-white/70 whitespace-pre-wrap">{rubric.rubric_description}</p>
        </div>
      ) : selectedTask ? (
        <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-500/50 rounded-md">
          <p className="text-yellow-200">No rubric found for this task.</p>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-md">
          <p className="text-white/40">Please select a task to view the rubric.</p>
        </div>
      )}

      {/* Criteria Marking */}
      {criteria.length > 0 ? (
        <div className="mb-6 space-y-6">
          <h3 className="text-lg font-medium text-[#fafdff]">Criteria</h3>

          {criteria.map((criterion) => {
            const criteriaScore = criteriaScores.find(
              score => score.criteria_id === criterion.criteria_id
            );

            return (
              <div key={criterion.criteria_id} className="p-4 border border-white/10 bg-[#0b0e14] rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-[#2dcefb]">{criterion.criteria_name}</h4>
                  <div className="flex items-center bg-[#111827] border border-white/10 rounded-lg px-2">
                    <input
                      type="number"
                      min="0"
                      max={criterion.max_points}
                      value={criteriaScore?.points_awarded || 0}
                      onChange={(e) => handlePointsChange(criterion.criteria_id, e.target.value)}
                      className="w-12 bg-transparent text-[#2dcefb] font-bold py-1 text-center outline-none"
                    />
                    <span className="ml-1 text-sm text-white/30">
                      / {criterion.max_points}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-white/60 mb-3">{criterion.criteria_description}</p>

                <div>
                  <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-1">
                    Justification
                  </label>
                  <textarea
                    value={criteriaScore?.justification || ''}
                    onChange={(e) => handleJustificationChange(criterion.criteria_id, e.target.value)}
                    className="w-full p-3 bg-[#111827] border border-white/10 rounded-lg text-white text-sm focus:ring-1 focus:ring-[#e151af] outline-none"
                    rows="2"
                    placeholder="Provide feedback for this criterion"
                  ></textarea>
                </div>
              </div>
            );
          })}
        </div>
      ) : selectedTask ? (
        <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-500/50 rounded-md text-yellow-200">
          <p className="text-yellow-600">No criteria found for this task.</p>
        </div>
      ) : null}

      {/* Total Score and Submit */}
      {criteria.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6 p-4 bg-[#2dcefb]/5 border border-[#2dcefb]/20 rounded-xl">
            <h3 className="text-lg font-semibold text-[#fafdff]">Total Score:</h3>
            <span className="text-xl font-bold text-[#2dcefb]">{totalScore} points</span>
          </div>

          <button
            onClick={handleSubmit}
            
            className="w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all bg-indigo-600 hover:bg-indigo-700 text-white"
>
            Submit Marks
          </button>

          
        </div>
      )}
    </div>
  );
};

export default SubmissionMarker;