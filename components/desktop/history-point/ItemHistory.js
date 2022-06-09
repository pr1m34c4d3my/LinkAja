import moment from 'moment'
import { parseTimeAgo, parseTimeAgoMini } from '@/helpers/index'

export default function ItemHistory({ item }) {
  return (
    <div className="p-4 border-b border-gray-100">
      <div className="flex flex-row items-center">
        <div className='hidden lg:block xl:block lg:w-1/12 xl:w-1/12'>
          <div className="text-left">
            <svg width="45" height="25" viewBox="0 0 45 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40.125 0.75H4.87504C2.72087 0.75 0.958374 2.5125 0.958374 4.66667V20.3333C0.958374 22.4875 2.72087 24.25 4.87504 24.25H40.125C42.2792 24.25 44.0417 22.4875 44.0417 20.3333V4.66667C44.0417 2.5125 42.2792 0.75 40.125 0.75ZM20.5417 14.4583H14.6667V20.3333H10.75V14.4583H4.87504V10.5417H10.75V4.66667H14.6667V10.5417H20.5417V14.4583ZM29.3542 18.375C27.7288 18.375 26.4167 17.0629 26.4167 15.4375C26.4167 13.8121 27.7288 12.5 29.3542 12.5C30.9796 12.5 32.2917 13.8121 32.2917 15.4375C32.2917 17.0629 30.9796 18.375 29.3542 18.375ZM37.1875 12.5C35.5621 12.5 34.25 11.1879 34.25 9.5625C34.25 7.93708 35.5621 6.625 37.1875 6.625C38.813 6.625 40.125 7.93708 40.125 9.5625C40.125 11.1879 38.813 12.5 37.1875 12.5Z" fill="#BDBDBD" />
            </svg>
          </div>
        </div>
        <div className='w-7/12'>
          <div className='text-left font-extrabold text-gray-600'>{item.description}</div>
        </div>
        <div className='w-1/12'>
          <div className="text-left text-green-300 font-bold">
            <div className='hidden md:block lg:block xl:block'>
              {`+ ${item.point}`} Poin
            </div>
            <div className='block md:hidden lg:hidden xl:hidden'>
              {`+ ${item.point}`}
            </div>
          </div>
        </div>
        <div className='w-3/12'>
          <div className="text-right">
            <div className='hidden md:block lg:block xl:block'>{moment(item.created_at).format('dddd, DD MMMM YYYY')}</div>
            <div className='block md:hidden lg:hidden xl:hidden'>{parseTimeAgo(new Date(item.created_at))}</div>
          </div>
        </div>
      </div>
    </div>
  )
}