import { getAll, VideoInfo } from "@/api/video-infos";
import { unionBy } from "lodash";
import { Fragment, useCallback, useEffect, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { VideoCard } from "./video-card";

type Props = {
  search?: string;
  selectedCategory?: string;
};

const VideoGrid: React.FC<Props> = ({ search, selectedCategory }) => {
  const [videoInfos, setVideoInfos] = useState<VideoInfo[]>([]);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const getVideoInfos = useCallback(
    async (start: number, stop: number) => {
      setIsLoading(true);
      try {
        const data = await getAll({
          start,
          stop,
          search,
          category: selectedCategory,
        });
        setVideoInfos((prev) =>
          unionBy(prev, data, "id").sort((a, b) => a.createdAt - b.createdAt)
        );
        if (data.length !== 0) setHasNext(true);
        else setHasNext(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },

    [search, selectedCategory]
  );

  useEffect(() => {
    getVideoInfos(0, 12);
  }, [getVideoInfos]);

  useEffect(() => {
    setVideoInfos([]);
  }, [search, selectedCategory]);

  const itemCount = hasNext ? videoInfos.length + 12 : videoInfos.length;

  return (
    <Fragment>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            itemCount={itemCount}
            isItemLoaded={(index) => !hasNext || index < videoInfos.length}
            loadMoreItems={
              isLoading
                ? () => {}
                : async (startIndex, stopIndex) => {
                    await getVideoInfos(startIndex, stopIndex);
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
                    columnCount={4}
                    rowCount={itemCount / 4}
                    columnWidth={width / 4}
                    rowHeight={height / 3}
                    height={height}
                    width={width}
                  >
                    {({ columnIndex, rowIndex, style }) => {
                      const videoIndex = rowIndex * 4 + columnIndex;
                      if (videoIndex >= videoInfos.length) return null;

                      return (
                        <div style={{ ...style, padding: "24px" }}>
                          <VideoCard info={videoInfos[videoIndex]} />
                        </div>
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
