import Link from 'next/link'
import { getBadgeIconDesktop } from '@/helpers/index'

export default function CardMedal({ medals }) {

  function renderChecklistByMission(mission) {
    return mission.is_complete ? (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
          fill="#C7ECC1"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 18.6004C15.6451 18.6004 18.6 15.6455 18.6 12.0004C18.6 8.35531 15.6451 5.40039 12 5.40039C8.35495 5.40039 5.40002 8.35531 5.40002 12.0004C5.40002 15.6455 8.35495 18.6004 12 18.6004Z"
          fill="#64CA51"
        />
        <path
          d="M9.1001 12.1828L10.9205 14.0126C10.9594 14.0517 11.0225 14.0519 11.0617 14.0132L14.8667 10.25"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ) : (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
          fill="#E7E7F0"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 18.6004C15.6451 18.6004 18.6 15.6455 18.6 12.0004C18.6 8.35531 15.6451 5.40039 12 5.40039C8.35495 5.40039 5.40002 8.35531 5.40002 12.0004C5.40002 15.6455 8.35495 18.6004 12 18.6004Z"
          fill="#9CA4AC"
        />
      </svg>
    )
  }

  return (
    <>
      {medals.map((medal, index) => (
        <div key={index} className='bg-white rounded-lg overflow-hidden flex flex-col'>
          <div className="p-2 flex justify-center">
            <div
              style={{ height: '80px', width: '80px' }}
              className="mt-3"
            >
              <img
                src={getBadgeIconDesktop(medal.flag)}
                alt={medal.title}
                className="w-full h-full object-cover object-center rounded-full"
              />
            </div>
          </div>
          <div className="p-3 flex flex-col justify-between">
            <div className='mb-2'>
              <h3 className="font-bold mb-3 text-gray-800 text-lg text-center">
                {medal.title}
              </h3>
              <p className="text-gray-500 text-md text-center">
                Misi yang harus diselesaikan
              </p>
            </div>
            <div>
              {medal.MedalConditions.map((item, index) => {
                return (
                  <div key={index} className="p-2 flex">
                    <div className="flex-auto mr-3">{renderChecklistByMission(item)}</div>
                    <div className="w-full flex items-center">
                      <span className="font-semibold">{item.title}</span>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-center py-2">
              <Link href={`/medal/[flag]?flag=${medal.flag}`}>
                <a
                  className="bg-ruby-base w-full py-2 text-center text-gray-100 rounded-sm font-extrabold text-md rounded-full hover:text-white"
                >
                  Lihat Detail
                </a>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}