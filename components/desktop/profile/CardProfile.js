import Link from 'next/link'
import ProgressAchievement from '@/components/desktop/dashboard/ProgressAchievement'
import IconBadgeXp from '@/components/mobiles/icons/IconBadgeXp'
import { getLevelLabel, numberWithCommas } from '@/helpers/index'
import { ChevronRight as IconChevronRight } from '@material-ui/icons'

export default function CardProfile({ profile }) {
  const { profile_picture, fullname, point, experience } = profile

  return (
    <div className="bg-white rounded-md p-3 xl:p-6 flex w-full mb-3">
      <div className='flex flex-col'>
        <div
          className="mr-5 rounded-full overflow-hidden"
          style={{ width: '120px', height: '120px' }}
        >
          <img
            src={profile_picture}
            alt={fullname}
            className="w-full h-full object-center object-cover"
          />
        </div>
        <div className='flex items-center justify-center mt-3 mr-5'>
          <Link href='/profile/edit' as='/profile/edit'>
            <a className="bg-ruby-base rounded-full px-3 pl-5 py-2 text-xs text-white font-bold flex items-center hover:text-white">
              <span>Edit Profile</span>
              <IconChevronRight size="small" color="inherit" />
            </a>
          </Link>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center flex-wrap mb-5">
          <div className="mb-3">
            <h1 className="text-xl font-bold font-title mb-2">{fullname}</h1>
            <div className="flex">
              <IconBadgeXp size="30px" xp={experience} className="mr-3" />
              <span className="text-xl font-bold text-gray-400 ">
                {getLevelLabel(experience)}
              </span>
            </div>
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
                      {numberWithCommas(point)}
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
                      {numberWithCommas(experience)}
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
          <ProgressAchievement xp={experience} />
        </div>
      </div>
    </div>
  )
}