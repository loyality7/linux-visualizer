import React, { useState } from 'react';

const CommandInput = ({ onExecute }) => {
  const [command, setCommand] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onExecute(command);
    setCommand('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Enter Linux command (e.g., ls, cd)"
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Execute
      </button>
    </form>
  );
};

export default CommandInput;