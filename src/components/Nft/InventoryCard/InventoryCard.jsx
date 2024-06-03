// Importing React and the Button component
import React from "react";
import Button from "../../Button/Button";

// Importing SCSS styles
import styles from "./styles.module.scss";

// React component for rendering an inventory card
const InventoryCard = ({ nft, buttonLoader, buttonFunc }) => {
  return (
    // Container for the inventory card
    <div key={nft.id} className={styles.inventory_block}>
      {/* Image of the NFT */}
      <img
        rel="preload"
        src={nft.image}
        alt={nft.name ? nft.name : "No Image"}
      />

      {/* Information about the NFT (name) */}
      <div className={styles.info_value}>
        <span>Name: </span>
        <span>{nft.name}</span>
      </div>

      {/* Button wrapper with the "Export into Staging" button */}
      <div className={styles.buttonWrapper}>
        <Button
          onClick={buttonFunc}
          disabled={buttonLoader && buttonLoader !== nft.id}
          loader={buttonLoader === nft?.id}
          size="auto"
          color="blue"
        >
          Export into Staging
        </Button>
      </div>
    </div>
  );
};

// Exporting the InventoryCard component
export default InventoryCard;
