import { Spinner } from "@/components/ui/spinner";
import { Video as VideoType } from "pexels";
import { Video } from "./video";
import { isUndefined } from "lodash";

type Props = {
  video: VideoType;
  style: React.HTMLAttributes<HTMLDivElement>["style"];
};

const VideoCard: React.FC<Props> = ({ style, video }) => {
  return (
    <div
      style={style}
      className="overflow-hidden rounded-sm bg-slate-500 shadow-md shadow-gray-500"
    >
      <div className="h-full w-full">
        {isUndefined(video) ? (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            <Video video={video} />
            <div className="absolute bottom-0 flex w-full justify-between bg-black/30 p-2 text-white">
              <p>Title&nbsp;{video.id}</p>
              <p>{video.duration}s</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
