import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// Importing styles
import styles from "./styles.module.scss";

// Importing services and images
import PlayerService from "../../GlobalState/PlayerSlice/player.service";
import NftsService from "../../GlobalState/NftsSlice/nfts.service";
import { NFTS } from "../../assets/images/cardImages";

// Importing components
import Container from "../../components/Container/Container";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
import NoDataMessage from "../../components/NoDataMessage/NoDataMessage";

// Lazily loaded InventoryCard component
const InventoryCard = React.lazy(() =>
  import("../../components/Nft/InventoryCard/InventoryCard")
);

// Images without rarity
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

// Images based on rarity
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

const PlayerProfile = () => {
  // Redux state
  const player = useSelector((state) => state.player);
  const { token } = useSelector((state) => state.user);

  // Local state
  const [inventory, setInventory] = useState([]);
  const [loader, setLoader] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(null);
  const [visibleNfts, setVisibleNfts] = useState(10);

  // Effect to fetch and update character inventory
  useEffect(() => {
    if (player.id) {
      const getAsyncCharacterInventory = async () => {
        setLoader(true);
        const res = await PlayerService.getCharacterInventory(token);

        const filteredRes = res.data?.result
          ?.filter((item) => item)
          .map((item) => {
            return {
              ...item,
              image:
                item.rarity !== "" &&
                imagesByRarity[item.rarity] &&
                imagesByRarity[item.rarity][item.name]
                  ? imagesByRarity[item.rarity][item.name]
                  : items[item.name],
            };
          });

        setInventory(filteredRes);
        setLoader(false);
      };

      getAsyncCharacterInventory();
    }
  }, [player.id, token]);

  // Function to export an item into staging
  const exportIntoStaging = async (nft, index) => {
    if (buttonLoader) return;

    const body = {
      nft_name: nft.name,
      level: 1,
      collection_name: nft.collectionName,
      rarity: nft.rarity,
    };

    setButtonLoader(nft.id);
    try {
      await NftsService.moveFromGameToStaging(token, body);
      toast.success("Inventory successfully exported into Staging");
      let newInventory = [...inventory];
      newInventory[index].quantity = newInventory[index].quantity - 1;
      if (!newInventory[index].quantity) {
        newInventory.splice(index, 1);
      }
      setInventory(newInventory);
      setButtonLoader(null);
    } catch (_) {
      setButtonLoader(null);
    }
  };

  // Function to handle "See More" button click
  const handleSeeMore = () => {
    setVisibleNfts((prevVisibleNfts) => prevVisibleNfts + 10);
  };

  // Rendering the player profile component
  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.character_information}>
          <h2>Character Information</h2>
          <div>
            {/* Displaying character information */}
            <div>
              <div className={styles.info_value}>
                <span>Character Name: </span>
                <span>{player.characterName}</span>
              </div>
              <div className={styles.info_value}>
                <span>Level: </span>
                <span>{player.level}</span>
              </div>
              <div className={styles.info_value}>
                <span>Experience: </span>
                <span>{player.experience}</span>
              </div>
              <div className={styles.info_value}>
                <span>Character Description: </span>
                <span>{player.characterDescription}</span>
              </div>
            </div>

            <div>
              <div className={styles.info_value}>
                <span>Trilium Balance: </span>
                <span>{player.triliumBalance?.toString().slice(0, 10)}</span>
              </div>
              <div className={styles.info_value}>
                <span>Intelligence: </span>
                <span>{player.intelligence}</span>
              </div>
              <div className={styles.info_value}>
                <span>Max Hit Points: </span>
                <span>{player.maxHitPoints}</span>
              </div>
              <div className={styles.info_value}>
                <span>Max Magic Points: </span>
                <span>{player.maxMagicPoints}</span>
              </div>
              <div className={styles.info_value}>
                <span>Strength: </span>
                <span>{player.strength}</span>
              </div>
            </div>

            <div>
              <div className={styles.info_value}>
                <span>Character Hit Points Bonus: </span>
                <span>{player.characterHitPointsBonus}</span>
              </div>
              <div className={styles.info_value}>
                <span>Character Intelligence Bonus: </span>
                <span>{player.characterIntelligenceBonus}</span>
              </div>
              <div className={styles.info_value}>
                <span>Character Magic Points Bonus: </span>
                <span>{player.characterMagicPointsBonus}</span>
              </div>
              <div className={styles.info_value}>
                <span>Character Strength Bonus: </span>
                <span>{player.characterStrengthBonus}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.character_inventory}>
          <h2>Character Inventory</h2>
          {/* Displaying loader or inventory content */}
          {loader ? (
            <div className={styles.loader}>
              <Loader size={100} />
            </div>
          ) : !inventory[0] ? (
            <NoDataMessage />
          ) : (
            <div>
              {/* Mapping through the inventory and rendering InventoryCard components */}
              {inventory.slice(0, visibleNfts).map((nft, index) => (
                <React.Suspense fallback={<Loader size={50} />} key={index}>
                  <InventoryCard
                    key={index}
                    nft={nft}
                    buttonLoader={buttonLoader}
                    buttonFunc={() => exportIntoStaging(nft, index)}
                  />
                </React.Suspense>
              ))}
            </div>
          )}
          <div className={styles.see_more_wrapper}>
            {/* "See More" button */}
            {visibleNfts < inventory.length && (
              <Button onClick={handleSeeMore} size="fit" color="blue">
                See More
              </Button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PlayerProfile;
