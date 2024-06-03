import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import blogService from "./blog.service";

// Initial state for the blogs slice
const initialState = {
  blogs: [],
  blog: {},
};

// Async thunk to fetch all blogs
export const getBlogs = createAsyncThunk(
  "blog/getBlogs",
  async (_, { dispatch }) => {
    try {
      const res = await blogService.getBlogs();
      dispatch(setBlogs(res.data.data));
    } catch (error) {
      console.log(error);
    }
  }
);

// Async thunk to create a new blog
export const createBlog = createAsyncThunk(
  "blog/createBlog",
  async ({ newBlog, onClose }, { dispatch, getState }) => {
    console.log(newBlog);
    const state = getState();
    try {
      await blogService.createBlog(newBlog, state.user.token);
      dispatch(getBlogs());
      toast.success("Blog created successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to create the blog");
      console.log(error);
    }
  }
);

// Async thunk to update an existing blog
export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async ({ editBlog, onClose }, { dispatch, getState }) => {
    console.log(editBlog);
    const state = getState();
    try {
      await blogService.updateBlog(editBlog, state.user.token);
      dispatch(getBlogs());
      dispatch(getSingleBlog(editBlog.id, state.user.token));
      toast.success("Blog edited successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to edit the blog");
      console.log(error);
    }
  }
);

// Async thunk to delete a blog by ID
export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (id, { dispatch, getState }) => {
    const state = getState();
    try {
      await blogService.deleteBlog(id, state.user.token);
      dispatch(getBlogs());
      toast.success("Blog deleted successfully");
    } catch (error) {
      toast.error("Failed to delete the blog");
      console.log(error);
    }
  }
);

// Async thunk to fetch a single blog by ID
export const getSingleBlog = createAsyncThunk(
  "blog/singleBlog",
  async (id, { dispatch, getState }) => {
    const state = getState();
    try {
      const res = await blogService.singleBlog(id, state.user.token);
      dispatch(setBlog(res.data.data));
    } catch (error) {
      console.log(error);
    }
  }
);

// Creating the blogs slice
const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    // Reducer to set the list of blogs
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    // Reducer to set a single blog
    setBlog: (state, action) => {
      state.blog = action.payload;
    },
  },
});

// Exporting the actions
export const { setBlogs, setBlog } = blogsSlice.actions;

// Exporting the reducer
export default blogsSlice.reducer;
