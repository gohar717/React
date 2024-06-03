import React from "react";
import styles from "./styles.module.scss";

// TextArea component that takes various props for customization
const TextArea = ({
  placeholder,
  label,
  onChange,
  type,
  value,
  error,
  rows,
}) => {
  // Conditionally applying styles based on the presence of an error
  const labelClassName = error && styles.label_error;
  const textAreaClassName = error && styles.textarea_error;

  return (
    <div className={styles.container}>
      {/* Label for the textarea with optional error styling */}
      <label className={labelClassName} id={label}>
        {label}
      </label>

      {/* Textarea input with optional error styling */}
      <textarea
        className={textAreaClassName}
        rows={rows ? rows : "5"}
        id={label}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />

      {/* Displaying an error message when there is an error */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default TextArea;
