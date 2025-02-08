import { useRef } from "react";
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
      ref={videoRef}
      width="100%"
      height="100%"
      style={{ objectFit: "contain", display: "block" }}
      src={`${import.meta.env.VITE_API_URL}/${url}`}
      poster="/bbb.jpg"
      playsInline
      preload="auto"
      loop
      muted
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
