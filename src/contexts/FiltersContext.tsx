import { createContext, useContext, useState } from "react";

type Context = {
  search?: string;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  category?: string;
  setCategory: React.Dispatch<React.SetStateAction<string | undefined>>;
};
type Props = {
  children: React.ReactNode;
};

const FiltersContext = createContext<Context>({
  setSearch: () => {},
  setCategory: () => {},
});

const FiltersProvider: React.FC<Props> = ({ children }) => {
  const [search, setSearch] = useState<string>();
  const [category, setCategory] = useState<string>();

  return (
    <FiltersContext.Provider
      value={{ search, setSearch, category, setCategory }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export default FiltersProvider;

export const useFilters = () => {
  return useContext(FiltersContext);
};
