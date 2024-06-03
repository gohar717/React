import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import NftsService from "./nfts.service";

// Initial state for the nfts slice
const initialState = {
  myNfts: [],
  stagingNfts: [],
};

// Async thunk to fetch user's NFTs
export const getMyNfts = createAsyncThunk(
  "nfts/getMyNfts",
  async (_, { dispatch, getState }) => {
    try {
      const state = getState();
      // Fetching NFTs data from the service
      const combinedData = await NftsService.getNfts(state.user.name);
      // Extracting NFTs data from different collections into a single array
      const allNftsData = combinedData.reduce(
        (accumulator, currentCollection) => {
          return accumulator.concat(currentCollection.data.data);
        },
        []
      );
      dispatch(setMyNfts(allNftsData));
    } catch (err) {
      console.error(err);
    }
  }
);

// Async thunk to fetch staging NFTs
export const getStagingNfts = createAsyncThunk(
  "nfts/getStagingNfts",
  async (_, { dispatch, getState }) => {
    try {
      const state = getState();
      // Fetching staging NFTs data from the service
      const res = await NftsService.getStagingNfts(state.user.token);
      dispatch(setStagingNfts(res.data.result?.rows));
    } catch (err) {
      console.log(err);
    }
  }
);

// Creating the nfts slice
const nftsSlice = createSlice({
  name: "nfts",
  initialState,
  reducers: {
    // Reducer to set user's NFTs
    setMyNfts: (state, action) => {
      state.myNfts = action.payload;
    },
    // Reducer to set staging NFTs
    setStagingNfts: (state, action) => {
      state.stagingNfts = action.payload;
    },
    // Reducer to clear user's NFTs
    clearMyNfts: (state) => {
      state.myNfts = [];
    },
  },
});

// Exporting the actions
export const { setMyNfts, setStagingNfts, clearMyNfts } = nftsSlice.actions;

// Exporting the reducer
export default nftsSlice.reducer;
