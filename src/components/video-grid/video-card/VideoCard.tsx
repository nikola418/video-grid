import { VideoInfo } from "@/api/video-infos";
import { useRef } from "react";
import { Video } from "./video";
import styles from "./VideoCard.module.css";

type Props = {
  info: VideoInfo;
};

const VideoCard: React.FC<Props> = ({ info }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      onMouseOver={async () => {
        if (videoRef.current && videoRef.current.paused) {
          try {
            await videoRef.current.play();
          } catch {
            /* empty */
          }
        }
      }}
      onMouseOut={() => {
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
      className={styles.videoCard}
    >
      <div className={styles.video}>
        <Video videoRef={videoRef} url={info.url} />
      </div>
      <div className={styles.tagline}>
        <h4>{info.title}</h4>
        <div className={styles.info}>
          <p>
            <i>{info.desc}</i>
          </p>
          <p>{new Date(info.createdAt.toString()).toUTCString()}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
