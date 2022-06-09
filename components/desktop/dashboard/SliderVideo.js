import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import { PlayCircleFilledWhite as IconPlayCircleFilledWhite } from '@material-ui/icons'
import { Modal } from 'antd'
import { parseThumbnailYoutube, parseEmbedYoutube } from '@/helpers/index'
import Skeleton from 'react-loading-skeleton'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default function SliderVideo({ videos }) {
  const [selectedVideo, setSelectedVideo] = useState(null)

  return (
    <>
      <Swiper
        modules={[Pagination, Navigation]}
        slidesPerView={'auto'}
        spaceBetween={30}
        centeredSlides={false}
        pagination={{
          clickable: false,
        }}
        navigation={true}
        className="video-slider-desktop"
      >
        {videos.map((item, index) => {
          return (
            <SwiperSlide key={index} style={{ width: '400px', height: '286px' }}>
              <div
                className="w-full h-full text-xs relative text-gray-100 cursor-pointer rounded-md overflow-hidden"
                onClick={() => setSelectedVideo(item)}
              >
                <img
                  src={parseThumbnailYoutube(item.url) || <Skeleton />}
                  alt={item.title}
                  className="w-full h-full object-center object-cover opacity-95"
                />
                <IconPlayCircleFilledWhite
                  className="absolute inset-0 mx-auto my-auto shadow-md"
                  color="inherit"
                  fontSize="large"
                />
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      {selectedVideo && (
        <Modal
          visible={!!selectedVideo}
          title=""
          onCancel={() => setSelectedVideo(null)}
          footer={null}
        >
          <>
            <div className="py-5">
              <iframe
                width="100%"
                height="400"
                src={parseEmbedYoutube(selectedVideo.url)}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </>
        </Modal>
      )}
    </>
  )
}