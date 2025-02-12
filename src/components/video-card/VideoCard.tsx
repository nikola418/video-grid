import { Spinner } from "@/components/spinner";
import { Video as VideoType } from "pexels";
import styles from "./VideoCard.module.css";
import { Video } from "./video";
import { isUndefined } from "lodash";

type Props = {
  video: VideoType;
  style: React.HTMLAttributes<HTMLDivElement>["style"];
};

const VideoCard: React.FC<Props> = ({ style, video }) => {
  return (
    <div style={style} className={styles.videoCard}>
      <div className={styles.video}>
        {isUndefined(video) ? (
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
              <p style={{ margin: "6px" }}>Title&nbsp;{video.id}</p>
              <p style={{ margin: "6px" }}>{video.duration}s</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
