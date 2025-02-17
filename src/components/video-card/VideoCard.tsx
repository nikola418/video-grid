import { Spinner } from "@/components/ui/spinner";
import { Video as VideoType } from "pexels";
import { Video } from "./video";
import { isUndefined } from "lodash";
import { Link } from "react-router";

type Props = {
  video: VideoType;
  style: React.HTMLAttributes<HTMLDivElement>["style"];
};

const VideoCard: React.FC<Props> = ({ style, video }) => {
  return (
    <div
      style={style}
      className="flex items-center justify-center overflow-hidden rounded-sm bg-slate-500/50 shadow-sm shadow-gray-700/50"
    >
      {isUndefined(video) ? (
        <div className="flex size-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <Link to={`/videos/${video.id}`} className="flex-auto">
          <Video video={video} />
          <div className="absolute bottom-0 flex w-full justify-between bg-black/30 p-2 text-white">
            <p>Title&nbsp;{video.id}</p>
            <p>{video.duration}s</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default VideoCard;
