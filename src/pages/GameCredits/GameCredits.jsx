import React from "react"; // Importing React library and Container component
import Container from "../../components/Container/Container"; // Importing Container component for layout
import styles from "./styles.module.scss"; // Importing styles for the component

// GameCredits component displays the credits for the game development team.
const GameCredits = () => {
  return (
    <Container>
      <div className={styles.container}>
        <h2>Game Credits</h2>

        {/* Game Director and Writers credits section. */}
        <div>
          <div>
            <span>Game Director: </span>
            <span>Ami Spero</span>
          </div>

          <div>
            <span>Writers: </span>
            <span>Ami Spero</span>
            <span>Robert Walcott</span>
          </div>
        </div>

        {/* 2D Art and Animation credits section. */}
        <div>
          <div>
            <span>2D Art and Animation: </span>
            <span>Ashlee LaVine</span>
          </div>
        </div>

        {/* Programmers and Music credits section. */}
        <div>
          <div>
            <span>Programmers: </span>
            <span>Ami Spero</span>
            <span>Inna Ayvazyan</span>
            <span>Kamve Gwijana</span>
            <span>Matthew Grigajtis</span>
            <span>Satyam Khadka</span>
          </div>

          <div>
            <span>Music: </span>
            <span>The Battle of Atheria</span>
            <span>By HitCtrl released under the CC-BY 3.0 license</span>
          </div>
        </div>

        {/* Bean Counter credits section. */}
        <div>
          <div>
            <span>Bean Counter: </span>
            <span>Aleks Bologna</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default GameCredits;
