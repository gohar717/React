// Import React and styles
import React from "react";
import styles from "./styles.module.scss";

// Enemy component definition
export default function Enemy({
  image,
  name,
  description,
  hitPoints,
  magicPoints,
  triliumAward,
  commonDrops,
  rareDrops,
}) {
  // Render the Enemy component
  return (
    <div className={styles.enemy}>
      {/* Left part of the enemy with the image */}
      <div className={styles.enemy_leftPart}>
        <img rel="preload" src={image} alt={image ? image : "No image"} />
      </div>
      {/* Right part of the enemy with textual information */}
      <div className={styles.enemy_rightPart}>
        <h4>{name}</h4>
        <p>{description}</p>
        {/* Information about Hit Points */}
        <div className={styles.info_value}>
          <span>Hit Points: </span>
          <span>{hitPoints}</span>
        </div>
        {/* Information about Magic Points */}
        <div className={styles.info_value}>
          <span>Magic Points: </span>
          <span>{magicPoints}</span>
        </div>
        {/* Information about Trilium Award */}
        <div className={styles.info_value}>
          <span>Trilium Award: </span>
          <span>{triliumAward}</span>
        </div>
        {/* Information about Common Drops */}
        <div className={styles.info_value}>
          <span>Common Drops: </span>
          <span>{commonDrops}</span>
        </div>
        {/* Information about Rare Drops */}
        <div className={styles.info_value}>
          <span>Rare Drops: </span>
          <span>{rareDrops}</span>
        </div>
      </div>
    </div>
  );
}
