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
                <FixedSizeGrid
                  ref={ref}
                  onItemsRendered={(props) => {
                    return onItemsRendered({
                      overscanStartIndex: 1,
                      overscanStopIndex: 1,
                      visibleStartIndex: props.visibleRowStartIndex,
                      visibleStopIndex: props.visibleRowStopIndex,
                    });
                  }}
                  columnCount={3}
                  rowCount={6}
                  columnWidth={400}
                  rowHeight={400}
                  height={height}
                  width={width}
                >
                  {({ columnIndex, rowIndex, style }) => {
                    const videoIndex = rowIndex * 3 + columnIndex;
                    if (videoIndex >= videoInfos.length) return null;

                    return (
                      <div style={style}>
                        <VideoCard info={videoInfos[videoIndex]} />
                      </div>
                    );
                  }}
                </FixedSizeGrid>
              );
            }}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </Fragment>
  );
};

export default VideoGrid;
