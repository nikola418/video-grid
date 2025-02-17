import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider, FiltersProvider } from "./contexts";
import { HomeLayout } from "./layouts";
import { Video, VideoGrid } from "./pages";

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="video-grid-theme">
    <FiltersProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/a" element={<VideoGrid />} />
            <Route path="/videos/:videoId" element={<Video />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FiltersProvider>
  </ThemeProvider>
);

export default App;
