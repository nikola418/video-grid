import styles from "./Spinner.module.css";

const Spinner: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return <div className={`${className} ${styles.spinner}`} {...props}></div>;
};

export default Spinner;
