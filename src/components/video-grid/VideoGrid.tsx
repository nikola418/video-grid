import { getAll as popularAll } from "@/api/popular-videos";
import { getAll as searchAll } from "@/api/search-videos";
import { debounce, DebouncedFunc, unionBy } from "lodash";
import { Video as VideoType } from "pexels";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { VideoCard } from "./video-card";

type Props = {
  search?: string;
  selectedCategory?: string;
};

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

const VideoGrid: React.FC<Props> = ({ selectedCategory, search }) => {
  const [videoInfos, setVideoInfos] = useState<VideoType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const lastDebounced = useRef<DebouncedFunc<() => Promise<void>> | null>(null);

  const getVideoInfos = useCallback(
    async (perPage: number) => {
      setIsLoading(true);
      const debounced = debounce(async () => {
        const isSearch = search !== undefined && search !== "";
        const isCategory =
          selectedCategory !== undefined && selectedCategory !== "";

        try {
          const { videos, next_page } =
            isSearch || isCategory
              ? await searchAll({
                  query: selectedCategory ?? search,
                  page,
                  per_page: perPage,
                })
              : await popularAll({
                  page,
                  per_page: perPage,
                });

          setVideoInfos((prev) => unionBy(prev, videos, "id"));

          if (next_page) setHasNext(true);
          else setHasNext(false);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }, 500);
      lastDebounced.current?.cancel();
      lastDebounced.current = debounced;
      debounced();
    },

    [page, search, selectedCategory]
  );

  useEffect(() => {
    getVideoInfos(perPage);
  }, [getVideoInfos]);

  useEffect(() => {
    setVideoInfos([]);
  }, [search, selectedCategory]);

  const itemCount = hasNext ? videoInfos.length + 1 : videoInfos.length;
  const isItemLoaded = (index: number) => !hasNext || index < videoInfos.length;

  return (
    <Fragment>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            itemCount={itemCount}
            isItemLoaded={isItemLoaded}
            loadMoreItems={
              isLoading
                ? () => {}
                : () => {
                    setPage((prev) => prev + 1);
                  }
            }
          >
            {({ onItemsRendered, ref }) => {
              return (
                <div>
                  <FixedSizeGrid
                    ref={ref}
                    onItemsRendered={(props) =>
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
                      })
                    }
                    columnCount={columnCount(width)}
                    rowCount={itemCount / 4}
                    columnWidth={columnWidth(width)}
                    rowHeight={320}
                    height={height}
                    width={width}
                  >
                    {({ columnIndex, rowIndex, style }) => {
                      const videoIndex = rowIndex * 4 + columnIndex;
                      if (videoIndex >= videoInfos.length) return null;
                      return (
                        <VideoCard
                          style={style}
                          isLoading={() => !isItemLoaded(videoIndex)}
                          video={videoInfos[videoIndex]}
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
