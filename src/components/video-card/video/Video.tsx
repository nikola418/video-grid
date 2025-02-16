import { Spinner } from "@/components/ui/spinner";
import { first } from "lodash";
import { Video as VideoType } from "pexels";
import { useRef, useState } from "react";

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
      className="relative h-full w-full"
    >
      <video
        ref={videoRef}
        width="100%"
        height="100%"
        preload="none"
        poster={videoPicture}
        className="block object-cover"
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
