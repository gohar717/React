// Import necessary libraries and components
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, setBlogs } from "../../GlobalState/BlogSlice/blogSlice";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Loader from "../../components/Loader/Loader";
import BlogFormModal from "../../components/Modal/BlogFormModal/BlogFormModal";
import NoDataMessage from "../../components/NoDataMessage/NoDataMessage";
import styles from "./styles.module.scss";

// Lazy-loaded component for individual blog cards
const BlogCard = React.lazy(() => import("../../components/BlogCard/BlogCard"));

const Blogs = () => {
  // Redux-related state and action dispatchers
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blogs);
  const { role } = useSelector((store) => store.player);

  // Local state variables
  const [modalOpen, setModalOpen] = useState(false);
  const [activeBlog, setActiveBlog] = useState(null);
  const [loader, setLoader] = useState(false);
  const [visibleBlogs, setVisibleBlogs] = useState(5);

  // Fetch blogs when the component mounts
  useEffect(() => {
    const getAllBlogs = async () => {
      // Show loader while fetching blogs
      setLoader(true);
      // Dispatch action to get blogs from the Redux store
      await dispatch(getBlogs());
      // Hide loader after fetching blogs
      setLoader(false);
    };
    // Execute the fetch function
    getAllBlogs();
    // Cleanup function to clear blogs in Redux when the component unmounts
    return () => dispatch(setBlogs([]));
  }, [dispatch]);

  // Open the blog creation modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Close the blog creation modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Load more blogs when the "See More" button is clicked
  const handleSeeMore = () => {
    setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 5);
  };

  // Render the component JSX
  return (
    <>
      <Container>
        <div className={styles.container}>
          {/* Display the title */}
          <h2>Blogs</h2>
          {/* Display the "Create new blog" button for admins */}
          {role === "admin" && (
            <div className={styles.btnWrapper}>
              <Button onClick={openModal} size="fit" color="blue">
                Create new blog
              </Button>
            </div>
          )}
          {/* Display loader while fetching blogs, or a message if no blogs exist */}
          {loader ? (
            <div className={styles.loader}>
              <Loader size={100} />
            </div>
          ) : !blogs[0] ? (
            <NoDataMessage />
          ) : (
            // Display the list of blogs and lazy-load individual blog cards
            <div className={styles.blogs}>
              {blogs &&
                blogs.slice(0, visibleBlogs).map((blog, index) => (
                  <React.Suspense fallback={<Loader size={50} />} key={index}>
                    <BlogCard
                      role={role}
                      index={index}
                      key={index}
                      blog={blog}
                      modalOpen={modalOpen}
                      setModalOpen={setModalOpen}
                      activeBlog={activeBlog}
                      setActiveBlog={setActiveBlog}
                    />
                  </React.Suspense>
                ))}
            </div>
          )}
          {/* Display "See More" button if there are more blogs to show */}
          <div className={styles.see_more_wrapper}>
            {visibleBlogs < blogs.length && (
              <Button onClick={handleSeeMore} size="fit" color="blue">
                See More
              </Button>
            )}
          </div>
        </div>
      </Container>
      {/* Display the blog creation modal if it's open */}
      {modalOpen && (
        <BlogFormModal
          activeBlog={activeBlog}
          setActiveBlog={setActiveBlog}
          onClose={closeModal}
        />
      )}
    </>
  );
};

// Export the component
export default Blogs;
