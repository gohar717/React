// Importing the close icon and button component
import closeIcon from "../../../assets/images/Icons/close_icon.png";
import Button from "../../Button/Button";

// Importing SCSS styles
import styles from "./styles.module.scss";

// React component for viewing NFT details
const ViewNftDetailsModal = ({ onClose, description }) => {
  return (
    // Modal container with a click event to close the modal
    <div className={styles.container} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        {/* Modal header with title and close icon */}
        <div className={styles.modalHeader}>
          <h3>Description</h3>
          {/* Close icon with a click event to close the modal */}
          <img
            rel="preload"
            className={styles.close}
            src={closeIcon}
            onClick={onClose}
            alt="close icon"
          />
        </div>

        {/* Modal body displaying NFT description */}
        <div className={styles.modalBody}>
          <span>{description}</span>
        </div>

        {/* Modal footer with a close button */}
        <div className={styles.modalFooter}>
          <Button onClick={onClose} size="medium" color="blue">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

// Exporting the component
export default ViewNftDetailsModal;
