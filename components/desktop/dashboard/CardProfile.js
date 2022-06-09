import Link from 'next/link'
import ProgressAchievement from '@/components/desktop/dashboard/ProgressAchievement'
import IconBadgeXp from '@/components/mobiles/icons/IconBadgeXp'
import { getLevelLabel, numberWithCommas } from '@/helpers/index'
import Skeleton from 'react-loading-skeleton'

export default function CardProfile({ profile }) {
  const { profile_picture, fullname, point, experience } = profile

  return (
    <div className="bg-white rounded-xl p-3 xl:p-6 flex w-full mb-3">
      <div
        className="mr-5 overflow-hidden"
      >
        {profile ?
          <img
            src={profile_picture}
            alt={fullname}
            className="inline-block object-cover h-28 w-28 rounded-full ring-2 ring-white mr-3"
          /> : <Skeleton circle={true} height={100} width={100} />
        }

      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center flex-wrap mb-5">
          <div className="mb-3">
            <h1 className="text-xl font-bold font-title mb-2">{profile ? fullname : <Skeleton count={1} />}</h1>
            {profile ?
              <div className="flex">
                <IconBadgeXp size="30px" xp={point} className="mr-3" />
                <span className="text-xl font-bold text-gray-400 ">
                  {getLevelLabel(point)}
                </span>
              </div> : <Skeleton count={2} />
            }
          </div>
          <div className="bg-gray-50 rounded-lg border border-gray-200 relative">
            <div className="flex flex-between p-4 items-center">
              <div className="pr-4 flex">
                <div
                  className="flex justify-center items-center bg-gray-200 rounded-lg mr-3"
                  style={{ width: '40px', height: '40px' }}
                >
                  <div className="h-auto" style={{ width: '23px' }}>
                    <img
                      src="/icons/gold.png"
                      alt=""
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div>
                  <div className="">
                    <span className="text-xs font-bold mr-2">
                      {profile ? numberWithCommas(point) : <Skeleton count={1} />}
                    </span>
                    <span className="text-xs font-normal">Point</span>
                  </div>
                  <div>
                    <Link href='/hadiah' as='/hadiah'>
                      <a>
                        <span className="text-ruby-base font-bold text-xs">
                          Tukar Point
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="pl-4 flex border-l border-gray-200">
                <div
                  className="flex justify-center items-center bg-gray-200 rounded-lg mr-3"
                  style={{ width: '40px', height: '40px' }}
                >
                  <div className="h-auto" style={{ width: '23px' }}>
                    <img
                      src="/icons/xp.png"
                      alt=""
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div>
                  <div className="">
                    <span className="text-xs font-bold mr-2">
                      {profile ? numberWithCommas(experience) : <Skeleton count={1} />}
                    </span>
                    <span className="text-xs font-normal">XP</span>
                  </div>
                  <div>
                    <Link href={`/medal`} as={`/medal`}>
                      <a>
                        <span className="text-ruby-base font-bold text-xs">
                          Tukar Xp
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {profile ? <ProgressAchievement xp={experience} /> : <Skeleton height={10} />}
        </div>
      </div>
    </div>
  )
}