import Link from 'next/link'
import IconBadgeXp from '@/components/mobiles/icons/IconBadgeXp'
import ProgressAchievement from '@/components/mobiles/dashboard/ProgressAchievement'
import { numberWithCommas, getLevelLabel } from '@/helpers/index'


export default function HeroProfile({ profile }) {

  const { fullname, experience, point, profile_picture, Medal } = profile

  return (
    <div className="bg-gradient-to-t from-carbon-light to-white w-full p-4">
      <div className="flex flex-wrap justify-between items-center mb-3 relative pt-3">
        <div className="absolute right-0 mr-3" style={{ height: '68px' }}>
          <img
            src="/images/mobiles/dashboard.png"
            alt=""
            className="h-full w-auto object-cover object-center"
          />
        </div>
        <div className="flex flex-wrap items-center">
          <Link href={`/mobiles/profile`} as={`/profile`}>
            <a
              aria-label="avatar"
              className="bg-gray-150 rounded-full mr-3 relative flex justify-center items-center shadow"
              style={{ width: 48, height: 48 }}>
              {(profile_picture != null) && <img src={profile_picture} className='inline-block object-cover h-12 w-12 rounded-full ring-2 ring-white' />}
              {(profile_picture == null) && <img src={`/images/mobiles/ic-avatar-default.png`} className='rounded-full' />}
            </a>
          </Link>
          <div>
            <h3 className="text-base font-semibold mr-2 text-gray-900">
              Hi, {fullname}
            </h3>
            <Link href={`/mobiles/medal/[flag]?flag=${Medal.flag}`} as={`/medal/${Medal.flag}`}>
              <a className="flex">
                <IconBadgeXp xp={experience} size="20px" className="mr-2" />
                <span className="text-gray-500 font-semibold">
                  {getLevelLabel(experience)}
                </span>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg border border-gray-200 relative">
        <div className="grid grid-cols-2 gap-3 px-4 py-2">
          <div className="p-3 flex">
            <div
              className="flex justify-center items-center bg-gray-200 rounded-lg mr-3"
              style={{ width: '40px', height: '40px' }}
            >
              <div className="h-auto" style={{ width: '23px' }}>
                <img src="/icons/gold.png" alt="" className="w-full h-auto" />
              </div>
            </div>
            <div>
              <div className="">
                <span className="text-xs font-bold mr-2">{numberWithCommas(point)}</span>
                <span className="text-xs font-normal">Point</span>
              </div>
              <div>
                <Link href={`/mobiles/hadiah`} as={`/hadiah`}>
                  <a className="text-ruby-base font-bold text-xs">Tukar Point</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="p-3 flex">
            <div
              className="flex justify-center items-center bg-gray-200 rounded-lg mr-3"
              style={{ width: '40px', height: '40px' }}
            >
              <div className="h-auto" style={{ width: '23px' }}>
                <img src="/icons/xp.png" alt="" className="w-full h-auto" />
              </div>
            </div>
            <div>
              <div className="">
                <span className="text-xs font-bold mr-2">{numberWithCommas(experience)}</span>
                <span className="text-xs font-normal">XP</span>
              </div>
              <div>
                <Link href={`/mobiles/medal`} as={`/medal`}>
                  <a className="text-ruby-base font-bold text-xs">Tukar Xp</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-b border-gray-100" />
        <div className="p-4">
          <ProgressAchievement xp={experience} />
        </div>
      </div>
    </div>
  )
}