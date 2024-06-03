import React from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import styles from "./styles.module.scss";

// Importing GIFs and images for tutorial sections
import crafting from "../../assets/gifs/tutorial/crafting/crafting.gif";
import looting from "../../assets/gifs/tutorial/enemies/looting.gif";
import fighting from "../../assets/gifs/tutorial/player/fighting.gif";
import interactWithNpc from "../../assets/gifs/tutorial/player/interact.gif";
import miningCrystal from "../../assets/gifs/tutorial/player/mining_crystal.gif";
import choosingCharacter from "../../assets/gifs/tutorial/register/choosing_character.gif";
import register from "../../assets/gifs/tutorial/register/register.gif";
import dungeon1 from "../../assets/gifs/tutorial/world/dungeon1.gif";
import dungeon2 from "../../assets/gifs/tutorial/world/dungeon2.gif";
import levels from "../../assets/images/tutorial/player/levels.png";
import areas from "../../assets/images/tutorial/world/areas.png";

// Functional component for Trilium Wiki page
const TriliumWiki = () => {
  return (
    <Container>
      <div className={styles.triliumWiki}>
        {/* Welcome Section */}
        <h1 className={styles.welcomeTitle}>Welcome to Trilium Wiki</h1>
        <p className={styles.welcomeText}>
          Explore the immersive world of Trilium where adventure awaits at every
          turn. Dive into the details below to master the game and conquer the
          challenges that lie ahead.
        </p>
        <p className={styles.welcomeText}>
          You can import your nfts from <Link to="/my-nfts">My NFTS</Link> page
          to <Link to="/staging-nfts">Staging</Link> page then you can add them
          in your game inventory and export them back from{" "}
          <Link to="/player-profile">Player profile</Link> page.
        </p>

        {/* Section 1: Register */}
        <h2 className={styles.sectionTitle}>1. Register</h2>
        <p className={styles.sectionText}>
          To begin your journey, start by registering your character. Choose
          wisely as each character comes with unique characteristics, including
          Hit Points bonus, Intelligence bonus, Magic Points Bonus, and
          Strength. Refer to the character's description for more insights.
        </p>
        <div className={styles.sectionImageWrapper}>
          <img
            src={register}
            alt="Register"
            rel="preload"
            className={styles.sectionImage}
          />
          <img
            src={choosingCharacter}
            alt="Character Selection"
            rel="preload"
            className={styles.sectionImage}
          />
        </div>

        {/* Section 2: Player */}
        <h2 className={styles.sectionTitle}>2. Player</h2>
        <h3 className={styles.subSectionTitle}>2.1 Level Progression</h3>
        <p className={styles.sectionText}>
          As players embark on their journey, they can achieve up to 10 levels
          based on experience points. Higher levels grant increased health
          points, magic points, and moving speed. Strive for greatness and climb
          the ranks!
        </p>
        <div className={styles.sectionImageWrapper}>
          <img
            src={levels}
            alt="Level Progression"
            rel="preload"
            className={styles.sectionImage}
          />
        </div>
        <h3 className={styles.subSectionTitle}>
          2.2 Interactions and Activities
        </h3>
        <p className={styles.sectionText}>
          Engage with NPCs, battle enemies, and mine Trilium crystals to enhance
          your gameplay. Your choices and actions shape your character's
          destiny.
        </p>
        <div className={styles.sectionImageWrapper}>
          <img
            src={interactWithNpc}
            alt="Player Fighting"
            rel="preload"
            className={styles.sectionImage}
          />
          <img
            src={fighting}
            alt="Player Fighting"
            rel="preload"
            className={styles.sectionImage}
          />
          <img
            src={miningCrystal}
            alt="Player Mining"
            rel="preload"
            className={styles.sectionImage}
          />
        </div>

        {/* Section 3: Enemies */}
        <h2 className={styles.sectionTitle}>3. Enemies</h2>
        <h3 className={styles.subSectionTitle}>3.1 Enemy Variety</h3>
        <p className={styles.sectionText}>
          Encounter a multitude of enemies, each with distinct characteristics.
          Refer to the <Link to="/bestiary">Bestiary</Link> page for detailed
          information on the foes you may encounter.
        </p>
        <h3 className={styles.subSectionTitle}>3.2 Rewards from Enemies</h3>
        <p className={styles.sectionText}>
          Defeating enemies yields random items. Utilize these items in the
          crafting system to enhance your character's abilities and arsenal.
        </p>
        <div className={styles.sectionImageWrapper}>
          <img
            src={looting}
            alt="Enemy Rewards"
            rel="preload"
            className={styles.sectionImage}
          />
        </div>

        {/* Section 4: Game World */}
        <h2 className={styles.sectionTitle}>4. Game World</h2>
        <h3 className={styles.subSectionTitle}>4.1 Magor Rocky Desert</h3>
        <p className={styles.sectionText}>
          Explore the vast Magor Rocky Desert, featuring nine distinct areas,
          including the lush Wandering Dunes - a green oasis in the desert.
        </p>
        <div className={styles.sectionImageWrapper}>
          <img
            src={areas}
            alt="Magor Rocky Desert"
            rel="preload"
            className={styles.sectionImage}
          />
        </div>
        <h3 className={styles.subSectionTitle}>4.2 Caves</h3>
        <p className={styles.sectionText}>
          Venture into the dark caves, confront enemies, and face formidable
          bosses. Defeating a boss rewards you with valuable items and a chance
          to mine the coveted Trilium Crystal.
        </p>
        <div className={styles.sectionImageWrapper}>
          <img
            src={dungeon1}
            alt="Dungeon 1"
            rel="preload"
            className={styles.sectionImage}
          />
          <img
            src={dungeon2}
            alt="Dungeon 2"
            rel="preload"
            className={styles.sectionImage}
          />
        </div>

        {/* Section 5: Crafting System */}
        <h2 className={styles.sectionTitle}>5. Crafting System</h2>
        <p className={styles.sectionText}>
          Enhance your equipment by crafting items such as mining tools (shovel)
          and weapons (sword, dagger). Items come in six rarities - abundant,
          common, rare, epic, legendary, and mythical.
        </p>
        <div className={styles.sectionImageWrapper}>
          <img
            src={crafting}
            alt="Crafting System"
            rel="preload"
            className={styles.sectionImage}
          />
        </div>
      </div>
    </Container>
  );
};

export default TriliumWiki;
