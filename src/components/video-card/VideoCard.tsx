import type { Video as VideoType } from "pexels";
import { Link } from "react-router";
import { Video } from "./video";
import React from "react";
import { PropsWithChildren } from "react";
import { FC } from "react";

type Props = {
  id: number;
  videoFile?: VideoType["video_files"][0];
  videoPicture?: VideoType["video_pictures"][0];
  duration: number;
  style?: React.HTMLAttributes<HTMLDivElement>["style"];
};

const VideoCard: FC<PropsWithChildren<Props>> = ({
  style,
  id,
  duration,
  videoFile,
  videoPicture,
  children,
}) => {
  return (
    <div
      style={style}
      className="flex items-center justify-center overflow-hidden rounded-sm bg-slate-500/50 shadow-sm shadow-gray-700/50"
    >
      <Link to={`/videos/${id}`} className="flex-auto">
        {children}
        <Video videoFile={videoFile} videoPicture={videoPicture?.picture} />
        <div className="absolute bottom-0 flex w-full justify-between bg-black/30 p-2 text-white">
          <p>Title&nbsp;{id}</p>
          <p>{duration}s</p>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
