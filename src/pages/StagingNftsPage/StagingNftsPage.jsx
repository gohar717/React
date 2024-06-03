import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import styles from "./styles.module.scss";

import NftsService from "../../GlobalState/NftsSlice/nfts.service";
import {
  getStagingNfts,
  setStagingNfts,
} from "../../GlobalState/NftsSlice/nftsSlice";
import { User } from "../../UserService";
import { NFTS } from "../../assets/images/cardImages";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Loader from "../../components/Loader/Loader";
import NoDataMessage from "../../components/NoDataMessage/NoDataMessage";

// Lazy-loaded component for staging NFT card
const StagingNftCard = React.lazy(() =>
  import("../../components/Nft/StagingNftCard/StagingNftCard")
);

// NFT items and their images organized by rarity
const items = {
  //Items without rarity
  //Items
  "Cloth": NFTS["Cloth"],
  "Leather": NFTS["Leather"],
  "Copper Ingot": NFTS["Copper Ingot"],
  "Iron Ingot": NFTS["Iron Ingot"],
  "Gold Ingot": NFTS["Gold Ingot"],
  "Silver Ingot": NFTS["Silver Ingot"],
  "Copper Ore": NFTS["Copper Ore"],
  "Iron Ore": NFTS["Iron Ore"],
  "Gold Ore": NFTS["Gold Ore"],
  "Silver Ore": NFTS["Silver Ore"],
  "Copper Nugget": NFTS["Copper Nugget"],
  "Iron Nugget": NFTS["Iron Nugget"],
  "Gold Nugget": NFTS["Gold Nugget"],
  "Silver Nugget": NFTS["Silver Nugget"],
  "Bread": NFTS["Bread"],
  "Health Potion": NFTS["Health Potion"],
  "Magic Potion": NFTS["Magic Potion"],
  //Enemies
  "Vuldrax": NFTS["Vuldrax"],
  "Xyloarachs": NFTS["Xyloarachs"],
};

const imagesByRarity = {
  "Abundant": {
    "Standard Helmet": NFTS["Abundant Standard Helmet"],
    "Standard Armor": NFTS["Abundant Standard Armor"],
    "Standard Dagger": NFTS["Abundant Standard Dagger"],
    "Standard Shovel": NFTS["Abundant Standard Shovel"],
    "Standard Sword": NFTS["Abundant Standard Sword"],
    "Desert Ant": NFTS["Abundant Desert Ant"],
    "Desert Scrune": NFTS["Abundant Desert Scrune"],
  },
  "Common": {
    "Standard Helmet": NFTS["Common Standard Helmet"],
    "Standard Armor": NFTS["Common Standard Armor"],
    "Standard Dagger": NFTS["Common Standard Dagger"],
    "Standard Shovel": NFTS["Common Standard Shovel"],
    "Standard Sword": NFTS["Common Standard Sword"],
    "Desert Ant": NFTS["Common Desert Ant"],
    "Desert Scrune": NFTS["Common Desert Scrune"],
  },
  "Rare": {
    "Standard Helmet": NFTS["Rare Standard Helmet"],
    "Standard Armor": NFTS["Rare Standard Armor"],
    "Standard Dagger": NFTS["Rare Standard Dagger"],
    "Standard Shovel": NFTS["Rare Standard Shovel"],
    "Standard Sword": NFTS["Rare Standard Sword"],
  },
  "Epic": {
    "Standard Helmet": NFTS["Epic Standard Helmet"],
    "Standard Armor": NFTS["Epic Standard Armor"],
    "Standard Dagger": NFTS["Epic Standard Dagger"],
    "Standard Shovel": NFTS["Epic Standard Shovel"],
    "Standard Sword": NFTS["Epic Standard Sword"],
  },
  "Legendary": {
    "Standard Helmet": NFTS["Legendary Standard Helmet"],
    "Standard Armor": NFTS["Legendary Standard Armor"],
    "Standard Dagger": NFTS["Legendary Standard Dagger"],
    "Standard Shovel": NFTS["Legendary Standard Shovel"],
    "Standard Sword": NFTS["Legendary Standard Sword"],
  },
  "Mythical": {
    "Standard Helmet": NFTS["Mythical Standard Helmet"],
    "Standard Armor": NFTS["Mythical Standard Armor"],
    "Standard Dagger": NFTS["Mythical Standard Dagger"],
    "Standard Shovel": NFTS["Mythical Standard Shovel"],
    "Standard Sword": NFTS["Mythical Standard Sword"],
  },
};

