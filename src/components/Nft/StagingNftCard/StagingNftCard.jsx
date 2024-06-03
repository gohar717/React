import React from "react";
import Button from "../../Button/Button";
import styles from "./styles.module.scss";

const StagingNftCard = ({
  nft,
  exportIntoWalletAsTQ,
  exportIntoWalletAsAW,
  importIntoGame,
  buttonLoaderIntoWallet,
  buttonLoaderIntoGame,
}) => {
  return (
    <div key={nft.id} className={styles.nft_block}>
      {/* Display the NFT image */}
      <img
        rel="preload"
        src={nft.image}
        alt={nft.nft_name ? nft.nft_name : "No Image"}
      />
      {/* Display NFT information */}
      <div className={styles.info_value}>
        <span>Name: </span>
        <span>{nft.nft_name}</span>
      </div>
      <div className={styles.info_value}>
        <span>Level: </span>
        <span>{nft.level}</span>
      </div>
      {/* Horizontal line for separation */}
      <div className={styles.line}></div>
      {/* Display buttons for different actions */}
      <div className={styles.buttons}>
        <Button
          onClick={() => exportIntoWalletAsTQ(nft)}
          disabled={
            (buttonLoaderIntoWallet && buttonLoaderIntoWallet !== nft.id) ||
            (buttonLoaderIntoGame && buttonLoaderIntoGame === nft.id) ||
            nft.collection === "testo.worlds" ||
            nft.collection === "alien.worlds" ||
            nft.collection === "testp.worlds"
          }
          loader={buttonLoaderIntoWallet === nft.id}
          size="auto"
          color="blue"
        >
          Export as Trilium Quest
        </Button>
        <Button
          onClick={() => exportIntoWalletAsAW(nft)}
          disabled={
            (buttonLoaderIntoWallet && buttonLoaderIntoWallet !== nft.id) ||
            (buttonLoaderIntoGame && buttonLoaderIntoGame === nft.id) ||
            nft.collection === "triliumquest"
          }
          loader={buttonLoaderIntoWallet === nft.id}
          size="auto"
          color="blue"
        >
          Export as Alien Worlds
        </Button>
        <Button
          onClick={() => importIntoGame(nft)}
          disabled={
            (buttonLoaderIntoGame && buttonLoaderIntoGame !== nft.id) ||
            (buttonLoaderIntoWallet && buttonLoaderIntoWallet === nft.id)
          }
          loader={buttonLoaderIntoGame === nft.id}
          size="auto"
          color="blue"
        >
          Add to Game Inventory
        </Button>
      </div>
    </div>
  );
};

export default StagingNftCard;
