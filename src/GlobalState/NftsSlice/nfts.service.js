import { User } from "../../UserService";
import axios from "../../axios/axios";

// Function to get NFTs based on the provided wax account
async function getNfts(waxAccount) {
  let collectionNames = [];
  let baseUrl = "";

  // Checking whether the application is in the testnet or the mainnet
  if (User.testnet) {
    collectionNames = ["triliumquest", "testo.worlds"];
    baseUrl = "https://test.wax.api.atomicassets.io/atomicassets/v1/assets/";
  } else {
    collectionNames = ["triliumquest", "alien.worlds"];
    baseUrl = "https://wax.api.atomicassets.io/atomicassets/v1/assets/";
  }

  // Generating requests for each collection
  const requests = collectionNames.map((collection) => {
    const collectionsQuery = `collection_name=${collection}`;
    const url = `${baseUrl}?owner=${waxAccount}&${collectionsQuery}&sort=rdata`;
    return axios.get(url);
  });

  try {
    // Fetching data from multiple collections concurrently
    const responses = await Promise.all(requests);

    // Combining data from different collections
    const combinedData = responses.map((response, index) => ({
      collection: collectionNames[index],
      data: response.data,
    }));

    return combinedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Function to get staging NFTs
function getStagingNfts(token) {
  return axios.get("/api/listStagingTableNft", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

// Function to move NFTs from the game to the staging area
function moveFromGameToStaging(token, body) {
  return axios.post("/api/moveFromGameToStaging", body, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

// Function to move NFTs from the staging area to the game
function moveFromStagingToGame(token, body) {
  return axios.post("/api/moveFromStagingToGame", body, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

// Function to move NFTs from the staging area to the wallet
function moveFromStagingToWallet(token, body) {
  return axios.post("/api/moveFromStagingToWallet", body, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

// Exporting the NftsService functions
const NftsService = {
  getNfts,
  getStagingNfts,
  moveFromGameToStaging,
  moveFromStagingToGame,
  moveFromStagingToWallet,
};

export default NftsService;