const StagingNftsPage = () => {
  // Redux hooks for managing state
  const dispatch = useDispatch();
  const { stagingNfts } = useSelector((state) => state.nfts);
  const { username, email } = useSelector((state) => state.player);

  // Destructuring values from the 'user' slice of the Redux store
  const { token, name, waxConnected, anchorConnected } = useSelector(
    (state) => state.user
  );

  // Local state variables using the 'useState' hook
  const [loader, setLoader] = useState(false);
  const [buttonLoaderIntoWallet, setButtonLoaderIntoWallet] = useState(null);
  const [buttonLoaderIntoGame, setButtonLoaderIntoGame] = useState(null);
  const [visibleNfts, setVisibleNfts] = useState(10);

  // Effect hook to fetch staging NFTs when the component mounts
  useEffect(() => {
    // Set loader to true before fetching data
    setLoader(true);
    dispatch(getStagingNfts());
    // Set loader to false after fetching data
    setLoader(false);

    // Cleanup function to clear staging NFTs when the component unmounts
    return () => dispatch(setStagingNfts([]));
  }, [dispatch]);

  // Memoized array of staging NFTs with associated images
  const stagingNftsWithImages = useMemo(() => {
    return stagingNfts.map((item) => {
      const rarityImages = imagesByRarity[item.rarity];
      const image =
        rarityImages && rarityImages[item.nft_name]
          ? rarityImages[item.nft_name]
          : items[item.nft_name];

      // Add 'image' property to each item in the stagingNfts array
      return {
        ...item,
        image: image,
      };
    });
  }, [stagingNfts]);

  // Function to import NFT into the game
  const importIntoGame = async (nft) => {
    if (buttonLoaderIntoGame) return;

    // Construct the body of the request
    const body = {
      nft_name: nft.nft_name,
      id: nft.id,
      collection_name: nft.collection,
      rarity: nft.rarity,
    };

    // Set the import button to the loading state
    setButtonLoaderIntoGame(nft.id);
    try {
      // Call the NftsService to move the NFT from staging to the game
      await NftsService.moveFromStagingToGame(token, body);
      // Fetch the updated list of staging NFTs
      dispatch(getStagingNfts());
      // Display a success message
      toast.success("NFT successfully imported back into Game");
      // Reset the import button to the normal state
      setButtonLoaderIntoGame(null);
    } catch (_) {
      // Reset the import button to the normal state in case of an error
      setButtonLoaderIntoGame(null);
    }
  };

  // Function to export NFT into the wallet as Alien Worlds NFT
  const exportIntoWalletAsAW = (nft) => {
    // Check if the user is logged in
    if (!username && !email) {
      // Display a warning if not logged in
      toast.warning(
        "To import/export an NFT please login into your gaming account"
      );
      return;
    }
    // Check the connected wallet type and call the appropriate export function
    if (anchorConnected) {
      exportIntoWalletAsAWWithAnchor(nft);
    } else if (waxConnected) {
      exportIntoWalletAsAWWithWaxCloud(nft);
    }
  };

  // Function to export NFT into the wallet as Trilium Quest NFT
  const exportIntoWalletAsTQ = async (nft) => {
    // Check if the export button is already in the loading state
    if (buttonLoaderIntoWallet) return;

    // Construct the body of the request
    const body = {
      wax_id: name,
      nft_name: nft.nft_name,
      id: nft.id,
      rarity: nft.rarity,
    };

    // Set the export button to the loading state
    setButtonLoaderIntoWallet(nft.id);
    try {
      // Call the NftsService to move the NFT from staging to the wallet
      await NftsService.moveFromStagingToWallet(token, body);
      // Fetch the updated list of staging NFTs
      dispatch(getStagingNfts());
      // Display a success message
      toast.success("NFT successfully exported as a Trilium Quest NFT");
      // Reset the export button to the normal state
      setButtonLoaderIntoWallet(null);
    } catch (err) {
      // Log the error and reset the export button to the normal state
      console.log(err);
      setButtonLoaderIntoWallet(null);
    }
  };

  // Function to export NFT into the wallet as Alien Worlds NFT with Anchor wallet
  const exportIntoWalletAsAWWithAnchor = (nft) => {
    // Check if the export button is already in the loading state
    if (buttonLoaderIntoWallet) return;

    // Set the export button to the loading state
    setButtonLoaderIntoWallet(nft.id);
    // Call the Anchor wallet API to transfer the NFT
    User.anchorSession
      ?.transact(
        {
          actions: [
            {
              account: "triliumquest",
              name: "transfernft",
              authorization: [
                {
                  actor: User.anchorSession?.auth?.actor.toString(),
                  permission: "active",
                },
              ],
              data: {
                staging_id: nft.id,
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      )
      .then((_) => {
        // Display a success message
        toast.success("NFT successfully exported as an Alien Worlds NFT.");
        // Reset the export button to the normal state
        setButtonLoaderIntoWallet(null);
        // Fetch the updated list of staging NFTs
        dispatch(getStagingNfts());
      })
      .catch((_) => {
        // Reset the export button to the normal state in case of an error
        setButtonLoaderIntoWallet(null);
        // Fetch the updated list of staging NFTs
        dispatch(getStagingNfts());
      });
  };

  // Function to export NFT into the wallet as Alien Worlds NFT with Wax Cloud wallet
  const exportIntoWalletAsAWWithWaxCloud = (nft) => {
    // Check if the export button is already in the loading state
    if (buttonLoaderIntoWallet) return;

    // Set the export button to the loading state
    setButtonLoaderIntoWallet(nft.asset_id);
    // Call the Wax Cloud wallet API to transfer the NFT
    User.wax.api
      .transact(
        {
          actions: [
            {
              account: "triliumquest",
              name: "transfernft",
              authorization: [
                {
                  actor: User.wax?.userAccount,
                  permission: "active",
                },
              ],
              data: {
                staging_id: nft.id,
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      )
      .then((_) => {
        // Display a success message
        toast.success("NFT successfully exported as an Alien Worlds NFT.");
        // Reset the export button to the normal state
        setButtonLoaderIntoWallet(null);
        // Fetch the updated list of staging NFTs
        dispatch(getStagingNfts());
      })
      .catch((_) => {
        // Reset the export button to the normal state in case of an error
        setButtonLoaderIntoWallet(null);
        // Fetch the updated list of staging NFTs
        dispatch(getStagingNfts());
      });
  };

  // Function to handle the "See More" button click
  const handleSeeMore = () => {
    // Increase the number of visible NFTs by 10
    setVisibleNfts((prevVisibleNfts) => prevVisibleNfts + 10);
  };
  return (
    <Container>
      <div className={styles.container}>
        <h2>Staging Nfts</h2>
        <p>
          Below are the NFTs existing on Smart Contract. You can export them
          into Wallet or import back into the game.
        </p>
        <p>
          {!stagingNfts || loader
            ? "You don't have"
            : `You have ${stagingNfts.length}`}{" "}
          {stagingNfts.length > 1 ? "staging nfts" : "staging nft"}
        </p>
        {loader ? (
          <div className={styles.loader}>
            <Loader size={100} />
          </div>
        ) : !stagingNftsWithImages[0] ? (
          <NoDataMessage />
        ) : (
          <div className={styles.nfts_block}>
            {stagingNftsWithImages.slice(0, visibleNfts).map((nft, index) => (
              <React.Suspense fallback={<Loader size={100} />} key={index}>
                <StagingNftCard
                  key={index}
                  nft={nft}
                  exportIntoWalletAsTQ={exportIntoWalletAsTQ}
                  exportIntoWalletAsAW={exportIntoWalletAsAW}
                  importIntoGame={importIntoGame}
                  buttonLoaderIntoGame={buttonLoaderIntoGame}
                  buttonLoaderIntoWallet={buttonLoaderIntoWallet}
                />
              </React.Suspense>
            ))}
          </div>
        )}
        <div className={styles.see_more_wrapper}>
          {visibleNfts < stagingNftsWithImages.length && (
            <Button onClick={handleSeeMore} size="fit" color="blue">
              See More
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default StagingNftsPage;
