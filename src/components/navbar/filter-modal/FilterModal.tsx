import { Button } from "@/components/ui/button";
import { useFilters } from "@/contexts";
import { FC, useState } from "react";
import { Categories } from "./categories";

type Props = {
  close: () => void;
};

const FiltersModal: FC<Props> = ({ close }) => {
  const { category, setCategory } = useFilters();
  const [active, setActive] = useState(category);

  return (
    <>
      <Categories setActive={setActive} active={active} />
      <div style={{ margin: "24px 0 0 0" }}>
        <Button
          onClick={() => {
            setCategory(active);
            close();
          }}
          className="w-full"
        >
          Confirm
        </Button>
      </div>
    </>
  );
};

export default FiltersModal;
