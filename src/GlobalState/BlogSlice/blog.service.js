import axios from "../../axios/axios";

// Function to retrieve all blogs
function getBlogs() {
  return axios.get("/api/blog");
}

// Function to create a new blog
function createBlog(data, token) {
  return axios.post(`/api/blog`, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

// Function to update an existing blog
function updateBlog(data, token) {
  console.log(data); // Logging the data for debugging purposes
  return axios.put(`/api/blog`, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

// Function to delete a blog by ID
function deleteBlog(id, token) {
  return axios.delete(`/api/blog/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

// Function to retrieve a single blog by ID
function singleBlog(id, token) {
  return axios.get(`/api/blog/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

// Object containing all the blog-related service functions
const blogService = {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  singleBlog,
};

export default blogService;
