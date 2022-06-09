import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { unstable_renderSubtreeIntoContainer } from 'react-dom'
import Link from 'next/link'
import Router from 'next/router'
import IconBadgeXp from '@/components/mobiles/icons/IconBadgeXp'
import { numberWithCommas } from '@/helpers/index'
import Skeleton from 'react-loading-skeleton'
import { ArrowDropDown as IconArrowDropDown } from '@material-ui/icons'

export default function Header() {

  const [myDetail, setMyDetail] = useState(null);

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
    Promise.all([
      apiMyDetail(),
    ])
      .then(([
        myDetail,
      ]) => {
        if (!myDetail._error) setMyDetail(myDetail);
      })
      .catch(err => {
        setMyDetail(null);
      });
  }

  const onClickLogout = () => {
    apiAuthLogout();
  }

  //=============================================================//
  //=================== COMPONENT - FUNCTION ====================//
  //=============================================================//
  const apiMyDetail = async () => {
    return axios.post('/dashboard/my-detail',
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        if (res.status === 200) {
          return res.data.payload;
        } else {
          return null;
        }
      })
      .catch(err => {
        return null;
      });
  }

  const apiAuthLogout = async () => {
    return axios.post('/logout',
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        if (res.status === 200 && !res.data._error) {
          Router.replace(`/auth/email-auth`, `/auth`, { shallow: true });
        }
      })
      .catch(err => {
        return console.log(`apiAuthLogout:.error: ${JSON.stringify(err)}`);
      });
  }

  const [dropdownShow, setDropdownShow] = useState({
    profile: false,
  })

  const refDropdownProfile = useRef()

  function handleClickOutsideOutsideOfRef(ref, e, execution) {
    if (ref.current) {
      if (!ref.current.contains(e.target)) {
        execution()
      }
    }
  }

  function handleClickOutsideOutsideOfRef(ref, e, execution) {
    if (ref.current) {
      if (!ref.current.contains(e.target)) {
        execution()
      }
    }
  }

  useEffect(() => {
    window.addEventListener('mousedown', (e) =>
      handleClickOutsideOutsideOfRef(refDropdownProfile, e, () => {
        setDropdownShow((state) => ({ ...state, profile: false }))
      })
    )

    return () => {
      window.removeEventListener('mousedown', (e) =>
        handleClickOutsideOutsideOfRef(refDropdownProfile, e, () => {
          setDropdownShow((state) => ({ ...state, profile: false }))
        })
      )
    }
  }, [])

  return (
    <div aria-label='header-desktop' className='bg-ruby-base text-gray-100 p-5'>
      <div className='container mx-auto flex justify-between items-center'>
        <div style={{ height: '35px' }}>
          <img
            src="/images/logo.png"
            alt=""
            className="h-full w-auto object-center object-cover hidden md:block"
          />
        </div>
        <div className="flex items-center">
          <Link href='/notification'>
            <a>
              <div className='flex justify-center'>
                <svg
                  width="23"
                  height="25"
                  viewBox="0 0 23 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.16669 20.7188V21.447C8.16669 23.0159 9.65906 24.125 11.5 24.125C13.3409 24.125 14.8333 23.0159 14.8333 21.447V20.7188"
                    stroke="white"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M1.1875 21.1563L6.16701 21.1563C6.24985 21.1563 6.33021 21.1465 6.41063 21.1266C7.05521 20.9671 10.1518 20.2188 11.5 20.2188C12.8483 20.2188 15.9449 20.9671 16.5895 21.1266C16.6699 21.1465 16.7502 21.1563 16.8331 21.1563L21.8125 21.1563"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M19.6246 21.0311V9.93248C19.6246 5.18747 16.0934 1.5 12.2178 1.5H11.4999H10.7819C6.90596 1.5 3.37482 5.18747 3.37482 9.93248V21.0311"
                    stroke="white"
                    strokeWidth="1.2"
                  />
                </svg>
              </div>
            </a>
          </Link>
          <div
            className="border-r border-gray-100 mx-5"
            style={{ height: '40px' }}
          ></div>
          {myDetail ?
            <Link href="/points">
              <a>
                <div className="flex items-center font-bold text-md mr-4">
                  <IconBadgeXp size="30px" xp={myDetail.point} className="mr-3" /><span>{numberWithCommas(myDetail.point)} Point</span>
                </div>
              </a>
            </Link>
            : <Skeleton count={1} />
          }
          <div
            className="flex items-center"
            onClick={() => setDropdownShow((state) => ({ ...state, profile: !state.profile }))}
          >
            {myDetail ? <img src={myDetail.profile_picture} className='inline-block object-cover h-12 w-12 rounded-full ring-2 ring-white mr-3' /> :
              <div
                aria-label="avatar"
                className="bg-white rounded-full mr-3 relative flex justify-center items-center shadow"
                style={{ width: 48, height: 48 }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99984 10.0001C12.5782 10.0001 14.6665 7.91175 14.6665 5.33341C14.6665 2.75508 12.5782 0.666748 9.99984 0.666748C7.4215 0.666748 5.33317 2.75508 5.33317 5.33341C5.33317 7.91175 7.4215 10.0001 9.99984 10.0001ZM9.99984 12.3334C6.88484 12.3334 0.666504 13.8967 0.666504 17.0001V19.3334H19.3332V17.0001C19.3332 13.8967 13.1148 12.3334 9.99984 12.3334Z"
                    fill="#828282"
                  />
                </svg>
              </div>
            }

            <div className="font-bold text-md text-gray-100 flex items-center relative">
              {myDetail ? <span>{myDetail.fullname}</span> : <Skeleton count={1} />}
              <IconArrowDropDown color="inherit" fontSize="small" />
              <div
                ref={refDropdownProfile}
                className={`bg-white rounded-lg p-1 z-30 border border-gray-50 shadow-md ${dropdownShow.profile ? 'block absolute' : 'hidden'
                  }`}
                style={{ top: 0, marginTop: '30px', right: 0 }}
              >
                <ul>
                  <li>
                    <Link href="/profile">
                      <a className="block text-gray-900 hover:text-gray-100 px-4 py-2 hover:bg-ruby-base transition-none rounded-lg">
                        Profile
                      </a>
                    </Link>
                  </li>
                  <li>
                    <a onClick={() => onClickLogout()} className="block text-gray-900 hover:text-gray-100 px-4 py-2 hover:bg-ruby-base transition-none rounded-lg">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}