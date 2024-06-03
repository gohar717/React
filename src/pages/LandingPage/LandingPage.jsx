import styles from "./styles.module.scss";

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import arrowDown from "../../assets/images/Icons/arrowDown.svg";
import logoAW from "../../assets/images/Icons/logoAW.svg";
import logoTQ from "../../assets/images/Icons/logoTQ.png";
import play from "../../assets/images/Icons/play.svg";
import characters from "../../assets/images/homepage/characters.png";
import characters2 from "../../assets/images/homepage/characters2.png";
import screenshots from "../../assets/images/homepage/screenshots.png";
import trailer from "../../assets/videos/trailer.mp4";

// LandingPage component
export const LandingPage = () => {
  const videoRef = useRef(null);
  const trailerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  const handleGetStartedClick = () => {
    window.scrollTo(0, 0);
  };

  const handleArrowClick = () => {
    trailerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.homePage_border}></div>
      <button className={styles.homePage_arrowDown} onClick={handleArrowClick}>
        <img src={arrowDown} alt={arrowDown ? "down arrow" : "no image"}></img>
      </button>
      <div className={styles.homePage_firstSection}>
        <img
          src={characters}
          alt={characters ? "characters" : "no image"}
          className={styles.homePage_firstSection_charactersImage}
        />
        <div className={styles.homePage_firstSection_infoDiv}>
          <img
            src={logoAW}
            alt={logoAW ? "logo aw" : "no image"}
            className={styles.homePage_firstSection_infoDiv_logoAW}
          />
          <img
            src={logoTQ}
            alt={logoTQ ? "logo tq" : "no image"}
            className={styles.homePage_firstSection_infoDiv_logoTQ}
          />
          <h1>Curse of the Holoforms</h1>
          <h2>An Alien Worlds Community Game</h2>
          <p>Multiplayer coming early 2024</p>
          <div className={styles.homePage_firstSection_infoDiv_buttonsDiv}>
            <Link to="/curse-of-the-holoforms" className={styles.button}>Web</Link>
            <a href="/TQ-Episode0.Windows.exe" className={styles.button}>WINDOWS</a>
            <a href="/TQ-Episode0.MacOS.zip" className={styles.button}>MAC</a>
            <a href="/TQ-Episode0.Linux.x86_64" className={styles.button}>LINUX</a>
          </div>
          <p>DOWNLOAD NOW</p>
        </div>
      </div>
      <div className={styles.homePage_secondSection}>
        <h1>New to</h1>
        <img src={logoTQ} alt={logoTQ ? "logo trilium quest" : "no image"} />
        <h2>Checkout our Wiki!</h2>
        <Link
          to="/trilium-wiki"
          className={styles.button}
          onClick={handleGetStartedClick}
        >
          GET STARTED
        </Link>
      </div>
      <div ref={trailerRef} className={styles.homePage_thirdSection}>
        <h1>Watch the trailer</h1>
        <div className={styles.homePage_thirdSection_videoDiv}>
          <video
            controls={isPlaying}
            ref={videoRef}
            src={trailer}
            onEnded={handleVideoEnded}
            type="video/mp4"
          ></video>
          {!isPlaying && (
            <button onClick={handlePlayClick}>
              <img src={play} alt={play ? "play button" : "no image"} />
            </button>
          )}
        </div>
      </div>
      <div className={styles.homePage_fourthSection}>
        <h1>About</h1>
        <img src={logoTQ} alt={logoTQ ? "logo tq" : "no image"} />
        <h2>
          Dive into the immersive world of Trilium Quest, an exciting MMORPG set
          in the Alien Worlds Metaverse. Uncover the mysteries of Magor and
          prepare for the epic 'Curse of The Holoforms' coming in early 2024.
        </h2>
        <div className={styles.homePage_fourthSection_imagesDiv}>
          <img
            src={screenshots}
            alt={screenshots ? "screenshots" : "no image"}
          />
          <img
            src={characters2}
            alt={characters2 ? "characters 2" : "no image"}
          />
        </div>
      </div>
    </div>
  );
};
