import Link from 'next/link'
import { parseTimeAgo } from "@/helpers/index"
import moment from 'moment'
import Skeleton from 'react-loading-skeleton'

export default function OtherNews({ news }) {
  return (
    <Link href={`/news/[slug]?slug=${news.slug}`} as={`/news/${news.slug}`}>
      <a className="block flex justify-between items-start w-full py-2">
        <div className="w-2/12 mr-1.5 rounded-md">
          <img
            className="block w-full h-20 rounded-md border border-pearlheavy object-center object-cover"
            src={news.image || <Skeleton />}
            alt=""
          />
        </div>
        <div className="flex-1 ml-1.5">
          <div className="text-ruby-base font-semibold text-sm">
            {news.category || <Skeleton />}
          </div>
          <div className="font-semibold mb-2 text-sm">{news.title}</div>
          <div className="text-sm text-gray-400 font-semibold">
            {parseTimeAgo(moment(news.created_at).unix() * 1000)}
          </div>
        </div>
      </a>
    </Link>

  )
}