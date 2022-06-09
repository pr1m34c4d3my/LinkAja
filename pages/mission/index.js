import { useState, useEffect } from 'react'
import Router from 'next/router'
import axios from 'axios'
import { ChevronRight as IconChevronRight } from '@material-ui/icons'
import CardMission from '@/components/desktop/misi-harian/CardMission'
import SpecialCardMission from '@/components/desktop/misi-harian/SpecialCardMission'
import { numberWithCommas } from '@/helpers/index'
import Layout from '@/components/desktop/Layout'
import Skeleton from 'react-loading-skeleton'


export default function MisiHarianPage({ datafrontUrl }) {

  const [myDetail, setMyDetail] = useState(null)
  const [myMissions, setMyMissions] = useState(null)

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
      apiMyMissions(),
      apiMyDetail(),
    ]).then(([
      myMissions,
      myDetail,
    ]) => {
      if (!myMissions._error) setMyMissions(myMissions);
      if (!myDetail._error) setMyDetail(myDetail);
    }).catch(err => {
      setMyMissions(null);
      setMyDetail(null);
    });
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

  const apiMyMissions = async () => {
    return axios.post('/dashboard/my-missions',
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

  const handleCountMissionCompleted = () => {
    if (myMissions != null && myMissions.length > 0) {
      const arrMissionCompleted = myMissions.filter((item) => item.is_complete === true);
      return arrMissionCompleted.length;
    }
  }

  const handleCountMissionProgress = () => {
    if (myMissions != null && myMissions.length > 0) {
      const totalMission = myMissions.length;
      const completedMission = myMissions.filter((item) => item.is_complete === true);
      return ((completedMission.length / totalMission) * 100).toFixed(0);
    }
  }

  const getIconLocked = (completed) => {
    if (completed == true) {
      return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17ZM18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM8.9 6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8H8.9V6ZM18 20H6V10H18V20Z" fill="#E3292B" />
      </svg>
    } else {
      return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17ZM18 8H17V6C17 3.24 14.76 1 12 1C9.95097 1 8.18855 2.2346 7.41652 4C7.5 4 8 4 8 4C8.39984 4 8 4 8.5 4H9C9.5 4 9.43469 4 9.5 4C9.56531 4 9.5 4 9.63278 4C10.2018 3.3275 11.0517 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM18 20H6V10H18V20Z" fill="#989EB8" />
      </svg>
    }
  }

  const _handleClickMissionSpecial = (item) => {
    let urlLinkAja = process.env.DAILY_MISSION_URL;
    if (!item.is_complete) {
      Router.push(urlLinkAja);
    }
  }

  const _renderMissionConvensional = (missions) => {
    const missionConvensionals = missions.filter((item) => item.is_weekly == true && item.is_syariah == false);

    return (
      <>
        <div className='bg-transparent rounded-xl p-4 mb-4 border border-gray-100 relative'>
          <div className='bg-ruby-light rounded-xl absolute inset-0 w-full h-full z-0'>
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
          <div className="z-10 relative">
            <div className="flex items-center mb-3">
              <div
                className="rounded-full border-2 border-gray-100 mr-4"
                style={{ width: '45px', height: '45px' }}
              >
                <img
                  src={`/images/mobiles/ic_mission_transaction.png`}
                  alt="Transaksi A-Z"
                />
              </div>
              <div>
                <h3 className="font-bold font-title text-ruby-base font-xl lg:text-2xl">Transaksi A-Z</h3>
                <p className="text-gray-500">Pakai LinkAja yang #APA2BISA untuk dapat poin.<br /> Transaksi di tiap kategori maksimal 2X /minggu. <span> </span> 
                     <a href="/mobiles/mission/sk-special-transaction" className='underline text-ruby-base font-bold active:underline active:text-ruby-base'>S&K Berlaku.</a>
                </p>
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
                <span className="text-xs text-gray-100">+ {numberWithCommas(100)} Poin</span>
              </div>
              <div className="bg-ruby-base rounded-full px-3 py-1 mr-2 flex">
                <div className="mr-1" style={{ width: '15px', height: 'auto' }}>
                  <img
                    src="/icons/xp.png"
                    alt=""
                  />
                </div>
                <span className="text-xs text-gray-100">+ {numberWithCommas(250)} Xp</span>
              </div>
            </div>

            <div className="">
              {missionConvensionals.map((item, index) => {
                return (
                  <a target="_blank" key={index} className="bg-white p-4 flex border border-gray-200 rounded-lg mb-3" onClick={() => { _handleClickMissionSpecial(item) }}>
                    <div className="flex-auto mr-5 mt-8">{getIconLocked(item.is_complete)}</div>
                    <div className="w-full">
                      <span className="font-semibold">{item.title}</span>
                      <p className="mt-2 text-gray-500">{item.description}</p>

                      <div className="flex items-center mb-3 mt-3">
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
                            />
                          </div>
                          <span className="text-xs text-gray-100">+ {item.experience} Xp</span>
                        </div>
                      </div>

                    </div>
                    <div className="w-1/12 text-ruby-base flex items-center">
                      {!item.is_complete ? <IconChevronRight color="inherit" /> : ''}
                    </div>
                    
                  </a>
                  
                )
              })}
            </div>

          </div>
        </div>
      </>
    )
  }

  const _renderMissionSyariah = (missions) => {
    const missionSyariahs = missions.filter((item) => item.is_weekly == true && item.is_syariah == true);

    return (
      <>
        <div className='bg-transparent rounded-xl p-4 mb-4 border border-gray-100 relative'>
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
          <div className="z-10 relative">
            <div className="flex items-center mb-3">
              <div
                className="rounded-full border-2 border-gray-100 mr-4"
                style={{ width: '45px', height: '45px' }}
              >
                <img
                  src={`/images/mobiles/ic_mission_berkah.png`}
                  alt="Transaksi Jadi Berkah"
                />
              </div>
              <div>
                <h3 className="font-bold font-title text-ruby-base font-xl lg:text-2xl">Transaksi Jadi Berkah</h3>
                <p className="text-gray-500">Pakai Layanan Syariah LinkAja #APA2BISA #BerkahUntukSemua untuk dapat poin. Transaksi di tiap kategori misi maksimal 2X /minggu.<span> </span>
                <a href="/mobiles/mission/sk-special-transaction-syariah" className='underline text-ruby-base font-bold active:underline active:text-ruby-base'>S&K Berlaku.</a>
               </p>
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
                <span className="text-xs text-gray-100">+ {numberWithCommas(100)} Poin</span>
              </div>
              <div className="bg-ruby-base rounded-full px-3 py-1 mr-2 flex">
                <div className="mr-1" style={{ width: '15px', height: 'auto' }}>
                  <img
                    src="/icons/xp.png"
                    alt=""
                    className="w-full h-auto object-cover object-center"
                  />
                </div>
                <span className="text-xs text-gray-100">+ {numberWithCommas(250)} Xp</span>
              </div>
            </div>
            <div className="">
              {missionSyariahs.map((item, index) => {
                return (
                  <a target="_blank" key={index} className="bg-white p-4 flex border border-gray-200 rounded-lg mb-3" onClick={() => { _handleClickMissionSpecial(item) }}>
                    <div className="flex-auto mr-3 mt-8">{getIconLocked(item.is_complete)}</div>
                    <div className="w-full">
                      <span className="font-semibold">{item.title}</span> 
                      <span className="font-semibold">{item.title}</span>
                        <p className="mt-2 text-gray-500">{item.description}</p>
                          <div className="flex items-center mb-3 mt-3">
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
                            />
                          </div>
                          <span className="text-xs text-gray-100">+ {item.experience} Xp</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/12 text-ruby-base flex items-center">
                      {!item.is_complete ? <IconChevronRight color="inherit" /> : ''}
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <Layout title='Misi Harian'>
      <div className="bg-transparent rounded-xl p-6 mb-5 text-gray-100 relative overflow-hidden">
        <div className='bg-ruby-base absolute inset-0 w-full h-full z-0'>
          <img src='/icons/montain.png' className='h-full pt-5 absolute right-0 top-0' />
        </div>
        <div className='z-10 relative'>
          <div className='flex items-center'>
            <h3 className="text-gray-100 font-black mb-3 text-2xl mr-5">Misi Harian</h3>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div
                className="bg-gray-100 rounded-full border-gray-100"
                style={{ height: '16px', borderWidth: '3px' }}
              >
                <div className="bg-ruby-base h-full rounded-full" style={{ width: `${handleCountMissionProgress()}%`, content: `` }}></div>
              </div>
              <div className="" style={{ marginTop: '-3px' }}>
                <span className="font-semibold mr-1">{handleCountMissionCompleted()}</span>
                <span className="mr-1">dari</span>
                <span className="font-semibold mr-1">{myMissions != null && myMissions.length}</span>
                <span className="">Misi Terselesaikan</span>
              </div>
            </div>
          </div>
          <p>Selesaikan misi harian dan dapatkan poin untuk kamu tukar dengan hadiah</p>
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 mb-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {myMissions ? <CardMission missions={myMissions} detail={myDetail} url={datafrontUrl} /> : Array(3).fill(null).map((value, index) => (<Skeleton key={index} count={10} />))}
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 mb-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">

          {myMissions ? _renderMissionConvensional(myMissions) : <Skeleton count={2} />}
          {myMissions ? _renderMissionSyariah(myMissions) : <Skeleton count={2} />}

        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const frontUrl = `${process.env.NEXT_FRONT_URL}`

  return {
    props: {
      datafrontUrl: frontUrl
    }
  }
}