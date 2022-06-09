import Link from 'next/link'
import { getLevelLabel } from '@/helpers/index'

export default function UserMedal({ profile }) {
  return (
    <div className="bg-transparent rounded-xl py-2 px-6 text-gray-100 relative overflow-hidden">
      <div className='bg-blue-500 absolute inset-0 w-full h-full z-0'>
        <img src='/icons/montain.png' className='h-full pt-5 absolute right-0 top-0' />
      </div>
      <div className='z-10 relative'>
        <div className='flex'>
          <div className="w-7/12">
            <div className='my-4'>
              <div className='flex items-center'>
                <h3 className="text-gray-100 font-black mb-3 text-2xl">{profile.fullname}</h3>
              </div>
              <div className="flex items-center">
                <div
                  aria-label="achieve-badge"
                  style={{ width: '30px', }}
                  className='mr-2'
                >
                  <img src={profile.Medal.icon} alt="" className="w-full h-auto" />
                </div>
                <h4 className="text-md text-white font-normal">{getLevelLabel(profile.experience)} {profile.point} Poin</h4>
                <div className='mx-5'>
                  <Link href={`/hadiah`} as={`/hadiah`}>
                    <a className="bg-ruby-base font-extrabold px-3 py-2 rounded-md text-white cursor-pointer text-sm">
                      Tukar Point
                    </a>
                  </Link>
                </div>
                <div className='my-1 mx-5'>
                  <Link href={`/points`} as={`/points`}>
                    <a className='text-white text-sm font-semibold block text-center underline'>History Poin</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="w-5/12">
            <div className='bg-white text-gray-900 rounded-xl my-4 grid grid-cols-2 gap-3 px-4 py-2'>
              <div className='p-3 flex border-dashed border-gray-100 border-r-2'>
                <div>
                  <div className='text-md font-normal mr-2'>Total Misi</div>
                  <div className='text-md mr-2 font-bold'>10 dari 14 Selesai</div>
                </div>
              </div>
              <div className='p-3 flex'>
                <div>
                  <div className='text-md font-normal mr-2'>Kupon</div>
                  <div className='text-md mr-2 font-bold'>-</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}