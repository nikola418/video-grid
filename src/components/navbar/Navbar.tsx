import filterIcon from "@/assets/icons/filter.svg";
import { useFilters } from "@/contexts";
import { debounce } from "lodash";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FiltersModal } from "./filter-modal";
import { Modal } from "@/components";

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
      <nav className="sticky top-0 z-10 flex w-full items-center justify-start gap-2 bg-linear-to-r from-cyan-500 to-blue-500 p-2 shadow-sm shadow-slate-500">
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
          className="bg-transparent"
        >
          <img src={filterIcon} alt="Filter" />
        </Button>
      </nav>
      <Modal ref={modalRef} title="Filter">
        <FiltersModal close={() => modalRef.current?.close()} />
      </Modal>
    </>
  );
};

export default Navbar;
