import { useState, useEffect } from 'react'
import { ChevronRight as IconChevronRight } from '@material-ui/icons'
import { get } from 'lodash'
import Skeleton from 'react-loading-skeleton'

export default function CardMission({ missions }) {

  const [mission, setMission] = useState(null);

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
      let arrayMission = [];

      missions.map((item, index) => {
        if (item.flag === 'CEK_AJA') arrayMission.push(item);
        else if (item.flag === 'BERGAUL_AJA') arrayMission.push(item);
        else if (item.flag === 'MAIN_AJA') arrayMission.push(item);
      });

      setMission(arrayMission);
    }
  }

  //=============================================================//
  //=================== COMPONENT - FUNCTION ====================//
  //=============================================================//
  const getIconPath = (flag) => {
    if (flag == 'CEK_AJA') return `/icons/daily-mission/cek-aja.png`;
    else if (flag == 'BERGAUL_AJA') return `/icons/daily-mission/bergaul-aja.png`;
    else if (flag == 'MAIN_AJA') return `/icons/daily-mission/main-aja.png`;
  }

  //==========================================================//
  //=================== COMPONENT - RENDER ===================//
  //==========================================================//
  function renderBackground() {
    return (
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
    )
  }

  const _renderMission = () => {
    return (
      <>
        {mission != null && mission.length > 0 &&
          mission.map((item, index) => {
            return (
              <div key={index} className={`bg-transparent rounded-lg p-4 h-full border border-gray-200 relative overflow-hidden`}>
                {renderBackground()}
                <div className="z-10 relative">
                  <div className="flex items-center mb-3">
                    <div
                      className="rounded-full border-2 border-gray-100 mr-4"
                      style={{ width: '45px', height: '45px' }}
                    >
                      <img
                        src={getIconPath(item.flag)}
                        alt={item.description}
                        className="h-full w-auto object-cover object-center"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold font-title text-ruby-base font-xl">{item.title}</h3>
                      <p className="text-gray-500">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-ruby-base rounded-full px-3 py-1 mr-2 flex">
                      <div className="mr-1" style={{ width: '15px', height: 'auto', marginTop: '1px' }}>
                        <img
                          src="/icons/gold.png"
                          alt=""
                          className="w-full h-auto object-cover object-center"
                        />
                      </div>
                      <span className="text-xs text-gray-100">+ {item.point} Poin</span>
                    </div>
                    <div className="bg-ruby-base rounded-full px-3 py-1 mr-2 flex">
                      <div className="mr-1" style={{ width: '15px', height: 'auto' }}>
                        <img
                          src="/icons/xp.png"
                          alt=""
                          className="w-full h-auto object-cover object-center"
                        />
                      </div>
                      <span className="text-xs text-gray-100">+ {item.experience} Xp</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </>
    )
  }

  return (
    <>
      {mission ? _renderMission() : <Skeleton height={30} />}
    </>
  )
}