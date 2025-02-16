import FilterSVG from "@/assets/icons/filter.svg?react";
import { Modal } from "@/components";
import { useFilters } from "@/contexts";
import { debounce } from "lodash";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FiltersModal } from "./filter-modal";

const Navbar: React.FC = () => {
  const { setSearch } = useFilters();
  const modalRef = useRef<HTMLDialogElement>(null);

  const [input, setInput] = useState<string>();
  const debouncedSearch = useRef(
    debounce((value?: string) => {
      setSearch(value);
    }, 500),
  ).current;

  return (
    <>
      <nav className="sticky top-0 z-10 flex w-full items-center justify-start gap-2 p-2 shadow-sm shadow-slate-700/50 dark:bg-gradient-to-r dark:from-slate-600 dark:to-slate-800">
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
        <Button
          onClick={() => modalRef.current?.showModal()}
          className="bg-none"
        >
          <FilterSVG />
        </Button>
      </nav>
      <Modal ref={modalRef} title="Filter">
        <FiltersModal close={() => modalRef.current?.close()} />
      </Modal>
    </>
  );
};

export default Navbar;
