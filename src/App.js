// Importing necessary dependencies from React and Redux
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importing styles for the entire application
import "./App.scss";

// Importing Redux actions and services
import { getAuthorizedPlayer } from "./GlobalState/PlayerSlice/playerSlice";
import { User } from "./UserService";

// Importing the main router component
import MyRouters from "./router/MyRouters";

// Main App component
function App() {
  // Accessing the Redux dispatch function
  const dispatch = useDispatch();

  // Extracting user information from the Redux store
  const { token } = useSelector((state) => state.user);

  // useEffect hook to run side effects
  useEffect(() => {
    // Initializing the User service
    User.init();

    // Checking if a user is authenticated (has a token)
    if (token) {
      // Dispatching an action to get the authorized player details
      dispatch(getAuthorizedPlayer());
    }
  }, [dispatch, token]); // Dependencies array to control the effect's execution

  // Rendering the main structure of the application
  return (
    <div className="App">
      {/* ToastContainer for displaying notifications */}
      <ToastContainer />

      {/* Rendering the main router component */}
      <MyRouters />
    </div>
  );
}

// Exporting the App component as the default export
export default App;
