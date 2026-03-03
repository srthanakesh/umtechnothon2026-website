import React from 'react';

const CriteriaForm = ({ criteria, addCriteria, removeCriteria, updateCriteria }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#fafdff]">Evaluation Criteria</h2>
      </div>

      {criteria.map((criterion, index) => (
        <div key={index} className="bg-[#111827] p-6 mb-6 rounded-xl border border-white/10 shadow-xl">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-[#e151af]">Criteria #{index + 1}</h3>
            {criteria.length > 1 && (
              <button
                type="button"
                onClick={() => removeCriteria(index)}
                className="text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-[#2dcefb] text-sm font-bold mb-2">
                Criteria Name *
              </label>
              <input
                type="text"
                className="w-full bg-[#0b0e14] text-white border border-white/10 rounded py-2 px-3 focus:ring-2 focus:ring-[#2dcefb] outline-none"
                value={criterion.name}
                onChange={(e) => updateCriteria(index, 'name', e.target.value)}
                placeholder="Enter criteria name"
                required
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-[#2dcefb] text-sm font-bold mb-2">
                Description
              </label>
              <input
                type="text"
                className="w-full bg-[#0b0e14] text-white border border-white/10 rounded py-2 px-3 focus:ring-2 focus:ring-[#2dcefb] outline-none"
                value={criterion.description}
                onChange={(e) => updateCriteria(index, 'description', e.target.value)}
                placeholder="Enter description"
              />
            </div>

            <div>
              <label className="block text-[#2dcefb] text-sm font-bold mb-2">
                Maximum Points
              </label>
              <input
                type="number"
                min="1"
                max="100"
                className="w-full bg-[#0b0e14] text-white border border-white/10 rounded py-2 px-3 focus:ring-2 focus:ring-[#2dcefb] outline-none"
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
        className="bg-[#2dcefb]/10 text-[#2dcefb] border border-[#2dcefb]/20 hover:bg-[#2dcefb]/20 font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        + Add Another Criteria
      </button>
    </div>
  );
};

export default CriteriaForm;