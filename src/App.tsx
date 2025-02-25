import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { FiltersProvider, ThemeProvider } from "./contexts";
import { HomeLayout } from "./layouts";
import { Video, VideoGrid } from "./pages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="video-grid-theme">
      <FiltersProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<VideoGrid />} />
              <Route path="/videos/:videoId" element={<Video />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FiltersProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
