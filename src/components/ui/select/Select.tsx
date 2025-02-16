type Props = {
  children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<Props> = ({ children, value, onChange }) => {
  return (
    <select value={value} onChange={onChange}>
      {children}
    </select>
  );
};

export default Select;
