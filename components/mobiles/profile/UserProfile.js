import Link from 'next/link'
import { ChevronRight as IconChevronRight } from '@material-ui/icons'
import { getBadgeIcon } from '@/helpers/index'

export default function UserProfile({ profile }) {

  const { fullname, profile_picture, experience } = profile

  return (
    <div className="bg-gray-100 w-full p-4">
      <div className='flex flex-col'>
        <div className="flex items-center justify-center mb-6">
          <Link href='/mobiles/medal' as='/medal'>
            <a
              aria-label="avatar"
              className="bg-gray-150 rounded-full mr-3 relative flex justify-center items-center border border-white"
              style={{ width: '90px', height: '90px' }}
            >

              {profile_picture &&
                <img src={profile_picture} className='inline-block object-cover h-20 w-20 rounded-full ring-2 ring-white' />
              }
              {!profile_picture &&
                <svg
                  width="90"
                  height="90"
                  viewBox="0 0 90 90"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M45 0.5C69.6089 0.5 89.5 20.3911 89.5 45C89.5 69.6089 69.6089 89.5 45 89.5C20.3911 89.5 0.5 69.6089 0.5 45C0.5 20.3911 20.3911 0.5 45 0.5Z"
                    fill="#EEF0F7"
                    stroke="white"
                  />
                  <path
                    d="M55.98 65.1826C55.0125 64.8001 54.0675 63.8326 53.3925 62.5051C50.7375 63.8551 47.9475 64.7101 46.125 64.7101H43.875C41.67 64.7101 38.3625 63.5401 35.5275 61.8076C35.01 63.5176 34.335 64.7776 33.1875 65.1826L15.1875 71.6851C22.725 79.5376 33.2775 84.4426 45 84.4426C56.565 84.4426 67.05 79.6501 74.5425 71.9551L55.98 65.1826Z"
                    fill="url(#paint0_linear)"
                  />
                  <path
                    d="M57.6223 24.0976C54.7423 20.8801 50.5798 19.1926 45.2248 19.0576H45.2023H45.1798C39.8248 19.1926 35.6623 20.8801 32.7823 24.0976C29.7673 27.4726 28.3273 32.5126 28.8223 37.9576C28.8223 38.7451 28.8223 39.3526 28.9573 40.2526C29.0473 41.8051 30.4873 49.9951 30.4873 50.1526C31.0723 52.4251 31.8148 54.9001 33.2548 57.0601C33.8623 58.1176 35.0548 59.0176 36.2023 59.8726C38.8123 61.5151 42.3448 62.7976 44.2798 62.7976H46.1248C48.0598 62.7976 51.5923 61.5151 54.2023 59.8726C55.3498 59.0176 56.5423 58.1176 57.1498 57.0601C58.5898 54.9001 59.3323 52.4251 59.9173 50.1526C59.9173 49.9951 61.3573 41.8051 61.4473 40.2526C61.6048 39.3526 61.6048 38.7451 61.5823 37.9576C62.0773 32.5351 60.6373 27.4726 57.6223 24.0976Z"
                    fill="url(#paint1_linear)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="11.3906"
                      y1="73.1355"
                      x2="78.3281"
                      y2="73.1355"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.0862" stopColor="#C2CDDF" />
                      <stop offset="0.4878" stopColor="#CAD5E6" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear"
                      x1="-6.41"
                      y1="40.9362"
                      x2="61.6865"
                      y2="40.9362"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.0862" stopColor="#C2CDDF" />
                      <stop offset="0.4878" stopColor="#CAD5E6" />
                    </linearGradient>
                  </defs>
                </svg>
              }
              <div
                aria-label="achieve-badge"
                className="absolute bottom-0"
                style={{ width: '35px', marginBottom: -20 }}
              >
                <img
                  src={getBadgeIcon(experience)}
                  alt=""
                  className="w-full h-auto"
                />
              </div>
            </a>
          </Link>
        </div>

        <div className='flex items-center justify-center mb-3'>
          <h3 className='text-base font-bold text-md text-gray-900'>{fullname}</h3>
        </div>
        <div className='flex items-center justify-center mb-2'>
          <Link href='/mobiles/profile/edit' as='/profile/edit'>
            <a className="bg-ruby-base rounded-full px-3 pl-5 py-2 text-xs text-white font-bold flex items-center hover:text-white">
              <span>Edit Profile</span>
              <IconChevronRight size="small" color="inherit" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

