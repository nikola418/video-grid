import { getAll as popularAll } from "@/api/popular-videos";
import { getAll as searchAll } from "@/api/search-videos";
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
import { aspectRatio, calculateColumnCount, perColumn } from "./video-grid";

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

  const searchVideos = useCallback(
    async (
      page: number,
      perPage: number,
      search?: string,
      category?: string
    ) => {
      let query = "";
      query = query.concat(category ?? "", search ? `,${search}` : "");

      const result = await searchAll({
        query,
        page,
        per_page: perPage,
      });

      return result;
    },
    []
  );

  const getPopular = useCallback(async (page: number, perPage: number) => {
    const result = await popularAll({
      page,
      per_page: perPage,
    });

    return result;
  }, []);

  const loadVideos = useCallback(
    async (page: number, perPage: number) => {
      if (isLoading) return;

      const isSearch = !isUndefined(search) && search !== "";
      const isCategory = !isUndefined(category) && category !== "any";

      setState((prev) => ({ ...prev, isLoading: true }));
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
        console.error(error);
        if (error instanceof AxiosError) {
          toast.error("Too many requests!", {
            toastId: 429,
          });
        }
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [category, getPopular, isLoading, search, searchVideos]
  );

  useEffect(() => {
    if (hasMountedRef.current) {
      if (infiniteLoaderRef.current) {
        infiniteLoaderRef.current.resetloadMoreItemsCache(true);
        gridRef.current?.scrollTo({ scrollTop: 0 });
      }
    }
    hasMountedRef.current = true;
  }, [resetCount]);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      hasNext: true,
      videoInfos: [],
      resetCount: prev.resetCount + 1,
    }));
  }, [search, category]);

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
              isItemLoaded={(index) => {
                console.log(isItemLoaded(index));
                return isItemLoaded(index);
              }}
              loadMoreItems={(start) => {
                loadVideos(
                  Math.floor(start / (perColumn * columnCount)) + 1,
                  perColumn * columnCount
                );
              }}
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
                      columnCount={columnCount}
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
