import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user slice
const initialState = {
  name: "",
  balance: 0,
  waxConnected: false,
  anchorConnected: false,
  playerIsLogged: false,
  isLogged: false,
  token: null,
};

// Create a Redux slice for the user
const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set Wax data in the state
    setWaxData: (state, action) => {
      state.name = action.payload.name;
      state.isLogged = action.payload.isLogged;
      state.balance = action.payload.balance;
    },
    // Set Wax balance in the state
    setWaxBalance: (state, action) => {
      state.balance = action.payload;
    },
    // Set Wax connected flag to true
    setWaxConnected: (state) => {
      state.waxConnected = true;
    },
    // Set Anchor connected flag to true
    setAnchorConnected: (state) => {
      state.anchorConnected = true;
    },
    // Set playerIsLogged in the state
    setPlayerIsLogged: (state, action) => {
      state.playerIsLogged = action.payload;
    },
    // Set the user token in the state
    setToken: (state, action) => {
      state.token = action.payload || null;
    },
    // Clear Wax-related data on logout
    setWaxLogout: (state) => {
      state.name = "";
      state.isLogged = false;
      state.balance = 0;
      state.waxConnected = false;
      state.anchorConnected = false;
    },
  },
});

// Export action creators and reducer from the user slice
export const {
  setWaxData,
  setWaxLogout,
  setWaxBalance,
  setWaxConnected,
  setAnchorConnected,
  setPlayerIsLogged,
  setToken,
} = user.actions;
export default user.reducer;
