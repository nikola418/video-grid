import { Video } from "@/components";
import type { Video as VideoType } from "pexels";
import { FC } from "react";

type Props = {
  videoFile: VideoType["video_files"][0];
  preload?: string;
};

const VideoSlide: FC<Props> = ({ videoFile, preload }) => (
  <div className="flex items-center justify-center overflow-hidden rounded-sm bg-slate-500/50 shadow-sm shadow-gray-700/50">
    <Video videoFile={videoFile} preload={preload} />
    <div className="absolute bottom-0 flex w-full justify-between bg-black/30 p-2 text-white">
      <p>{videoFile.quality}</p>
      <p>
        {videoFile.height}x{videoFile.width}
      </p>
    </div>
  </div>
);

export default VideoSlide;
