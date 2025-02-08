import styles from "./Input.module.css";
type Props = {} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<Props> = ({ ...props }) => {
  return <input className={styles.input} {...props} />;
};

export default Input;
