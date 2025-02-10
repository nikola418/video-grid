import { Spinner } from "@/components/spinner";
import { first } from "lodash";
import { Video as VideoType } from "pexels";
import { useRef, useState } from "react";
import "./Video.module.css";
import styles from "./Video.module.css";

export type Props = {
  video: VideoType;
};

const Video: React.FC<Props> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoFile = first(video.video_files);
  const videoPicture = video.image;
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div
      onPlay={() => {
        if (!isVideoLoaded) setIsVideoLoading(true);
      }}
      onLoadedData={() => {
        setIsVideoLoading(false);
        setIsVideoLoaded(true);
      }}
      onMouseEnter={async () => {
        if (videoRef.current && videoRef.current.paused) {
          try {
            await videoRef.current.play();
          } catch (error) {
            console.log(error);
          }
        }
      }}
      onMouseLeave={() => {
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
      className={styles.container}
    >
      <video
        ref={videoRef}
        width="100%"
        height="100%"
        preload="none"
        poster={videoPicture}
        className={styles.video}
        playsInline
        loop
        muted
      >
        <source src={videoFile?.link} type={videoFile?.file_type} />
        Your browser does not support the video tag.
      </video>
      {
        <div className={styles.spinnerContainer}>
          {isVideoLoading === true && <Spinner />}
        </div>
      }
    </div>
  );
};

export default Video;
