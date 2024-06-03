// Import necessary dependencies and assets
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LogoIcon from "../../assets/images/Icons/logoTQ.png";
import defaultUser from "../../assets/images/Icons/default_user.png";
import hamburgerIcon from "../../assets/images/Icons/hamburger_icon.png";

import { User, UserService } from "../../UserService";

// Import styles and components
import styles from "./styles.module.scss";
import ConnectWalletModal from "../Modal/ConnectWalletModal/ConncetWalletModal";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import UserDropdownMenu from "./UserDropdownMenu/UserDropdownMenu";

// Functional component for the main navigation menu
export const Menu = () => {
  // Initialize necessary hooks and Redux state
  const navigate = useNavigate();
  const { name, balance, waxConnected, anchorConnected } = useSelector(
    (store) => store.user
  );
  const { id } = useSelector((store) => store.player);
  const [waxModalOpen, setWaxModalOpen] = useState(false);
  const [menuPlayerOpen, setMenuPlayerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const userConnect = !!id;
  const walletConnect = !!(waxConnected || anchorConnected);

  // Define an array for the menu items with conditional rendering
  const menuArray = [
    { isShow: !userConnect, link: "/login", title: "Login" },
    { isShow: !userConnect, link: "/signup", title: "Signup" },
    { isShow: true, link: "/blogs", title: "Blogs" },
    { isShow: walletConnect, link: "/my-nfts", title: "My Nfts" },
    { isShow: walletConnect, link: "/staging-nfts", title: "Staging Nfts" },
    { isShow: true, link: "/bestiary", title: "Bestiary" },
    { isShow: true, link: "/trilium-wiki", title: "Trilium Wiki" },
    { isShow: true, link: "/web-episodes", title: "Web Episodes" },
  ];

  // Function to handle player logout
  const onHandleLogout = () => {
    UserService.logout();
  };

  // Function to open and close the Wax wallet modal
  const openWaxModal = () => {
    setWaxModalOpen(true);
  };

  const closeWaxModal = () => {
    setWaxModalOpen(false);
  };

  // Functions to open and close the player menu
  const openPlayerMenu = () => {
    setMenuPlayerOpen((prevOpen) => !prevOpen);
    if (menuOpen) {
      setMenuOpen(!menuOpen);
    }
  };

  const closePlayerMenu = () => {
    setMenuPlayerOpen(false);
  };

  // Functions to open and close the main menu
  const openMenu = () => {
    setMenuOpen((prevOpen) => !prevOpen);
    if (menuPlayerOpen) {
      setMenuPlayerOpen(!menuPlayerOpen);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Render the main navigation menu component
  return (
    <>
      <nav className={styles.container}>
        <div>
          <div>
            {/* TriliumQuest logo */}
            <img
              rel="preload"
              alt="LogoIcon"
              src={LogoIcon}
              onClick={() => navigate("/")}
            />
            {/* Display wallet balance if connected */}
            {(waxConnected || anchorConnected) && (
              <div className={styles.wallet_balance}>
                <p className={styles.testnet_message}>
                  {/* Display TestNet message if on WAX TestNet */}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: User.testnet
                        ? "Website is currently using WAX TestNet<br/>"
                        : "",
                    }}
                  />
                  {/* Display player name and wallet balance */}
                  {name} - Wallet: {balance ? balance : "0"}
                </p>
              </div>
            )}
          </div>

          <div>
            {/* Hamburger menu icon */}
            <div className={styles.menu_icon}>
              <img
                rel="preload"
                onClick={openMenu}
                src={hamburgerIcon}
                alt=""
              />
              {/* Render the dropdown menu when open */}
              {menuOpen && (
                <DropdownMenu
                  closeMenu={closeMenu}
                  openWaxModal={openWaxModal}
                  onHandleLogout={onHandleLogout}
                  menuList={menuArray}
                />
              )}
            </div>

            {/* User profile section */}
            {id && (
              <>
                <div className={styles.line}></div>
                <div className={styles.user_profile}>
                  {/* Default user avatar */}
                  <img
                    rel="preload"
                    onClick={openPlayerMenu}
                    src={defaultUser}
                    alt=""
                  />
                  {/* Render the user dropdown menu when open */}
                  {menuPlayerOpen && (
                    <UserDropdownMenu closeMenu={closePlayerMenu} />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Render the ConnectWalletModal when open */}
      {waxModalOpen && <ConnectWalletModal onClose={closeWaxModal} />}
    </>
  );
};
