import React from 'react';

const RubricDetailsForm = ({ rubricName, setRubricName, rubricDescription, setRubricDescription }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-[#fafdff]">Rubric Details</h2>

      <div className="mb-4">
        <label className="block text-[#2dcefb] text-sm font-bold mb-2" htmlFor="rubricName">
          Rubric Name
        </label>
        <input
          id="rubricName"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 bg-[#111827] text-white border-white/10 focus:ring-2 focus:ring-[#2dcefb] focus:border-transparent leading-tight focus:outline-none focus:shadow-outline"
          value={rubricName}
          onChange={(e) => setRubricName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-[#2dcefb] text-sm font-bold mb-2" htmlFor="rubricDescription">
          Rubric Description
        </label>
        <textarea
          id="rubricDescription"
          className="shadow appearance-none border rounded w-full py-2 px-3 bg-[#111827] text-white border-white/10 focus:ring-2 focus:ring-[#2dcefb] focus:border-transparent leading-tight focus:outline-none focus:shadow-outline"
          value={rubricDescription}
          onChange={(e) => setRubricDescription(e.target.value)}
        />
      </div>
    </div>
  );
};

export default RubricDetailsForm;