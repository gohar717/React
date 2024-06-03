// Import necessary libraries and components
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getSingleBlog,
  setBlog,
} from "../../../GlobalState/BlogSlice/blogSlice";
import Loader from "../../../components/Loader/Loader";
import BlogFormModal from "../../../components/Modal/BlogFormModal/BlogFormModal";
import NoDataMessage from "../../../components/NoDataMessage/NoDataMessage";
import Container from "./../../../components/Container/Container";
import styles from "./styles.module.scss";

// Lazy-loaded component for individual blog cards
const BlogCard = React.lazy(() =>
  import("../../../components/BlogCard/BlogCard")
);

const SingleBlog = () => {
  // Redux-related state and action dispatchers
  const dispatch = useDispatch();
  const { role } = useSelector((store) => store.player);
  const { blog } = useSelector((state) => state.blogs);

  // Local state variables
  const [loader, setLoader] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [, setActiveBlog] = useState(false);

  // Get the blog ID from the URL
  const location = useLocation();
  const blogId = location.pathname.split("/blogs/")[1];

  // Close the blog creation modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Fetch the single blog when the component mounts
  useEffect(() => {
    const getBlog = async () => {
      // Show loader while fetching the blog
      setLoader(true);
      // Dispatch action to get the single blog from the Redux store
      await dispatch(getSingleBlog(blogId));
      // Hide loader after fetching the blog
      setLoader(false);
    };
    // Execute the fetch function
    getBlog();
    // Cleanup function to clear the single blog in Redux when the component unmounts
    return () => dispatch(setBlog([]));
  }, [blogId, dispatch]);

  // Render the component JSX
  return (
    <>
      <Container>
        <div className={styles.container}>
          {/* Display loader while fetching the blog, or a message if the blog does not exist */}
          {loader ? (
            <div className={styles.loader}>
              <Loader size={100} />
            </div>
          ) : !blog || !blog.id ? (
            <NoDataMessage />
          ) : (
            // Display the single blog using lazy-loaded blog card component
            <div className={styles.blog}>
              <React.Suspense fallback={<Loader size={50} />} key={blog.id}>
                <BlogCard
                  role={role}
                  blog={blog}
                  key={blog.id}
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                  activeBlog={blog}
                  setActiveBlog={setActiveBlog}
                />
              </React.Suspense>
            </div>
          )}
        </div>
        {/* Display the blog creation modal if it's open */}
        {modalOpen && (
          <BlogFormModal
            activeBlog={blog}
            setActiveBlog={setActiveBlog}
            onClose={closeModal}
          />
        )}
      </Container>
    </>
  );
};

// Export the component
export default SingleBlog;
