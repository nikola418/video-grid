import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider, FiltersProvider } from "./contexts";
import { HomeLayout } from "./layouts";
import { VideoGrid } from "./pages";

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="video-grid-theme">
    <FiltersProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/videos" index element={<VideoGrid />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FiltersProvider>
  </ThemeProvider>
);

export default App;
