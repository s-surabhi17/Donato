import { Link } from "react-router-dom";
import styles from "./Button.module.css";

const Button = ({ text, link }) => {
  return (
    <Link className={styles.button} to={link}>
      {text}
    </Link>
  );
};

export default Button;