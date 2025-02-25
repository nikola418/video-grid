const Spinner: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={`z-10 size-10 animate-spin rounded-full border-2 border-black/10 border-l-black dark:border-l-white ${className}`}
      {...props}
    ></div>
  );
};

export default Spinner;
