import { VideoCard } from "@/components/video-card";
import { useFilters } from "@/contexts";
import { AxiosError } from "axios";
import { isUndefined, unionBy } from "lodash";
import { Video as VideoType } from "pexels";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import {
  aspectRatio,
  calculateColumnCount,
  getPopular,
  perColumn,
  searchVideos,
} from "./video-grid";

type State = {
  hasNext: boolean;
  videoInfos: VideoType[];
  isLoading: boolean;
  resetCount: number;
};

const VideoGrid: React.FC = () => {
  const { search, category } = useFilters();
  const [{ hasNext, isLoading, videoInfos, resetCount }, setState] =
    useState<State>({
      hasNext: true,
      isLoading: false,
      videoInfos: [],
      resetCount: 0,
    });
  const infiniteLoaderRef = useRef<InfiniteLoader>(null);
  const gridRef = useRef<FixedSizeGrid>(null);
  const hasMountedRef = useRef(false);

  const loadVideos = useCallback(
    async (page: number, perPage: number) => {
      setState((prev) => ({ ...prev, isLoading: true }));

      const isSearch = !isUndefined(search) && search !== "";
      const isCategory = !isUndefined(category) && category !== "any";

      try {
        const { next_page, videos } =
          isSearch || isCategory
            ? await searchVideos(page, perPage, search, category)
            : await getPopular(page, perPage);

        setState((prev) => ({
          ...prev,
          videoInfos: unionBy(prev.videoInfos, videos, "id"),
          hasNext: next_page ? true : false,
        }));
      } catch (error) {
        if (error instanceof AxiosError && error.status) {
          console.log(error.status);
          toast.error("Too many requests!", {
            toastId: 429,
          });
        } else {
          console.error(error);
        }
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [category, search]
  );

  useEffect(() => {
    if (hasMountedRef.current) {
      setState((prev) => ({
        ...prev,
        hasNext: true,
        videoInfos: [],
        resetCount: prev.resetCount + 1,
      }));
    }
  }, [search, category]);

  useEffect(() => {
    if (hasMountedRef.current) {
      if (infiniteLoaderRef.current) {
        infiniteLoaderRef.current.resetloadMoreItemsCache(true);
        gridRef.current?.scrollTo({ scrollTop: 0 });
      }
    }

    hasMountedRef.current = true;
  }, [resetCount]);

  const isItemLoaded = (index: number) => !hasNext || index < videoInfos.length;

  return (
    <>
      <AutoSizer>
        {({ height, width }) => {
          const columnCount = calculateColumnCount(width);
          const columnWidth = width / columnCount;
          const gutterSize = (16 * columnCount) / 2;
          const itemCount = hasNext
            ? videoInfos.length + columnCount * perColumn
            : videoInfos.length;

          return (
            <InfiniteLoader
              ref={infiniteLoaderRef}
              itemCount={itemCount}
              isItemLoaded={(index) => isItemLoaded(index)}
              loadMoreItems={
                isLoading
                  ? () => {}
                  : (start, stop) => {
                      console.log(
                        start,
                        stop,
                        Math.floor(start / (perColumn * columnCount)) + 1,
                        perColumn * columnCount
                      );
                      loadVideos(
                        Math.floor(start / (perColumn * columnCount)) + 1,
                        perColumn * columnCount
                      );
                    }
              }
            >
              {({ onItemsRendered, ref }) => {
                return (
                  <div>
                    <FixedSizeGrid
                      ref={(node) => {
                        ref(node);
                        gridRef.current = node;
                      }}
                      onItemsRendered={(props) => {
                        onItemsRendered({
                          overscanStartIndex:
                            props.overscanRowStartIndex * columnCount +
                            props.overscanColumnStartIndex,
                          overscanStopIndex:
                            props.overscanRowStopIndex * columnCount +
                            props.overscanColumnStopIndex,
                          visibleStartIndex:
                            props.visibleRowStartIndex * columnCount +
                            props.visibleColumnStartIndex,
                          visibleStopIndex:
                            props.visibleRowStopIndex * columnCount +
                            props.visibleColumnStopIndex,
                        });
                      }}
                      columnCount={
                        itemCount < columnCount ? itemCount : columnCount
                      }
                      rowCount={itemCount / columnCount}
                      columnWidth={columnWidth}
                      rowHeight={columnWidth / aspectRatio}
                      height={height}
                      width={width}
                    >
                      {({ columnIndex, rowIndex, style }) => {
                        const videoIndex = rowIndex * columnCount + columnIndex;

                        return (
                          <VideoCard
                            style={{
                              ...style,
                              left: (style?.left as number) + gutterSize,
                              top: (style?.top as number) + gutterSize,
                              width: (style?.width as number) - 2 * gutterSize,
                              height:
                                (style?.height as number) - 2 * gutterSize,
                            }}
                            video={videoInfos[videoIndex]}
                          />
                        );
                      }}
                    </FixedSizeGrid>
                  </div>
                );
              }}
            </InfiniteLoader>
          );
        }}
      </AutoSizer>
    </>
  );
};

export default VideoGrid;
