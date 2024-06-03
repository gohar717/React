// Importing React and necessary components
import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import styles from "./styles.module.scss"; // Importing local styles

// Functional component for rendering web episodes
const WebEpisodes = () => {
  return (
    <Container>
      <div className={styles.container}>
        <h2>Web Episodes</h2>
        <div>
          {/* Link to Web Episode 0 with a relative path */}
          <Link to="/curse-of-the-holoforms">Trilium Quest: Curse of the Holoforms</Link>
        </div>
      </div>
    </Container>
  );
};

export default WebEpisodes;
