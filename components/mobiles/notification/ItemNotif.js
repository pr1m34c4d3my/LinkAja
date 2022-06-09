import Link from 'next/link'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

export default function ItemNotif({ notif }) {
  TimeAgo.addDefaultLocale(en)

  const timeAgo = new TimeAgo('en-US')

  return (
    <>
      <Link href='/'>
        <a>
          <div className={`${notif.is_read == 0 ? 'bg-gray-50' : 'bg-white'
            } border-gray-200 hover:bg-white border-b p-3`}>
            <div className="flex justify-center items-center">
              <div className="px-2">
                <svg width="24" height="24" viewBox="0 0 1792 1792" fill="#44C997" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
                </svg>
              </div>
              <div className="ml-2 mr-6">
                <span className="font-semibold text-gray-700 text-ms">{notif.description}</span>
                <span className="block text-gray-500 text-xs font-normal">{notif.description}</span>
              </div>
              <div className='ml-1'>
                <span className='text-xs text-gray-300 font-normal'>{timeAgo.format(new Date(notif.created_at), 'mini')}</span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </>
  )
}