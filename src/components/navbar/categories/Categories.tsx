import { isEqual } from "lodash";
import styles from "./Categories.module.css";
import { categories } from "./categories";

type Props = {
  active?: string;
  setCategory: (category?: string) => void;
};

const Categories: React.FC<Props> = ({ setCategory, active }) => {
  return (
    <div style={{ padding: "0px 12px" }}>
      <p>Category</p>
      <div className={styles.container}>
        {Object.entries(categories).map(([key, value]) => (
          <div
            key={key}
            onClick={() => setCategory(value)}
            className={`${styles.box} ${
              isEqual(active, value) ? styles.active : ""
            }`}
          >
            {key}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
