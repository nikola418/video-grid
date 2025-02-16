type Props = {} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<Props> = ({ className, ...props }) => {
  return (
    <input
      className={`mx-1 w-sm rounded-sm border border-gray-500/50 p-2 max-sm:w-full ${className}`}
      {...props}
    />
  );
};

export default Input;
