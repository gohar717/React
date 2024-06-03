// Import necessary libraries and components
import parse from "html-react-parser";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteBlog } from "../../GlobalState/BlogSlice/blogSlice";
import Button from "../Button/Button";
import BlogFormModal from "../Modal/BlogFormModal/BlogFormModal";
import styles from "./styles.module.scss";

// BlogCard component definition
const BlogCard = ({
  index,
  blog,
  role,
  modalOpen,
  setModalOpen,
  activeBlog,
  setActiveBlog,
}) => {
  // Initialize dispatch and navigate functions
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle blog deletion
  function onDelete(id) {
    dispatch(deleteBlog(id));
    navigate("/blogs");
  }

  // Function to handle blog editing
  function onEdit(blog) {
    setModalOpen(true);
    setActiveBlog(blog);
  }

  // Function to navigate to a single blog page
  function onSignleBlog(id) {
    navigate(`/blogs/${id}`);
  }

  // Render the BlogCard component
  return (
    <>
      <div className={styles.blog} key={index}>
        {/* Display blog title and make it clickable to navigate to the single blog page */}
        <h3 onClick={() => onSignleBlog(blog.id)}>{blog.title}</h3>
        {/* Display blog category */}
        <p>{blog.category}</p>
        {/* Parse and display blog content as HTML */}
        <div>{parse(blog.content)}</div>
        {/* Display blog image */}
        <img
          rel="preload"
          crossOrigin="anonymous"
          src={`https://triliumquest.s3.amazonaws.com/${blog.image}`}
          alt={blog.image ? blog.title + "'s image" : "no image"}
        />
        {/* Display delete and edit buttons for admin users */}
        {role === "admin" && (
          <div className={styles.btnWrapper}>
            <Button
              onClick={() => onDelete(blog.id)}
              size="medium"
              color="blue"
            >
              Delete
            </Button>
            <Button onClick={() => onEdit(blog)} size="medium" color="white">
              Edit
            </Button>
          </div>
        )}
        {/* Display the creation timestamp of the blog */}
        <p>Created at {new Date(blog.createdAt).toLocaleString()}</p>
      </div>
      {/* Render the BlogFormModal component if modalOpen is true */}
      {modalOpen && (
        <BlogFormModal activeBlog={activeBlog} setActiveBlog={setActiveBlog} />
      )}
    </>
  );
};

// Export the BlogCard component as the default export
export default BlogCard;
