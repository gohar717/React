// Importing necessary components and styles
import Container from "../../components/Container/Container";
import styles from "./styles.module.scss";
import Tq01 from "../../components/TQ01/Tq01";

// Functional component for displaying Web Episode 0
const WebEpisode0 = () => {
  return (
    // Using the Container component for layout consistency
    <Container>
      <div className={styles.container}>
        {/* Title of the web episode */}
        <h2>Trilium Quest: Curse of the Holoforms (Beta)</h2>

        {/* Container for the embedded iframe and direct link */}
        <div>
          {/* Embedded iframe for displaying the web episode */}
          <Tq01 />
        </div>
      </div>
    </Container>
  );
};

// Exporting the component for use in other parts of the application
export default WebEpisode0;
