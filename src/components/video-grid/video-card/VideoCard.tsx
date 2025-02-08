import { VideoInfo } from "@/api/video-infos";
import { Video } from "./video";
import styles from "./VideoCard.module.css";

type Props = {
  info: VideoInfo;
};

const VideoCard: React.FC<Props> = ({ info }) => {
  return (
    <div className={styles.videoCard}>
      <div className={styles.video}>
        <Video url={info.url} />
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
