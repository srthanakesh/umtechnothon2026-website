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
    <div className="flex-1 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Marking</h2>

      {/* Rubric Display */}
      {rubric ? (
        <div className="mb-6 p-4 border border-gray-300 rounded-md">
          <h3 className="text-lg font-medium mb-2">{rubric.rubric_name}</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{rubric.rubric_description}</p>
        </div>
      ) : selectedTask ? (
        <div className="mb-6 p-4 bg-yellow-50 rounded-md">
          <p className="text-yellow-600">No rubric found for this task.</p>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <p className="text-gray-500">Please select a task to view the rubric.</p>
        </div>
      )}

      {/* Criteria Marking */}
      {criteria.length > 0 ? (
        <div className="mb-6 space-y-6">
          <h3 className="text-lg font-medium">Criteria</h3>

          {criteria.map((criterion) => {
            const criteriaScore = criteriaScores.find(
              score => score.criteria_id === criterion.criteria_id
            );

            return (
              <div key={criterion.criteria_id} className="p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{criterion.criteria_name}</h4>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min="0"
                      max={criterion.max_points}
                      value={criteriaScore?.points_awarded || 0}
                      onChange={(e) => handlePointsChange(criterion.criteria_id, e.target.value)}
                      className="w-16 p-1 border border-gray-300 rounded-md text-center"
                    />
                    <span className="ml-1 text-sm text-gray-500">
                      / {criterion.max_points}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-3">{criterion.criteria_description}</p>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Justification
                  </label>
                  <textarea
                    value={criteriaScore?.justification || ''}
                    onChange={(e) => handleJustificationChange(criterion.criteria_id, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    rows="2"
                    placeholder="Provide feedback for this criterion"
                  ></textarea>
                </div>
              </div>
            );
          })}
        </div>
      ) : selectedTask ? (
        <div className="mb-6 p-4 bg-yellow-50 rounded-md">
          <p className="text-yellow-600">No criteria found for this task.</p>
        </div>
      ) : null}

      {/* Total Score and Submit */}
      {criteria.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-semibold">Total Score:</h3>
            <span className="text-xl font-bold">{totalScore} points</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!submission}
            className={`w-full py-3 px-4 rounded-md text-white font-medium 
              ${submission 
                ? 'bg-indigo-600 hover:bg-indigo-700' 
                : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Submit Marks
          </button>

          {!submission && selectedTask && (
            <p className="mt-2 text-sm text-red-500 text-center">
              Cannot submit marks without a team submission.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SubmissionMarker;