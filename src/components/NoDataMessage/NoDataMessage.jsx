// Importing the styles module to use CSS classes
import styles from "./styles.module.scss";

// Functional component for displaying a message when no data is found
const NoDataMessage = ({ message = "Data not found" }) => {
  // Returning a div element with a custom class from the styles module and the provided message
  return <div className={styles.container}>{message}</div>;
};

// Exporting the NoDataMessage component as the default export
export default NoDataMessage;
