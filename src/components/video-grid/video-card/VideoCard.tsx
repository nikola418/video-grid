import { Video as VideoType } from "pexels";
import styles from "./VideoCard.module.css";
import { Video } from "./video";

type Props = {
  isLoading: () => boolean;
  width: number;
  height: number;
  video: VideoType;
  style: React.HTMLAttributes<HTMLDivElement>["style"];
};

const VideoCard: React.FC<Props> = ({ style, width, height, video }) => {
  return (
    <div
      style={{
        ...style,
        left: style.left + 48,
        top: style.top + 48,
        width: style.width - 96,
        height: style.height - 96,
      }}
      className={styles.videoCard}
    >
      <div className={styles.video}>
        <Video video={video} />
        <p style={{ position: "absolute", bottom: 0, paddingLeft: 12 }}>
          {video.duration}s
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
