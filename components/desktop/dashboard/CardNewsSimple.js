import moment from 'moment'
import { parseTimeAgo } from '@/helpers/index'

export default function CardNewsSimple({ item }) {
  return (
    <div
      className={`w-full h-full rounded-lg bg-white border border-gray-300 overflow-hidden`}
    >
      <div style={{ height: '185px' }} className="mb-3">
        <img
          src={item.image}
          alt="thumbnail-news"
          className="h-full w-full object-center object-cover"
        />
      </div>
      <div className="px-3 text-left">
        <div className="text-ruby-base font-semibold text-sm">{item.category}</div>
        <div className="font-semibold mb-3">{item.title}</div>
        <div className="text-sm text-gray-400 font-semibold mb-3">
          {parseTimeAgo(moment(item.created_at).unix() * 1000)}
        </div>
      </div>
    </div>
  )
}