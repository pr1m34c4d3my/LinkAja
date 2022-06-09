import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import moment from 'moment'
import { parseTimeAgo } from '@/helpers/index'
import 'swiper/css'
import 'swiper/css/pagination'

export default function SliderUpdatedNews({
  news,
}) {
  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={10}
      className="mySwiper"
      freeMode={true}>
      {news != null && news.length > 0 &&
        news.map((item, index) => {
          return (
            <SwiperSlide key={`news-recent-${index.toString()}`} style={{ width: '95%' }}>
              <Link href={`/news/[slug]?slug=${item.slug}`} as={`/news/${item.slug}`}>
                <a className="block">
                  <div className="w-full h-full rounded-lg bg-white border border-gray-300 overflow-hidden">
                    <div style={{ height: '240px' }} className="mb-3">
                      <img
                        src={item.image}
                        alt="thumbnail-news"
                        className="h-full w-full object-center object-cover" />
                    </div>
                    <div className="px-3 text-left">
                      <div className="text-ruby-base font-semibold text-sm">{item.category}</div>
                      <div className="font-semibold mb-3">{item.title}</div>
                      <div className="text-sm text-gray-400 font-semibold mb-3">
                        {parseTimeAgo(moment(item.created_at).unix() * 1000)}
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </SwiperSlide>
          )
        })
      }
    </Swiper>
  )
}