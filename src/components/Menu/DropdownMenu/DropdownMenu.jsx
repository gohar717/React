import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EnterIcon from "../../../assets/images/Icons/enter.png";
import ExitIcon from "../../../assets/images/Icons/exit.png";
import styles from "./styles.module.scss";

// DropdownMenu component with props for handling menu actions
const DropdownMenu = ({
  closeMenu,
  openWaxModal,
  onHandleLogout,
  menuList,
}) => {
  // Extracting waxConnected and anchorConnected from the Redux store
  const { waxConnected, anchorConnected } = useSelector((store) => store.user);

  // JSX structure for the DropdownMenu component
  return (
    <div className={styles.dropdown_menu}>
      {/* Mapping through menuList to render menu items */}
      {menuList.map(
        (item, index) =>
          item.isShow && (
            <React.Fragment key={index}>
              {/* Link to navigate to the specified route and close the menu */}
              <Link key={index} to={item.link} onClick={closeMenu}>
                {item.title}
              </Link>
              {/* Divider line between menu items */}
              <div className={styles.line}></div>
            </React.Fragment>
          )
      )}

      {/* Conditional rendering based on wallet connection status */}
      {!waxConnected && !anchorConnected ? (
        // Render Connect Wallet option if not connected
        <div className={styles.wallet_info} onClick={openWaxModal}>
          <img
            rel="preload"
            src={EnterIcon}
            alt="Connect logo"
            width="25"
            height="25"
          />
          <span className={styles.btn_item}>Connect Wallet</span>
        </div>
      ) : (
        // Render Disconnect Wallet option if connected
        <div className={styles.wallet_info} onClick={onHandleLogout}>
          <span className={styles.btn_item}>Disconnect Wallet</span>
          <img
            rel="preload"
            src={ExitIcon}
            alt="Disconnect logo"
            width="25"
            height="25"
          />
        </div>
      )}
    </div>
  );
};

// Export the DropdownMenu component
export default DropdownMenu;
