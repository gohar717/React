// Import necessary dependencies
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import component styles
import styles from "./styles.module.scss";

// Import actions from Redux slices
import { logoutPlayer } from "../../../GlobalState/PlayerSlice/playerSlice";
import { setPlayerIsLogged, setToken } from "../../../GlobalState/UserReducer";

// Functional component for the UserDropdownMenu
const UserDropdownMenu = ({ closeMenu }) => {
  // Initialize necessary hooks and Redux functions
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username, email } = useSelector((store) => store.player);

  // Function to handle player logout
  const playerLogout = () => {
    dispatch(logoutPlayer());
    dispatch(setPlayerIsLogged(false));
    dispatch(setToken());
  };

  // Function to navigate to the given pages
  const PlayerProfile = () => {
    navigate("/player-profile");
    closeMenu(); // Close the dropdown menu after navigation
  };
  const PrivacyPolicy = () => {
    navigate("/privacy-policy");
    closeMenu(); // Close the dropdown menu after navigation
  };
  const GameCredits = () => {
    navigate("/game-credits");
    closeMenu(); // Close the dropdown menu after navigation
  };
  const ChangeLog = () => {
    navigate("/change-log");
    closeMenu(); // Close the dropdown menu after navigation
  };

  // Render the UserDropdownMenu component
  return (
    <div className={styles.dropdown_menu}>
      {/* Display the player's name (either username or email) */}
      <div className={styles.player_name}>Player: {username || email}</div>
      <div className={styles.line}></div> {/* Divider line */}
      <div className={styles.dropdown_body}>
        {/* Option to navigate to the Player Profile page */}
        <span onClick={PlayerProfile}>Player Profile</span>
        <div className={styles.line}></div> {/* Divider line */}
        <span onClick={PrivacyPolicy}>Privacy Policy</span>
        <div className={styles.line}></div> {/* Divider line */}
        <span onClick={GameCredits}>Game Credits</span>
        <div className={styles.line}></div> {/* Divider line */}
        <span onClick={ChangeLog}>Change Log</span>
      </div>
      <div className={styles.line}></div> {/* Divider line */}
      {/* Option to logout the player */}
      <span onClick={playerLogout}>Logout</span>
    </div>
  );
};

// Export the UserDropdownMenu component
export default UserDropdownMenu;
