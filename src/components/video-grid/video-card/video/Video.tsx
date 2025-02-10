import { useRef } from "react";
import style from "./Video.module.css";
import "./Video.module.css";

export type Props = {
  url: string;
};

const Video: React.FC<Props> = ({ url }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <video
      onMouseOver={async () => {
        if (videoRef.current && videoRef.current.paused) {
          try {
            await videoRef.current.play();
          } catch (error) {
            console.log(error);
          }
        }
      }}
      onMouseOut={() => {
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
      onLoadStart={(e) => console.log("loading")}
      ref={videoRef}
      width="100%"
      height="100%"
      preload="none"
      poster="/bbb.jpg"
      className={style.video}
      playsInline
      loop
      muted
    >
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
