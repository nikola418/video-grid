import { getAll, VideoInfo } from "@/api/video-infos";
import { useElementOnScreen } from "@/hooks";
import { debounce, merge, unionBy } from "lodash";
import { useEffect, useState } from "react";
import { VideoCard } from "./video-card";
import styles from "./VideoGrid.module.css";

const perPage = 4;

type Props = {
  search: string;
  selectedCategory?: string;
};

const VideoGrid: React.FC<Props> = ({ search, selectedCategory }) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [videoInfos, setVideoInfos] = useState<VideoInfo[]>([]);
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });

  useEffect(() => {
    const getVideoInfos = async () => {
      setIsLoading(true);

      const debounced = debounce(async () => {
        try {
          const { data, next } = await getAll({
            page,
            perPage,
            search,
            category: selectedCategory,
          });
          setVideoInfos((prev) =>
            unionBy(prev, data, "id").sort((a, b) => a.createdAt - b.createdAt)
          );
          if (next !== null) {
            setHasMore(true);
          } else {
            setHasMore(false);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }, 1000);
      debounced();
    };

    getVideoInfos();
  }, [page, search, selectedCategory]);

  useEffect(() => {
    //* Optimistic
    setVideoInfos([]);
    setPage(1);
  }, [search, selectedCategory]);

  useEffect(() => {
    if (isVisible && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, isVisible]);

  return (
    <div>
      <div className={styles.grid}>
        {videoInfos?.map((info, i) => {
          return <VideoCard key={i} info={info} />;
        })}
      </div>
      {isLoading === true && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p>Loading ...</p>
        </div>
      )}
      <div ref={containerRef}></div>
    </div>
  );
};

export default VideoGrid;
