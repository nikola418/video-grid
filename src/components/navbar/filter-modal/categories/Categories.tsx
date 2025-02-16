import { isEqual } from "lodash";
import { Category } from "./categories";

type Props = {
  active?: Category;
  setActive: React.Dispatch<React.SetStateAction<Category | undefined>>;
};

const Categories: React.FC<Props> = ({ active, setActive }) => {
  const commonClassNames: (
    value?: string,
  ) => React.HTMLAttributes<HTMLDivElement>["className"] = (value) =>
    `m-2 w-40 cursor-pointer rounded-md border border-gray-500 p-2 hover:bg-blue-700 hover:text-white dark:hover:bg-blue-700 ${
      isEqual(active, value) ? "bg-blue-500  text-white" : ""
    }`;

  return (
    <div className="my-2">
      <h4 className="mb-2 text-lg">Category</h4>
      <div className="flex max-w-lg flex-wrap justify-center">
        <div
          key={"any"}
          onClick={() => setActive(undefined)}
          className={commonClassNames(undefined)}
        >
          Any
        </div>
        {Object.entries(Category).map(([key, value]) => (
          <div
            key={key}
            onClick={() => setActive(value)}
            className={commonClassNames(value)}
          >
            {key}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
