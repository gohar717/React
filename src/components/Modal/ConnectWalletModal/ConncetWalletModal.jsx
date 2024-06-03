// Importing necessary dependencies and styles
import React from "react";
import { useDispatch } from "react-redux";

import anchorIcon from "../../../assets/images/Icons/anchor_icon.png";
import closeIcon from "../../../assets/images/Icons/close_icon.png";
import waxIcon from "../../../assets/images/Icons/wax_icon.png";

import styles from "./styles.module.scss";

import {
  setAnchorConnected,
  setWaxConnected,
  setWaxData,
} from "../../../GlobalState/UserReducer";
import { UserService } from "../../../UserService";
import Button from "../../Button/Button";

// ConnectWalletModal component
const ConnectWalletModal = ({ onClose }) => {
  // Initializing Redux dispatch
  const dispatch = useDispatch();

  // Function to connect Wax Cloud Wallet
  const connectWaxWallet = async () => {
    try {
      // Calling the waxLogin method from the UserService
      UserService.waxLogin().then(async res => {
        // Getting Wax balance using the getWaxBalance method
        const waxBalance = await UserService.getWaxBalance(res);
        // Dispatching actions to set Wax data and connection status
        dispatch(
          setWaxData({
            name: res,
            isLogged: true,
            waxBalance: waxBalance,
          })
        );
        dispatch(setWaxConnected());
        onClose(); // Closing the modal
      });
    } catch (error) {
      console.error("Error connecting to Wax wallet:", error);
    }
  };

  // Function to connect Anchor Wallet
  const connectAnchorWallet = () => {
    // Calling the anchorConnect method from the UserService
    UserService.anchorConnect().then(async (wallet) => {
      if (wallet) {
        let waxAddress = wallet?.session.auth.actor.toString();
        // Dispatching actions to set Wax data and connection status
        dispatch(
          setWaxData({
            name: waxAddress,
            isLogged: true,
            balance: await UserService.getWaxBalance(waxAddress),
          })
        );
        dispatch(setAnchorConnected());
        onClose(); // Closing the modal
      } else {
        console.error("Anchor error");
      }
    });
  };

  // JSX structure for the ConnectWalletModal component
  return (
    <div className={styles.container} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Choose your wallet</h3>
          <img
            rel="preload"
            className={styles.close}
            src={closeIcon}
            onClick={onClose}
            alt="Close icon"
          />
        </div>
        <div className={styles.modalBody}>
          {/* Wax Cloud Wallet option */}
          <div onClick={connectWaxWallet}>
            <img rel="preload" src={waxIcon} alt="Wax connect icon" />
            <h5>Wax Cloud Wallet</h5>
          </div>
          {/* Anchor Wallet option */}
          <div onClick={connectAnchorWallet}>
            <img rel="preload" src={anchorIcon} alt="Anchor connect icon" />
            <h5>Anchor Wallet</h5>
          </div>
        </div>
        {/* Modal footer with a Close button */}
        <div className={styles.modalFooter}>
          <Button onClick={onClose} size="medium" color="blue">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

// Exporting the ConnectWalletModal component
export default ConnectWalletModal;
