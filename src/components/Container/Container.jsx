// Import React and styles
import React from "react";
import styles from "./styles.module.scss";

// Container component definition
const Container = ({ children }) => {
  // Render a container div with the specified styles
  return (
    <div className={styles.container}>
      <div>{children}</div>
    </div>
  );
};

// Export the Container component as the default export
export default Container;
