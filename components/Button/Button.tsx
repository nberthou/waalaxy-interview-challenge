import styles from "styles/Button.module.css";

const Button = ({ children, className, ...props }) => (
  <button {...props} className={`${styles.button} ${className}`}>
    {children}
  </button>
);

export default Button;
