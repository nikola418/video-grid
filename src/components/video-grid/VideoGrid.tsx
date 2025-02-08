import { getAll, VideoInfo } from "@/api/video-infos";
import { unionBy } from "lodash";
import { Fragment, useCallback, useState } from "react";
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

  const getVideoInfos = useCallback(
    async (start: number, stop: number) => {
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
      } catch (error) {
        console.error(error);
      }
    },

    [search, selectedCategory]
  );

  return (
    <Fragment>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            itemCount={1000}
            isItemLoaded={(index) => index < videoInfos.length}
            loadMoreItems={async (startIndex, stopIndex) => {
              await getVideoInfos(startIndex, stopIndex);
            }}
          >
            {({ onItemsRendered, ref }) => {
              return (
                <div>
                  <FixedSizeGrid
                    ref={ref}
                    onItemsRendered={(props) => {
                      return onItemsRendered({
                        overscanStartIndex: props.overscanRowStartIndex,
                        overscanStopIndex: props.overscanRowStopIndex,
                        visibleStartIndex: props.visibleRowStartIndex,
                        visibleStopIndex: props.visibleRowStopIndex,
                      });
                    }}
                    columnCount={4}
                    rowCount={50}
                    columnWidth={width / 4}
                    rowHeight={height / 3}
                    height={height}
                    width={width}
                  >
                    {({ columnIndex, rowIndex, style }) => {
                      const videoIndex = rowIndex * 3 + columnIndex;
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
