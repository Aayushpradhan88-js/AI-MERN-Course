import React from "react";

// Purely presentational — parent owns the state
function TextInput({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border p-2 rounded"
    />
  );
}

export default TextInput