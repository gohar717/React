import { combineReducers } from "redux";
import blogSlice from "./BlogSlice/blogSlice";
import nftsSlice from "./NftsSlice/nftsSlice";
import playerSlice from "./PlayerSlice/playerSlice";
import user from "./UserReducer";

// Combine all the reducers into the root reducer
export const rootReducer = combineReducers({
  user,
  player: playerSlice,
  nfts: nftsSlice,
  blogs: blogSlice,
});
