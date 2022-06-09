import Link from 'next/link'
import { numberWithCommas } from '@/helpers/index'

export default function UserMedal({ profile }) {

  return (
    <div className="bg-blue-500 w-full p-4 text-gray-100">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex flex-wrap">
          <div>
            <h3 className="font-semibold text-white mr-2 text-lg">{profile.fullname}</h3>
            <div className="flex">
              <div
                aria-label="achieve-badge"
                style={{ width: '20px', }}
                className='mr-2'
              >
                <img src={profile.Medal.icon} alt="" className="w-full h-auto" />
              </div>
              <h3 className="font-thin text-white">{profile.Medal.title}</h3>
              <span className="ml-1 mr-1 font-thin text-white">|</span>
              <h4 className="font-thin text-white">{numberWithCommas(profile.experience)} XP ({numberWithCommas(profile.point)} Poin)</h4>
            </div>
          </div>
        </div>
        <div>
          <Link href='/mobiles/hadiah' as='/hadiah'>
            <a className="bg-ruby-base font-extrabold px-3 py-2 rounded-md text-white cursor-pointer text-sm">
              Tukar Point
            </a>
          </Link>
        </div>
      </div>
      <div className='bg-white rounded my-5 grid grid-cols-2 gap-3 px-4 py-2'>
        <div className='p-3 flex border-dashed border-gray-100 border-r-2'>
          <div>
            <div className='text-xs font-bold mr-2 text-black'>Total Misi</div>
            <div className='text-xs mr-2 text-black'>0 dari 14 Selesai</div>
          </div>
        </div>
        <div className='p-3 flex'>
          <div>
            <div className='text-xs font-bold mr-2 text-black'>Kupon</div>
            <div className='text-xs mr-2 text-black'>-</div>
          </div>
        </div>
      </div>
      <div className='my-1'>
        <Link href='/mobiles/points' as='/points'>
          <a className='text-white text-sm font-semibold block text-center underline'>History Poin</a>
        </Link>
      </div>
    </div>
  )
}