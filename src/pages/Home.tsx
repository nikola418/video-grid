import { Navbar, VideoGrid } from "@/components";
import { useState } from "react";
import styles from "./Home.module.css";

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>();

  return (
    <div className={styles.page}>
      <Navbar
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <main className={styles.main}>
        <VideoGrid search={search} selectedCategory={selectedCategory} />
      </main>
    </div>
  );
};

export default Home;
