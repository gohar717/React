import React from "react";
import styles from "./styles.module.scss";

// Input component with destructuring of props
const Input = ({
  label, // Label for the input field
  placeholder = "", // Placeholder text (default: empty string)
  type = "text", // Input type (default: text)
  value = "", // Input value (default: empty string)
  onChange = () => {}, // Event handler for input change (default: empty function)
  error = "", // Error message (default: empty string)
}) => {
  // Conditionally apply styles for label and input based on error presence
  const labelClassName = error && styles.label_error;
  const inputClassName = error && styles.input_error;

  // JSX structure for the Input component
  return (
    <div className={styles.container}>
      {/* Label for the input */}
      <label className={labelClassName} id={label}>
        {label}
      </label>

      {/* Input field */}
      <input
        className={inputClassName}
        id={label}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />

      {/* Display error message if present */}
      {error && <p>{error}</p>}
    </div>
  );
};

// Export the Input component
export default Input;
