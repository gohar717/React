import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { loginPlayer } from "../../GlobalState/PlayerSlice/playerSlice";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Input from "../../components/Input/Input";
import styles from "./styles.module.scss";

const Login = () => {
  // Hooks for managing state and navigation
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [usernameOrEmail, setUserNameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Function to handle form submission
  const onSubmit = async () => {
    setError("");
    setFieldErrors("");
    const data = {
      usernameOrEmail,
      password,
    };
    // Dispatch login action with user data and navigation information
    dispatch(loginPlayer({ data, navigate, setFieldErrors, setError }));
  };

  return (
    <Container>
      <div className={styles.container}>
        <div>
          <h2>Login</h2>
          <div className={styles.input_block}>
            {/* Input fields for username/email and password */}
            <Input
              label="User Name or Email"
              type="text"
              placeholder="User Name or Email"
              value={usernameOrEmail}
              onChange={(e) => setUserNameOrEmail(e.target.value)}
              error={fieldErrors.usernameOrEmail}
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
          {/* Link to sign up page */}
          <p>
            Don't have an account yet? <Link to="/signup">Sign Up</Link>
          </p>
          {/* Display error message if login fails */}
          {error && <p className={styles.error}>{error}</p>}
          {/* Button to submit the login form */}
          <Button onClick={onSubmit} size="medium" color="blue">
            Login
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Login;
