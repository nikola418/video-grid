import { FC } from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<Props> = ({ className, ...props }) => {
  return (
    <button
      className={`hover:bg-accent cursor-pointer bg-gradient-to-r from-blue-400 to-blue-600 p-2 text-white hover:bg-none ${className}`}
      {...props}
    />
  );
};

export default Button;
