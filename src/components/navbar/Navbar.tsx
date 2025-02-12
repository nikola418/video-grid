import { useFilters } from "@/contexts";
import { debounce } from "lodash";
import React, { useRef, useState } from "react";
import { FilterIcon } from "../filter-icon";
import { Input } from "../input";
import Modal from "../modal/Modal";
import { Categories } from "./categories";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const {
    setSearch,
    category: selectedCategory,
    setCategory: setSelectedCategory,
  } = useFilters();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState<string | undefined>(
    selectedCategory
  );
  const [input, setInput] = useState<string>();
  const debouncedSearch = useRef(
    debounce((value?: string) => {
      setSearch(value);
    }, 500)
  ).current;

  return (
    <>
      <nav className={styles.navbar}>
        <div className="row" style={{ maxWidth: "300px" }}>
          <Input
            type="search"
            name="search"
            id="search"
            placeholder="Search"
            value={input ?? ""}
            onChange={(e) => {
              setInput(e.target.value);
              debouncedSearch.cancel();
              debouncedSearch(e.target.value);
            }}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            style={{ verticalAlign: "middle" }}
          >
            <FilterIcon />
          </button>
        </div>
      </nav>
      <Modal
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        title="Filter"
      >
        <Categories setCategory={setCategory} active={category} />
        <div
          className="row justify-content-center"
          style={{ margin: "24px 0 0 0" }}
        >
          <button
            onClick={() => {
              setSelectedCategory(category);
              setIsModalOpen(false);
            }}
            className={styles.button}
          >
            Confirm
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Navbar;
