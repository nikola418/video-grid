import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { FiltersProvider } from "./contexts";
import "./index.css";
import { HomeLayout } from "./layouts";
import { VideoGrid } from "./pages";

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <FiltersProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="*" index element={<VideoGrid />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FiltersProvider>
  </StrictMode>
);
