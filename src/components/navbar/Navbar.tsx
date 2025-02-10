import { Category, getAll } from "@/api/categories";
import React, { useEffect, useState } from "react";
import { Input } from "../input";
import styles from "./Navbar.module.css";
import { Select } from "../select";

type Props = {
  search?: string;
  setSearch: (value: string) => void;
  selectedCategory?: string;
  setSelectedCategory: (value?: string) => void;
};

const Navbar: React.FC<Props> = ({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const getCategories = async () => {
      const categories = await getAll();
      setCategories(categories);
    };

    getCategories();
  }, []);

  return (
    <nav className={styles.navbar}>
      <Input
        type="search"
        name="search"
        id="search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
        }}
        defaultValue={""}
      >
        <option value="">Any</option>
        {categories?.map((category) => (
          <option key={category.id} value={category.slug}>
            {category.name}
          </option>
        ))}
      </Select>
    </nav>
  );
};

export default Navbar;
