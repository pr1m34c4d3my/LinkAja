import Link from 'next/link'
import { parseTimeAgo } from '@/helpers/index'
import {
  Reply as IconReply,
  Comment as IconComment,
  MoreHoriz as IconMoreHoriz,
  RemoveRedEye as IconRemovedRedEye,
} from '@material-ui/icons'

export default function CardNews({ data }) {

  function handleOptionClick() {

  }

  return (
    <div className="bg-white p-4 border border-gray-200">
      <div className="flex items-center mb-3">
        <div className="flex flex-wrap items-center w-11/12">
          <div className="rounded-full w-10/12" style={{ height: '45px', width: '45px' }}>
            <img
              className="w-full h-auto object-cover object-center"
              src={data.user.imgPath}
              alt="avatar"
            />
          </div>
          <div className="w-10/12 px-2">
            <h3 className="font-bold text-base">{data.user.name}</h3>
            <p className="text-gray-400 text-xs">
              {parseTimeAgo(new Date())}
            </p>
          </div>
        </div>
        <div className="w-1/12 text-right">
          <div className="cursor-pointer text-gray-600" onClick={handleOptionClick}>
            <IconMoreHoriz size="16" />
          </div>
        </div>
      </div>
      <div className="w-full mb-3" style={{ height: '175px' }}>
        <img
          src={data.thumbnailPath}
          alt="thumbnail"
          className="w-full h-full object-center object-cover"
        />
      </div>
      <h3 className="text-lg font-bold mb-4">{data.title}</h3>
      <p className="text-xs text-gray-500 text-justify mb-3">{data.summary}</p>
      <div className="mb-4">
        <Link href="/">
          <a className="text-ruby-base underline">Lihat Selengkapnya</a>
        </Link>
      </div>
      <div className="flex justify-between">
        <div className="flex">
          <div className="flex items-center text-gray-700 text-sm mr-3">
            <div className="text-gray-400 mr-1">
              <IconComment style={{ fontSize: 16 }} color="inherit" />
            </div>
            <p>{data.totalComment}</p>
          </div>
          <div className="flex items-center text-gray-700 text-sm">
            <div className="text-gray-400 mr-1">
              <IconReply style={{ fontSize: 16 }} color="inherit" />
            </div>
            <p>{data.totalShare}</p>
          </div>
        </div>
        <div className="flex items-center text-gray-700 text-sm">
          <div className="text-gray-400 mr-1">
            <IconRemovedRedEye style={{ fontSize: 16 }} color="inherit" />
          </div>
          <p>{data.totalShare}</p>
        </div>
      </div>
    </div>
  )
}