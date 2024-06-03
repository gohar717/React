import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles.module.scss"; // Importing styles from SCSS module

import closeIcon from "../../../assets/images/Icons/close_icon.png";

import { setWaxBalance } from "../../../GlobalState/UserReducer";
import { User, UserService } from "../../../UserService";

import Button from "../../Button/Button";
import Input from "../../Input/Input";

const SupportDevelopmentModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { waxConnected, anchorConnected } = useSelector((store) => store.user);
  const [value, setValue] = useState("");

  // Function to send Wax or Trilium based on the connected wallet
  function sendWaxOrTrilium() {
    if (value.trim() === "") return;

    let precision = 8;
    let amount = parseFloat(value.trim()).toFixed(precision);

    if (anchorConnected) {
      sendWithAnchor(amount);
    } else if (waxConnected) {
      sendWithWaxCloud(amount);
    }
  }

  // Function to send WAX using Anchor wallet
  const sendWithAnchor = (amount) => {
    const action = {
      account: "eosio.token",
      name: "transfer",
      authorization: [
        {
          actor: User.anchorSession?.auth?.actor.toString() || "",
          permission: "active",
        },
      ],
      data: {
        from: User.anchorSession?.auth.actor.toString(),
        to: "qhtunwo2p.gm",
        quantity: amount + " WAX",
        memo: "Community support for development.",
      },
    };

    User.anchorSession
      ?.transact({ action })
      .then(async () => {
        let waxAddress = User.anchorSession.auth.actor.toString();
        const balance = await UserService.getWaxBalance(waxAddress);
        dispatch(setWaxBalance(balance));
        onClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Function to send WAX using Wax Cloud wallet
  const sendWithWaxCloud = (amount) => {
    User.wax.api
      .transact(
        {
          actions: [
            {
              account: "eosio.token",
              name: "transfer",
              authorization: [
                {
                  actor: User.wax?.userAccount || "",
                  permission: "active",
                },
              ],
              data: {
                from: User.wax?.userAccount || "",
                to: "qhtunwo2p.gm",
                quantity: amount + " WAX",
                memo: "Community support for development.",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      )
      .then((response) => {
        console.log(response);
        onClose();
      });
  };

  return (
    <div className={styles.container} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <h3>Support the Development!</h3>
          <img
            rel="preload"
            className={styles.close}
            src={closeIcon}
            onClick={onClose}
            alt="close icon"
          />
        </div>

        {/* Modal Body */}
        <div className={styles.modalBody}>
          {/* Input for the amount to be sent */}
          <Input
            type="number"
            label="Amount"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        {/* Modal Footer with Close and Send buttons */}
        <div className={styles.modalFooter}>
          <Button onClick={onClose} size="medium" color="blue">
            Close
          </Button>
          <Button onClick={sendWaxOrTrilium} size="medium" color="white">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupportDevelopmentModal;
