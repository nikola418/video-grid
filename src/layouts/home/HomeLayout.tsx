import { Navbar } from "@/components";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const HomeLayout = () => {
  return (
    <div className="flex min-h-[100vh] min-w-sm flex-col">
      <Navbar />
      <main className="flex-auto">
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
