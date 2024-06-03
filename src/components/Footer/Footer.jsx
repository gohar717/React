import React from "react";
import discordIcon from "../../assets/images/Icons/discord.svg";
import logoTQ from "../../assets/images/Icons/logoTQ.png";
import telegramIcon from "../../assets/images/Icons/telegram.svg";
import styles from "./styles.module.scss";

export const Footer = () => {
  return (
    <footer>
      <div className={styles.container}>
        <div className={styles.container_social}>
          <h1>Join the Community</h1>
          <a href="https://t.co/hTtAnTRl2j" target="_blank" rel="noreferrer">
            <img rel="preload" src={discordIcon} alt="discord icon" />
          </a>
          <a
            href="https://t.me/triliumquestwax"
            target="_blank"
            rel="noreferrer"
          >
            <img rel="preload" src={telegramIcon} alt="twitter icon" />
          </a>
        </div>
        <img
          src={logoTQ}
          alt={logoTQ ? "trilium quest logo" : "no image"}
          className={styles.container_logo}
        />
      </div>
    </footer>
  );
};
