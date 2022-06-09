import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Layout from '@/components/desktop/Layout'
import CardProfile from '@/components/desktop/dashboard/CardProfile'
import CardMission from '@/components/desktop/dashboard/CardMission'
import SliderVideo from '@/components/desktop/dashboard/SliderVideo'
import VerticalSliderAds from '@/components/desktop/dashboard/VerticalSliderAds'
import CardNewsSimple from '@/components/desktop/dashboard/CardNewsSimple'
import TopClassement from '@/components/desktop/dashboard/TopClassement'
import { Card } from 'antd'
import Skeleton from 'react-loading-skeleton'
import { PlayArrow as IconPlayArrow } from '@material-ui/icons'

export default function Dashboard() {

  const [myDetail, setMyDetail] = useState(null);
  const [myMedals, setMyMedals] = useState(null);
  const [myMissions, setMyMissions] = useState(null);
  const [myRanking, setMyRanking] = useState(null);
  const [promotions, setPromotions] = useState(null);
  const [videos, setVideos] = useState(null);
  const [newsRecent, setNewsRecent] = useState(null);
  const [newsOther, setNewsOther] = useState(null);
  const [promoTaker, setPromoTaker] = useState(null);

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
      apiMyMissions(),
      apiMyRanking(),
      apiPromotions(),
      apiVideos(),
      apiNews(),
      apiPromoTaker(),
    ])
      .then(([
        myDetail,
        myMissions,
        myRanking,
        promotions,
        videos,
        news,
        promoTaker,
      ]) => {
        if (!myDetail._error) setMyDetail(myDetail);
        if (!myMissions._error) setMyMissions(myMissions);
        if (!myRanking._error) setMyRanking(myRanking);
        if (!promotions._error) setPromotions(promotions);
        if (!videos._error) setVideos(videos);
        if (!news._error) {
          let dataNewsRecent = [];
          let dataNewsOther = [];

          if (news.data.length > 0) {
            news.data.map((item, index) => {
              if (index < 5 && typeof index !== 'undefined') dataNewsRecent.push(item);
              else if ((index > 4 && index < 10 && typeof index !== 'undefined')) dataNewsOther.push(item);
            });
          }

          setNewsRecent(dataNewsRecent);
          setNewsOther(dataNewsOther);
        }
        if (!promoTaker._error) setPromoTaker(promoTaker);
      })
      .catch(err => {
        setMyDetail(null);
        setMyMissions(null);
        setMyRanking(null);
        setPromotions(null);
        setVideos(null);
        setNewsRecent(null);
        setNewsOther(null);
        setPromoTaker(null);
      });
  }

  const onClickGameNav = (e, game) => {
    e.preventDefault();

    if (game === 'Bisa Tangkap') {
      apiInitGameBisaTangkap();
    } else if (game === 'Bisa Buka') {
      apiInitGameBisaBuka();
    } else if (game === 'Bisa Jawab') {
      apiInitGameBisaJawab();
    } else {

    }
  }

  const apiInitGameBisaBuka = async () => {
    return axios.post('/permainan/bisa-buka',
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        console.log(`redirect: ${JSON.stringify(res.data)}`);
        if (!res.data._error) {
          window.open(res.data.payload, '_blank');
        }
      })
      .catch(err => {
        console.log(err)
      });
  }

  const apiInitGameBisaJawab = async () => {
    return axios.post('/permainan/bisa-jawab',
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        console.log(`redirect: ${JSON.stringify(res.data)}`);
        if (!res.data._error) {
          window.open(res.data.payload, '_blank');
        }
      })
      .catch(err => {
        console.log(err)
      });
  }

  const apiInitGameBisaTangkap = async () => {
    return axios.post('/permainan/bisa-tangkep',
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        console.log(`redirect: ${JSON.stringify(res.data)}`);
        if (!res.data._error) {
          window.open(res.data.payload, '_blank');
        }
      })
      .catch(err => {
        console.log(err)
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

  const apiMyRanking = async () => {
    return axios.post('/dashboard/my-ranking',
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

  const apiPromotions = async () => {
    return axios.post('/dashboard/promotions',
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

  const apiVideos = async () => {
    return axios.post('/dashboard/videos',
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

  const apiNews = async () => {
    return axios.post('/dashboard/news',
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


  const apiPromoTaker = async () => {
    return axios.post('/dashboard/promo-taker',
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

  const games = [
    {
      title: 'Bisa Buka',
      url: '/games/bisa-buka',
      imgPath: '/images/games/thumbnail/bisa-aja.png',
      isReleased: true,
    },
    {
      title: 'Bisa Tangkap',
      url: '/games/bisa-tangkep',
      imgPath: '/images/games/thumbnail/lomba-aja.png',
      isReleased: process.env.BISA_TANGKAP_ENABLED,
    },
    {
      title: 'Bisa Jawab',
      url: '/games/bisa-jawab',
      imgPath: '/images/games/thumbnail/kuis-a-z.png',
      isReleased: process.env.BISA_JAWAB_ENABLED,
    },
  ]

  function cardTitlePermainan() {
    return (
      <div className="flex font-bold">
        <div className="mr-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" fill="white" />
            <path
              d="M15.1079 9.00007C14.4961 9.00007 14.0001 9.49608 14.0001 10.1079C14.0001 10.7198 14.4961 11.2158 15.1079 11.2158C15.7198 11.2158 16.2158 10.7198 16.2158 10.1079C16.2158 9.49608 15.7198 9.00007 15.1079 9.00007Z"
              fill="#656D86"
            />
            <path
              d="M17.1079 11.0001C16.4961 11.0001 16.0001 11.4961 16.0001 12.1079C16.0001 12.7198 16.4961 13.2158 17.1079 13.2158C17.7198 13.2158 18.2158 12.7198 18.2158 12.1079C18.2158 11.4961 17.7198 11.0001 17.1079 11.0001Z"
              fill="#656D86"
            />
            <path
              d="M19.1079 9.00007C18.4961 9.00007 18.0001 9.49608 18.0001 10.1079C18.0001 10.7198 18.4961 11.2158 19.1079 11.2158C19.7198 11.2158 20.2158 10.7198 20.2158 10.1079C20.2158 9.49608 19.7198 9.00007 19.1079 9.00007Z"
              fill="#656D86"
            />
            <path
              d="M17.1079 7.00007C16.4961 7.00007 16.0001 7.49608 16.0001 8.10795C16.0001 8.71981 16.4961 9.21582 17.1079 9.21582C17.7198 9.21582 18.2158 8.71981 18.2158 8.10795C18.2158 7.49608 17.7198 7.00007 17.1079 7.00007Z"
              fill="#656D86"
            />
            <path
              d="M5.10795 9.00007C4.49608 9.00007 4.00007 9.49608 4.00007 10.1079C4.00007 10.7198 4.49608 11.2158 5.10795 11.2158C5.71981 11.2158 6.21582 10.7198 6.21582 10.1079C6.21582 9.49608 5.71981 9.00007 5.10795 9.00007Z"
              fill="#656D86"
            />
            <path
              d="M7.10795 11.0001C6.49608 11.0001 6.00007 11.4961 6.00007 12.1079C6.00007 12.7198 6.49608 13.2158 7.10795 13.2158C7.71981 13.2158 8.21582 12.7198 8.21582 12.1079C8.21582 11.4961 7.71981 11.0001 7.10795 11.0001Z"
              fill="#656D86"
            />
            <path
              d="M9.10795 9.00007C8.49608 9.00007 8.00007 9.49608 8.00007 10.1079C8.00007 10.7198 8.49608 11.2158 9.10795 11.2158C9.71981 11.2158 10.2158 10.7198 10.2158 10.1079C10.2158 9.49608 9.71981 9.00007 9.10795 9.00007Z"
              fill="#656D86"
            />
            <path
              d="M7.10795 7.00007C6.49608 7.00007 6.00007 7.49608 6.00007 8.10795C6.00007 8.71981 6.49608 9.21582 7.10795 9.21582C7.71981 9.21582 8.21582 8.71981 8.21582 8.10795C8.21582 7.49608 7.71981 7.00007 7.10795 7.00007Z"
              fill="#656D86"
            />
            <rect x="6" y="8" width="2.2" height="4" fill="#656D86" />
            <rect
              x="9.1001"
              y="9"
              width="2.2"
              height="4"
              transform="rotate(90 9.1001 9)"
              fill="#656D86"
            />
            <path
              d="M2.6 8C2.6 6.12223 4.12223 4.6 6 4.6H18C19.8778 4.6 21.4 6.12223 21.4 8V14.9414C21.4 16.0358 20.866 17.0614 19.9695 17.689L19.6501 17.9126C18.2834 18.8692 16.3973 18.5142 15.4719 17.1262C13.8203 14.6487 10.1797 14.6487 8.5281 17.1262C7.60274 18.5142 5.71659 18.8692 4.34993 17.9126L4.00585 18.4041L4.34993 17.9126L4.03053 17.689C3.13397 17.0614 2.6 16.0358 2.6 14.9414V8Z"
              stroke="#656D86"
              strokeWidth="1.2"
            />
          </svg>
        </div>
        <span>Permainan</span>
      </div>
    )
  }

  function cardTitleBeritaTerkini() {
    return (
      <div className="flex font-bold">
        <div className="mr-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0)">
              <path
                d="M13 12H20V13.5H13V12ZM13 9.5H20V11H13V9.5ZM13 14.5H20V16H13V14.5ZM21 4H3C1.9 4 1 4.9 1 6V19C1 20.1 1.9 21 3 21H21C22.1 21 23 20.1 23 19V6C23 4.9 22.1 4 21 4ZM21 19H12V6H21V19Z"
                fill="#656D86"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <span>Berita Terkini</span>
      </div>
    )
  }

  function cardTitleTopClasment() {
    return (
      <div className="flex font-bold">
        <div className="mr-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 18H9V16H3V18ZM3 6V8H21V6H3ZM3 13H15V11H3V13Z" fill="#656D86" />
          </svg>
        </div>
        <span>Top 5 Klasemen</span>
      </div>
    )
  }

  return (
    <Layout title='Dashboard'>

      {myDetail ? <CardProfile profile={myDetail} /> : <div className='mb-4'><Skeleton height={50} /></div>}

      <div className="bg-white rounded-xl p-3 xl:p-6 w-full mb-4">
        <div className="flex justify-between w-full">
          <h1 className="font-bold w-10/12">
            {myDetail ? `Hi ${myDetail.fullname}, Ayo tuntaskan misi harianmu dan dapatkan poinnya!` : <Skeleton />}
          </h1>
          <div className="w-3/12 flex justify-end">
            <Link href="/mission" as='/missions'>
              <a className="text-ruby-base underline font-bold hover:text-ruby-base hover:underline">
                Lihat Semua
              </a>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-5">
          {myMissions ? <CardMission missions={myMissions} /> : <Skeleton height={30} />}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 pb-10">
        <div className="col-span-12 xl:col-span-12">
          <div className="bg-white rounded-lg p-4">
            {videos ? <SliderVideo videos={videos} /> : <Skeleton height={30} />}
          </div>
        </div>
        {/* <div className="col-span-12 xl:col-span-4">
          <div className="bg-white rounded-lg p-4">
            {promotions ? <VerticalSliderAds promotions={promotions} /> : <Skeleton count={5} />}
          </div>
        </div> */}
      </div>
      <div className="grid grid-cols-12 gap-4 pb-10">
        <div className="col-span-12 lg:col-span-3 xl:col-span-3">
          <Card title={cardTitlePermainan()} className="rounded-lg bg-white body-compact">
            {games.map((item, index) => {
              return (
                <div key={index} className={`${item.isReleased ? 'bg-white' : 'bg-gray-100'} flex mb-3 items-center p-2`}>
                  <div
                    style={{ width: '46px', height: '46px' }}
                    className="bg-gray-200 rounded-full mr-2"
                  >
                    <img src={item.imgPath} alt="" className='rounded-full' />
                  </div>
                  <div className="flex-1 text-xs font-bold">{item.title}</div>
                  <div className="flex-1 flex items-center">
                    {item.isReleased ?
                      <a onClick={(e) => onClickGameNav(e, item.title)}>
                        <div className={`bg-ruby-base text-gray-100 rounded-full flex items-center px-3 py-1 pl-1 text-xs`}>
                          <IconPlayArrow />
                          <span>Mainkan</span>
                        </div>
                      </a>
                      :
                      <div className='bg-gray-100 text-gray-300 rounded-full flex items-center px-3 py-1 pl-1 text-xs'>
                        <IconPlayArrow />
                        <span>Soon</span>
                      </div>
                    }

                  </div>
                </div>
              )
            })}
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-5 xl:col-span-5">
          {(newsOther != null && newsOther.length > 0) ?
            <Card title={cardTitleBeritaTerkini()} className="rounded-lg">
              {newsOther.map((item, index) => {
                return (
                  <div key={index} className="mb-3">
                    <CardNewsSimple item={item} key={`news-other-${index.toString()}`} />
                  </div>
                )
              })}
              <div className="flex justify-center py-3">
                <Link href="/news" as={`/news`}>
                  <a className="text-ruby-base hover:text-ruby-base no-underline font-bold">
                    Lihat berita lainnya
                  </a>
                </Link>
              </div>
            </Card>
            : <div className='p-2'><Skeleton height={100} /></div>
          }
        </div>

        <div className="col-span-12 lg:col-span-4 xl:col-span-4">
          <Card title={cardTitleTopClasment()} className="rounded-lg body-compact">
            {myRanking ? <TopClassement ranks={myRanking} profile={myDetail} /> : <Skeleton count={6} />}
          </Card>
        </div>
      </div>
    </Layout>
  )
}