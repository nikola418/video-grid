export type Props = {
  url: string;
  videoRef: React.RefObject<HTMLVideoElement | null>;
};

const Video: React.FC<Props> = ({ videoRef, url }) => {
  return (
    <video
      ref={videoRef}
      width="100%"
      height="100%"
      style={{ objectFit: "contain", display: "block" }}
      playsInline
      src={url}
      onLoad={(e) => {
        console.log("loading");
      }}
      loop
      muted
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
