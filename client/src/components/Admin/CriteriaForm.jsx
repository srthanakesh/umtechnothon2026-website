import React from 'react';

const CriteriaForm = ({ criteria, addCriteria, removeCriteria, updateCriteria }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Evaluation Criteria</h2>
      </div>

      {criteria.map((criterion, index) => (
        <div key={index} className="bg-gray-50 p-4 mb-4 rounded-md border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Criteria #{index + 1}</h3>
            {criteria.length > 1 && (
              <button
                type="button"
                onClick={() => removeCriteria(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Criteria Name *
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={criterion.name}
                onChange={(e) => updateCriteria(index, 'name', e.target.value)}
                placeholder="Enter criteria name"
                required
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={criterion.description}
                onChange={(e) => updateCriteria(index, 'description', e.target.value)}
                placeholder="Enter description"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Maximum Points
              </label>
              <input
                type="number"
                min="1"
                max="100"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={criterion.maxPoints}
                onChange={(e) => updateCriteria(index, 'maxPoints', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addCriteria}
        className="bg-blue-100 text-blue-800 hover:bg-blue-200 font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        + Add Another Criteria
      </button>
    </div>
  );
};

export default CriteriaForm;