import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import { PlayCircleFilledWhite as IconPlayCircleFilledWhite } from '@material-ui/icons'
import { parseThumbnailYoutube } from '@/helpers/index'
import Skeleton from 'react-loading-skeleton'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default function SliderVideo({ videos }) {

  return (
    <Swiper
      modules={[Pagination, Navigation]}
      slidesPerView={2}
      spaceBetween={34}
      freeMode={true}
      centeredSlides={true}
      pagination={{
        clickable: true,
      }}
      className="video-slider"
    >
      {videos.map((video, index) => {
        return (
          <SwiperSlide key={index} style={{ width: '95%' }}>
            <div
              className="w-full h-full text-xs relative text-gray-100 cursor-pointer rounded-md overflow-hidden"
            >
              <Link href={video.url}>
                <a>
                  <img
                    src={parseThumbnailYoutube(video.url) || <Skeleton />}
                    alt={video.title}
                    width='100%'
                    className="w-full h-full object-center object-cover opacity-95"
                  />

                  <IconPlayCircleFilledWhite
                    className="absolute inset-0 mx-auto my-auto shadow-md w-5 h-5"
                    color="inherit"
                    fontSize="large"
                  />
                </a>
              </Link>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper >
  )
}