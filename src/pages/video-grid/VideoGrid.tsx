import { getAll as popularAll } from "@/api/popular-videos";
import { getAll as searchAll } from "@/api/search-videos";
import { VideoCard } from "@/components/video-card";
import { useFilters } from "@/contexts";
import { AxiosError } from "axios";
import { debounce, unionBy } from "lodash";
import { Video as VideoType } from "pexels";
import { Fragment, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

const perPage = 12;

const columnCount = (width: number) =>
  width < 768 ? 1 : width < 1024 ? 2 : width < 1480 ? 3 : 4;
const columnWidth = (width: number) =>
  width < 768
    ? width
    : width < 1024
    ? width / 2
    : width < 1480
    ? width / 3
    : width / 4;

const VideoGrid: React.FC = () => {
  const { search, category } = useFilters();
  const [videoInfos, setVideoInfos] = useState<VideoType[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const searchVideos = useCallback(
    async (page: number, search?: string, category?: string) => {
      const { videos, next_page } = await searchAll({
        query: `${category ?? ""},${search ?? ""}`,
        page,
        per_page: perPage,
      });

      setVideoInfos((prev) => unionBy(prev, videos, "id"));

      if (next_page) setHasNext(true);
      else setHasNext(false);
    },
    []
  );

  const getPopular = useCallback(async (page: number) => {
    const { videos, next_page } = await popularAll({
      page,
      per_page: perPage,
    });

    setVideoInfos((prev) => unionBy(prev, videos, "id"));

    if (next_page) setHasNext(true);
    else setHasNext(false);
  }, []);

  const loadVideos = useCallback(() => {
    const isSearch = search !== undefined && search !== "";
    const isCategory = category !== undefined && category !== "";

    const debounced = debounce(async () => {
      setIsLoading(true);
      try {
        if (isSearch || isCategory) {
          await searchVideos(page, search, category);
        } else {
          await getPopular(page);
        }
      } catch (error) {
        console.error(error);
        if (error instanceof AxiosError) {
          toast.error("Too many requests!", {
            toastId: 429,
          });
        }
      } finally {
        setIsLoading(false);
      }
    }, 500);

    debounced();
  }, [category, getPopular, page, search, searchVideos]);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  useEffect(() => {
    setPage(1);
    setVideoInfos([]);
  }, [search, category]);

  const itemCount = hasNext ? videoInfos.length + perPage : videoInfos.length;
  const isItemLoaded = (index: number) => !hasNext || index < videoInfos.length;

  return (
    <Fragment>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            itemCount={itemCount}
            isItemLoaded={isItemLoaded}
            loadMoreItems={
              isLoading ? () => {} : () => setPage((prev) => prev + 1)
            }
          >
            {({ onItemsRendered, ref }) => {
              return (
                <div>
                  <FixedSizeGrid
                    ref={ref}
                    onItemsRendered={(props) => {
                      onItemsRendered({
                        overscanStartIndex:
                          props.overscanRowStartIndex * 4 +
                          props.overscanColumnStartIndex,
                        overscanStopIndex:
                          props.overscanRowStopIndex * 4 +
                          props.overscanColumnStopIndex,
                        visibleStartIndex:
                          props.visibleRowStartIndex * 4 +
                          props.visibleColumnStartIndex,
                        visibleStopIndex:
                          props.visibleRowStopIndex * 4 +
                          props.visibleColumnStopIndex,
                      });
                    }}
                    columnCount={columnCount(width)}
                    rowCount={itemCount / columnCount(width)}
                    columnWidth={columnWidth(width)}
                    rowHeight={320}
                    height={height}
                    width={width}
                  >
                    {({ columnIndex, rowIndex, style }) => {
                      const videoIndex =
                        rowIndex * columnCount(width) + columnIndex;

                      return (
                        <VideoCard
                          style={style}
                          isItemLoaded={isItemLoaded(videoIndex)}
                          video={videoInfos[videoIndex]}
                          index={videoIndex}
                        />
                      );
                    }}
                  </FixedSizeGrid>
                </div>
              );
            }}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </Fragment>
  );
};

export default VideoGrid;
