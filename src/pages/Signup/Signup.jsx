// Importing necessary dependencies and styles
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss"; // Importing local styles
import { signupPlayer } from "../../GlobalState/PlayerSlice/playerSlice"; // Importing Redux action

import Button from "../../components/Button/Button"; // Importing Button component
import Container from "../../components/Container/Container"; // Importing Container component
import Input from "../../components/Input/Input"; // Importing Input component

// Functional component for the Signup page
const Signup = () => {
  // Initializing state variables using the useState hook
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Function to handle form submission
  const onSubmit = async () => {
    setFieldErrors(""); // Clearing field errors
    setError(""); // Clearing general error

    // Creating an object with user input data
    const data = {
      username,
      password,
      email,
    };

    // Dispatching the signupPlayer action with user data and navigation functions
    dispatch(signupPlayer({ data, navigate, setFieldErrors, setError }));
  };

  // JSX structure for the Signup component
  return (
    <Container>
      <div className={styles.container}>
        <div>
          <h2>Sign Up</h2>
          <div className={styles.input_block}>
            {/* Input fields for user name, email, and password */}
            <Input
              label="User Name"
              type="text"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              error={fieldErrors.username}
            />
            <Input
              label="Email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={fieldErrors.email}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={fieldErrors.password}
            />
          </div>
          {/* Link to navigate to the Login page */}
          <p>
            Already have an account ? <Link to="/login">Login</Link>
          </p>
          {/* Displaying any signup error */}
          {error && <p className={styles.error}>{error}</p>}
          {/* Button to trigger the form submission */}
          <Button onClick={onSubmit} size="medium" color="blue">
            Sign Up
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Signup; // Exporting the Signup component
