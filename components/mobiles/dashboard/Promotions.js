import { Swiper, SwiperSlide } from 'swiper/react'
import Skeleton from 'react-loading-skeleton'

import Link from 'next/link';

export default function Promotions({ promos }) {

  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={30}
      freeMode={true}
      centeredSlides={true}
    >
      {promos.map((promo, index) => (
        <SwiperSlide key={index} style={{ width: '80%' }}>
          <Link href={promo.url} passHref>
            <a className="w-full h-full" target="_blank" rel="noopener noreferrer">
              <img
                src={promo.picture || <Skeleton />}
                alt={promo.title}
                className="w-full h-42 object-cover object-center rounded-lg shadow-md"
              />
            </a>
          </Link>
        </SwiperSlide>
      ))}

    </Swiper>
  )
}