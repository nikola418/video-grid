import { FC } from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<Props> = ({ className, ...props }) => {
  return (
    <button
      className={`cursor-pointer bg-blue-400 p-2 text-white ${className}`}
      {...props}
    />
  );
};

export default Button;
