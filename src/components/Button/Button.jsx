import classNames from "classnames";
import Loader from "../Loader/Loader";
import styles from "./styles.module.scss";

const Button = ({
  children,
  onClick,
  loader,
  disabled = false,
  color,
  size,
  type,
}) => {
  const buttonClass = classNames(
    styles.button,
    color === "white"
      ? styles.btn_white
      : color === "blue"
      ? styles.btn_blue
      : "",
    size === "fit" ? styles.btn_fit : size === "medium" ? styles.btn_medium : ""
  );

  return (
    <button
      className={buttonClass}
      style={{ opacity: disabled ? "0.5" : "1" }}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      <span className={loader ? styles.title_opacity : styles.title}>
        {children}
      </span>
      {loader && <Loader size={20} />}
    </button>
  );
};

export default Button;
