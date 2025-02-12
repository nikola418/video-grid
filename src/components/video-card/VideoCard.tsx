import { Video as VideoType } from "pexels";
import styles from "./VideoCard.module.css";
import { Video } from "./video";
import { Spinner } from "@/components/spinner";

type Props = {
  isItemLoaded: boolean;
  video: VideoType;
  style: React.HTMLAttributes<HTMLDivElement>["style"];
  index: number;
};

const VideoCard: React.FC<Props> = ({ isItemLoaded, style, video, index }) => {
  return (
    <div
      style={{
        ...style,
        left: (style?.left as number) + 48,
        top: (style?.top as number) + 48,
        width: (style?.width as number) - 96,
        height: (style?.height as number) - 96,
      }}
      className={styles.videoCard}
    >
      <div className={styles.video}>
        {!isItemLoaded ? (
          <div
            style={{ width: "100%", height: "100%" }}
            className="row justify-content-center align-items-center"
          >
            <Spinner />
          </div>
        ) : (
          <>
            <Video video={video} />
            <div
              className={`row justify-content-space-between ${styles.tagline}`}
            >
              <p style={{ margin: "6px" }}>Title&nbsp;{index}</p>
              <p style={{ margin: "6px" }}>{video.duration}s</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
