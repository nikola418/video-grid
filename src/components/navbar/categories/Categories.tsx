import styles from "./Categories.module.css";

type Props = {
  active: string;
  setCategory: (category: string) => void;
};

const isAnyCategory = (category: string) =>
  !["nature", "science", "art", "travel", "technology"].includes(category);

const Categories: React.FC<Props> = ({ setCategory, active }) => {
  return (
    <div style={{ padding: "0px 12px" }}>
      <p>Category</p>
      <div className={styles.container}>
        <div
          onClick={() => setCategory("nature")}
          className={`${styles.box} ${
            active === "nature" ? styles.active : ""
          }`}
        >
          Nature
        </div>
        <div
          onClick={() => setCategory("science")}
          className={`${styles.box} ${
            active === "science" ? styles.active : ""
          }`}
        >
          Science
        </div>
        <div
          onClick={() => setCategory("art")}
          className={`${styles.box} ${active === "art" ? styles.active : ""}`}
        >
          Art
        </div>
        <div
          onClick={() => setCategory("travel")}
          className={`${styles.box} ${
            active === "travel" ? styles.active : ""
          }`}
        >
          Travel
        </div>
        <div
          onClick={() => setCategory("technology")}
          className={`${styles.box} ${
            active === "technology" ? styles.active : ""
          }`}
        >
          Technology
        </div>
        <div
          onClick={() => setCategory("")}
          className={`${styles.box} ${
            isAnyCategory(active) ? styles.active : ""
          }`}
        >
          Any
        </div>
      </div>
    </div>
  );
};

export default Categories;
