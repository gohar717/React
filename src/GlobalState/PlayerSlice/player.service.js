import axios from "../../axios/axios";

// Function to sign up a player
function signupPlayer(body) {
  return axios.post("/api/signup", body);
}

// Function to log in a player
function loginPlayer(body) {
  return axios.post("/api/login", body);
}

// Function to get information about an authorized player
function getAuthorizedPlayer(token) {
  return axios.get("/api/me", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

// Function to get the character inventory of an authorized player
function getCharacterInventory(token) {
  return axios.get("/api/fetchCharacterInventory", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

// Exporting the PlayerService functions
const PlayerService = {
  signupPlayer,
  loginPlayer,
  getAuthorizedPlayer,
  getCharacterInventory,
};

export default PlayerService;
