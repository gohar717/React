import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { setPlayerIsLogged, setToken } from "../UserReducer";
import PlayerService from "./player.service";

// Initial state for the player slice
const initialState = {};

// Thunk for signing up a player
export const signupPlayer = createAsyncThunk(
  "player/signupPlayer",
  async ({ data, navigate, setFieldErrors, setError }) => {
    try {
      await PlayerService.signupPlayer(data);
      toast.success(
        "Congratulations! Your account has been successfully created"
      );
      navigate("/login");
    } catch (err) {
      // Handle errors during signup
      if (
        Object.values(err.response?.data?.result?.data?.errors || {}).length
      ) {
        setFieldErrors(err.response?.data?.result?.data.errors);
      } else if (err.response?.data?.result?.message) {
        setError(err.response?.data?.result?.message);
      } else {
        toast.error(err.message + "... Please try again");
        console.log(err.message);
      }
    }
  }
);

// Thunk for logging in a player
export const loginPlayer = createAsyncThunk(
  "player/loginPlayer",
  async ({ data, navigate, setFieldErrors, setError }, { dispatch }) => {
    try {
      const res = await PlayerService.loginPlayer(data);
      dispatch(setToken(res.data?.result));
      await dispatch(getAuthorizedPlayer());
      navigate("/");
    } catch (err) {
      // Handle errors during login
      if (
        Object.values(err.response?.data?.result?.data?.errors || {}).length
      ) {
        setFieldErrors(err.response?.data?.result?.data?.errors);
      } else if (err.response?.data?.result?.message) {
        setError(err.response?.data?.result?.message);
      } else {
        toast.error(err.message + "... Please try again");
        console.log(err.message);
      }
    }
  }
);

// Thunk for getting authorized player data
export const getAuthorizedPlayer = createAsyncThunk(
  "player/getAuthorizedPlayer",
  async (_, { dispatch, getState }) => {
    try {
      const state = getState();
      const res = await PlayerService.getAuthorizedPlayer(state.user.token);
      dispatch(setPlayerData(res.data.result));
      dispatch(setPlayerIsLogged(true));
    } catch (err) {
      // Handle errors when getting authorized player data
      dispatch(logoutPlayer());
      dispatch(setPlayerIsLogged(false));
      dispatch(setToken());
      console.log(err.message);
    }
  }
);

// Slice for the player state
const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    // Reducer for setting player data
    setPlayerData: (state, action) => action.payload,
    // Reducer for logging out a player
    logoutPlayer: () => initialState,
  },
});

// Exporting the actions
export const { setPlayerData, logoutPlayer } = playerSlice.actions;

// Exporting the reducer
export default playerSlice.reducer;
