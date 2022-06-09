import { useState, useEffect } from 'react'
import { ChevronRight as IconChevronRight } from '@material-ui/icons'
import { getMissionImage, numberWithCommas } from '@/helpers/index'

export default function SpecialCardMission({ missions }) {
  const [specials, setSpecials] = useState(null)

  //==========================================================//
  //=================== COMPONENT - HOOKS ====================//
  //==========================================================//
  useEffect(() => {
    onInitData();
  }, []);

  //=============================================================//
  //=================== COMPONENT - LISTENER ====================//
  //=============================================================//
  const onInitData = () => {
    if (typeof missions !== 'undefined' && missions != null && missions != '') {
      const specialData = missions.filter(mission => mission.is_weekly == true)
      setSpecials(specialData)
    }
  }

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
      <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 16C9.1 16 10 15.1 10 14C10 12.9 9.1 12 8 12C6.9 12 6 12.9 6 14C6 15.1 6.9 16 8 16ZM14 7H13V5C13 2.24 10.76 0 8 0C5.24 0 3 2.24 3 5V7H2C0.9 7 0 7.9 0 9V19C0 20.1 0.9 21 2 21H14C15.1 21 16 20.1 16 19V9C16 7.9 15.1 7 14 7ZM4.9 5C4.9 3.29 6.29 1.9 8 1.9C9.71 1.9 11.1 3.29 11.1 5V7H4.9V5ZM14 19H2V9H14V19Z" fill="#989EB8" />
      </svg>
    )
  }

  function renderBackground(data) {
    return !data.is_syariah ? (
      <div className="bg-ruby-light absolute inset-0 w-full h-full z-0">
        <svg
          width="98"
          height="147"
          viewBox="0 0 98 147"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ zIndex: 0 }}
          className="absolute right-0 top-0"
        >
          <path
            opacity="0.6"
            d="M128.05 106.768L74.4815 86.7369L61.2234 81.7792C56.4505 79.9944 54.3961 74.4466 56.8742 70.036L64.8591 55.8276L121.265 -44.5482C122.772 -47.2292 121.523 -50.6008 118.622 -51.6857L80.5272 -65.9308C78.1383 -66.8241 75.4462 -65.8322 74.2305 -63.6116L5.3222 62.362C4.71872 63.4399 4.18975 64.5331 3.72418 65.6375C3.36334 66.4101 3.02445 67.1992 2.71329 68.0067C-4.61865 87.0351 5.05767 108.302 24.3263 115.507C24.9227 115.73 25.5213 115.936 26.1212 116.127L26.1204 116.129L47.7 124.198L47.7068 124.18L106.267 146.078C108.12 146.771 110.208 146.018 111.175 144.309L129.772 111.437C130.763 109.686 129.948 107.478 128.05 106.768Z"
            fill="#FFE0E0"
            fillOpacity="0.9"
          />
        </svg>
      </div>
    ) : (
      <div className="bg-green-80 absolute inset-0 w-full h-full z-0">
        <svg
          width="98"
          height="147"
          viewBox="0 0 98 147"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ zIndex: 0 }}
          className="absolute right-0 top-0"
        >
          <path
            opacity="0.6"
            d="M128.05 106.768L74.4815 86.7369L61.2234 81.7792C56.4505 79.9944 54.3961 74.4466 56.8742 70.036L64.8591 55.8276L121.265 -44.5482C122.772 -47.2292 121.523 -50.6008 118.622 -51.6857L80.5272 -65.9308C78.1383 -66.8241 75.4462 -65.8322 74.2305 -63.6116L5.3222 62.362C4.71872 63.4399 4.18975 64.5331 3.72418 65.6375C3.36334 66.4101 3.02445 67.1992 2.71329 68.0067C-4.61865 87.0351 5.05767 108.302 24.3263 115.507C24.9227 115.73 25.5213 115.936 26.1212 116.127L26.1204 116.129L47.7 124.198L47.7068 124.18L106.267 146.078C108.12 146.771 110.208 146.018 111.175 144.309L129.772 111.437C130.763 109.686 129.948 107.478 128.05 106.768Z"
            fill="#D1F7CB"
          />
        </svg>
      </div>
    )
  }

  return (
    <>
      <h3 className='text-gray-600 font-extrabold text-lg mb-3'>Weekly Mission</h3>
      {specials != null && specials.map((data, index) => (
        <div key={index} className={`bg-transparent rounded-lg p-4 mb-4 border border-gray-200 relative`}>
          {renderBackground(data)}
          <div className="z-10 relative">
            <div className="flex items-center mb-3">
              <div
                className="rounded-full border-2 border-gray-100 mr-4"
                style={{ width: '45px', height: '45px' }}
              >
                <img
                  src={getMissionImage(data.flag)}
                  alt="img-daily-mission"
                  className="h-full w-auto object-cover object-center"
                />
              </div>
              <div>
                <h3 className="font-bold font-title text-ruby-base font-xl">{data.title}</h3>
                <p className="text-gray-500">{data.description}</p>
              </div>
            </div>
            <div className="flex items-center mb-3">
              <div className="bg-ruby-base rounded-full px-3 py-1 mr-2 flex">
                <div className="mr-1" style={{ width: '15px', height: 'auto', marginTop: '1px' }}>
                  <img
                    src="/icons/gold.png"
                    alt=""
                    className="w-full h-auto object-cover object-center"
                  />
                </div>
                <span className="text-xs text-gray-100">+ {numberWithCommas(data.point)} Poin</span>
              </div>
              <div className="bg-ruby-base rounded-full px-3 py-1 mr-2 flex">
                <div className="mr-1" style={{ width: '15px', height: 'auto' }}>
                  <img
                    src="/icons/xp.png"
                    alt=""
                    className="w-full h-auto object-cover object-center"
                  />
                </div>
                <span className="text-xs text-gray-100">+ {numberWithCommas(data.experience)} Xp</span>
              </div>
            </div>
            <div className="">
              {data.MissionConditions.map((item, index) => {
                return (
                  <div key={index} className="bg-white p-4 flex border border-gray-200 rounded-lg mb-3">
                    <div className="flex-auto mr-3">{renderChecklistByMission(item)}</div>
                    <div className="w-full flex items-center">
                      <span className="font-semibold">{item.title}</span>
                    </div>
                    <div className="w-1/12 text-ruby-base flex items-center">
                      <IconChevronRight color="inherit" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}