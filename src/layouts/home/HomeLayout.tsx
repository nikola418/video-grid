import { Navbar } from "@/components";
import { Outlet } from "react-router";
import styles from "./HomeLayout.module.css";
import { ToastContainer } from "react-toastify";

const HomeLayout = () => {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default HomeLayout;
