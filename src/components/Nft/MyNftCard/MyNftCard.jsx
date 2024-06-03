import { useState } from "react";
import Button from "../../Button/Button";
import ViewNftDetailsModal from "../../Modal/ViewNftDetailsModal/ViewNftDetailsModal";
import styles from "./styles.module.scss";

const Nft = ({ nft, importNft, buttonLoader }) => {
  // State to manage the visibility of the description modal
  const [modalOpen, setModalOpen] = useState(false);

  // Function to open the description modal
  const openDescriptionModal = () => {
    setModalOpen(true);
  };

  // Function to close the description modal
  const closeDescriptionModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        {/* Displaying the NFT image */}
        <img
          rel="preload"
          src={`https://ipfs.io/ipfs/${nft.data.img}`}
          alt={nft.data.name ? nft.data.name : "No Image"}
          crossOrigin="anonymous"
        />
        <div>
          {/* Displaying the NFT name */}
          <h2 className={styles.nft_name}>{nft.data.name}</h2>

          {/* Clickable element to open the description modal */}
          <span className={styles.description} onClick={openDescriptionModal}>
            Description
          </span>

          {/* Button to import the NFT into staging */}
          <Button
            onClick={() => importNft(nft)}
            loader={buttonLoader}
            size="auto"
            color="blue"
          >
            Import into Staging
          </Button>
        </div>
      </div>

      {/* Rendering the description modal when modalOpen is true */}
      {modalOpen && (
        <ViewNftDetailsModal
          onClose={closeDescriptionModal}
          description={nft.data.description || nft.data.desc}
        />
      )}
    </>
  );
};

export default Nft;
