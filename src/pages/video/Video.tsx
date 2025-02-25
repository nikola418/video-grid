import { getOne } from "@/api/videos/getOne";
import { Spinner } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import VideoSlide from "./VideoSlide";

const Video: FC = () => {
  const { videoId } = useParams();
  const { isPending, data } = useQuery({
    queryKey: [`/videos/${videoId}`],
    queryFn: async () => {
      if (videoId) {
        return getOne(videoId);
      }
    },
  });

  return (
    <section className="p-2">
      <h2 className="my-2 text-2xl font-bold">Title {data?.id}</h2>
      {isPending ? (
        <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
          <Spinner className="white size-40" />
        </div>
      ) : (
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {data?.video_files.map((video) => (
            <SwiperSlide key={video.id}>
              <VideoSlide videoFile={video} preload="auto" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default Video;
