import React from "react";
import styles from "./styles.module.scss";

// Loader component with a size prop
const Loader = ({ size }) => {
  // JSX structure for the Loader component
  return (
    <div className={styles.loader} style={{ width: size, height: size }}></div>
  );
};

// Export the Loader component
export default Loader;
