import React, { useEffect, useState } from "react";
import Editor from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import {
  createBlog,
  updateBlog,
} from "../../../GlobalState/BlogSlice/blogSlice";
import closeIcon from "../../../assets/images/Icons/close_icon.png";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import styles from "./styles.module.scss";

const BlogFormModal = ({ onClose, activeBlog, setActiveBlog }) => {
  const dispatch = useDispatch();

  // State to manage blog form fields
  const [newBlog, setNewBlog] = useState({
    title: activeBlog == null ? "" : activeBlog.title,
    category: activeBlog == null ? "" : activeBlog.category,
    content: activeBlog == null ? "" : activeBlog.content,
    meta: activeBlog == null ? "" : activeBlog.meta,
    image: activeBlog == null ? null : activeBlog.image,
  });

  // State to manage form field errors
  const [fieldsError, setFieldsError] = useState({
    titleError: "",
    contentError: "",
    categoryError: "",
    metaError: "",
  });

  // Validation function to check if form fields are filled
  const validation = () => {
    const newErrors = {};
    if (newBlog.title === "") {
      newErrors.titleError = "Please complete title field";
    }
    if (newBlog.category === "") {
      newErrors.categoryError = "Please complete category field";
    }
    if (newBlog.content === "") {
      newErrors.contentError = "Please complete content field";
    }
    if (newBlog.meta === "") {
      newErrors.metaError = "Please complete meta field";
    }
    setFieldsError(newErrors);
    if (Object.keys(newErrors).length) {
      return false;
    }
    return true;
  };

  // Function to handle the creation of a new blog
  const onCreateBlog = () => {
    if (!validation()) return;
    dispatch(createBlog({ newBlog, onClose }));
  };

  // Function to handle the editing of an existing blog
  const onEditBlog = () => {
    if (!validation()) return;
    const editBlog = {
      ...newBlog,
      id: activeBlog.id,
    };
    dispatch(updateBlog({ editBlog, onClose }));
  };

  // Modal data for dynamic rendering
  const modalData = {
    title: activeBlog == null ? "Create a Blog" : "Edit a Blog",
    submit: activeBlog == null ? "Create" : "Edit",
    submitFunction: activeBlog == null ? onCreateBlog : onEditBlog,
  };

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        setNewBlog({ ...newBlog, image: base64Data });
      };
      reader.readAsDataURL(file);
    }
  };

  // Cleanup function to set activeBlog to null when component unmounts
  useEffect(() => () => setActiveBlog(null), [setActiveBlog]);

  return (
    <div className={styles.container} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>{modalData.title}</h3>
          <img
            rel="preload"
            className={styles.close}
            src={closeIcon}
            onClick={onClose}
            alt="closeImg"
          />
        </div>
        <div className={styles.modalBody}>
          {/* Input fields for the blog form */}
          <Input
            type="text"
            placeholder="Title"
            label="Title"
            value={newBlog.title}
            error={fieldsError?.titleError}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Category"
            label="Category"
            value={newBlog.category}
            error={fieldsError?.categoryError}
            onChange={(e) =>
              setNewBlog({ ...newBlog, category: e.target.value })
            }
          />
          <Input
            type="text"
            label="Meta"
            placeholder="Meta"
            value={newBlog.meta}
            error={fieldsError?.metaError}
            onChange={(e) => setNewBlog({ ...newBlog, meta: e.target.value })}
          />
          <p>{fieldsError?.contentError}</p>

          {/* Quill Editor for blog content */}
          <div className={styles.editorDiv}>
            <Editor
              style={{ height: "200px", background: "white" }}
              placeholder="Start typing here..."
              value={newBlog.content}
              onChange={(e) => setNewBlog({ ...newBlog, content: e })}
              modules={{
                toolbar: {
                  container: [
                    // Quill editor toolbar options
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ script: "sub" }, { script: "super" }],
                    [{ indent: "-1" }, { indent: "+1" }],
                    [{ direction: "rtl" }],
                    [{ size: ["small", false, "large", "huge"] }],
                    [{ color: [] }, { background: [] }],
                    [{ font: [] }],
                    [{ align: [] }],
                    ["clean"],
                    ["link"],
                  ],
                },
              }}
            />
          </div>

          {/* Input field for image upload */}
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
        <div className={styles.modalFooter}>
          {/* Buttons for closing and submitting the form */}
          <Button onClick={onClose} color="blue" size="medium">
            Close
          </Button>
          <Button
            onClick={modalData.submitFunction}
            color="white"
            size="medium"
          >
            {modalData.submit}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogFormModal;
