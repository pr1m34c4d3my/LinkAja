import { Swiper, SwiperSlide } from 'swiper/react'
import Skeleton from 'react-loading-skeleton'

export default function Promotions({ promos }) {

  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={30}
      className="mySwiper"
      freeMode={true}
    >
      {promos.map((promo, index) => (
        <SwiperSlide key={index} style={{ width: '80%' }}>
          <div className="w-full h-full">
            <img
              src={promo.picture}
              alt={promo.title}
              className="w-full h-42 object-cover object-center rounded-lg shadow-md"
            />
          </div>

        </SwiperSlide>
      ))}

    </Swiper>
  )
}