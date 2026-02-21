import React from 'react';

const RubricDetailsForm = ({ rubricName, setRubricName, rubricDescription, setRubricDescription }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Rubric Details</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rubricName">
          Rubric Name
        </label>
        <input
          id="rubricName"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={rubricName}
          onChange={(e) => setRubricName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rubricDescription">
          Rubric Description
        </label>
        <textarea
          id="rubricDescription"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={rubricDescription}
          onChange={(e) => setRubricDescription(e.target.value)}
        />
      </div>
    </div>
  );
};

export default RubricDetailsForm;