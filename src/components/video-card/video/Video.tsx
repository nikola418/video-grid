import { Spinner } from "@/components/ui/spinner";
import { Video as VideoType } from "pexels";
import { useRef, useState } from "react";

export type Props = {
  videoFile?: VideoType["video_files"][0];
  videoPicture?: string;
  preload?: React.MediaHTMLAttributes<HTMLVideoElement>["preload"];
};

const Video: React.FC<Props> = ({
  videoFile,
  videoPicture,
  preload = "none",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
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
      onPointerEnter={async () => {
        if (videoRef.current && videoRef.current.paused) {
          try {
            await videoRef.current.play();
          } catch (error) {
            console.log(error);
          }
        }
      }}
      onPointerLeave={() => {
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
      className="relative size-full"
    >
      <video
        ref={videoRef}
        preload={preload}
        poster={videoPicture}
        className="block aspect-video size-full object-cover"
        playsInline
        loop
        muted
      >
        <source src={videoFile?.link} type={videoFile?.file_type} />
        Your browser does not support the video tag.
      </video>
      {
        <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
          {isVideoLoading === true && <Spinner />}
        </div>
      }
    </div>
  );
};

export default Video;
