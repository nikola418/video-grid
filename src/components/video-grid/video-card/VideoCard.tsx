import { Video as VideoType } from "pexels";
import styles from "./VideoCard.module.css";
import { Video } from "./video";

type Props = {
  isLoading: () => boolean;
  video: VideoType;
  style: React.HTMLAttributes<HTMLDivElement>["style"];
};

const VideoCard: React.FC<Props> = ({ style, video }) => {
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
        <Video video={video} />
        <div className={`row justify-content-space-between ${styles.tagline}`}>
          <p style={{ margin: "6px" }}>Title</p>
          <p style={{ margin: "6px" }}>{video.duration}s</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
