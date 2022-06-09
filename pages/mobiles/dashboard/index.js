import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

import { parseTimeAgo } from '@/helpers/index'

import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import HeroProfile from '@/components/mobiles/dashboard/HeroProfile'
import DashboardMission from '@/components/mobiles/dashboard/DashboardMission'
import Promotions from '@/components/mobiles/dashboard/Promotions'
import SliderVideo from '@/components/mobiles/dashboard/SliderVideo'
import SliderUpdatedNews from '@/components/mobiles/dashboard/SliderUpdatedNews'
import Skeleton from 'react-loading-skeleton'
import Layout from '@/components/mobiles/Layout'

import OtherNews from '@/components/mobiles/dashboard/OtherNews'

import * as HelperComponents from '@/helpers/components'

import 'swiper/css'
import 'swiper/css/pagination'

export default function Dashboard({
    showNavbar,
}) {

    const [myDetail, setMyDetail] = useState(null);
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

    //==========================================================//
    //=================== COMPONENT - RENDER ===================//
    //==========================================================//
    const _renderNewsRecent = (dataNews) => {
        return (
            <div className="p-4 mb-3 bg-white">
                <h3 className="font-bold text-base mb-3">Berita Terkini</h3>
                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={30}
                    className="mySwiper"
                    freeMode={true}>
                    {dataNews != null && dataNews.length > 0 &&
                        dataNews.map((item, index) => {
                            return (
                                <SwiperSlide key={`news-recent-${index.toString()}`} style={{ width: '90%' }}>
                                    <Link href={`/mobiles/news/[slug]?slug=${item.slug}`} as={`/news/${item.slug}`}>
                                        <a className="block">
                                            <div className="w-full h-full rounded-lg bg-white border border-gray-300 overflow-hidden">
                                                <div style={{ height: '185px' }} className="mb-3">
                                                    <img
                                                        src={item.image}
                                                        alt="thumbnail-news"
                                                        className="h-full w-full object-center object-cover" />
                                                </div>
                                                <div className="px-3 text-left">
                                                    <div className="mb-1 font-semibold text-xs text-ruby-base">{item.category}</div>
                                                    <div className="font-semibold mb-3 text-xs">{item.title}</div>
                                                    <div className="mb-3 font-semibold text-2xs text-gray-400">
                                                        {parseTimeAgo(moment(item.created_at).unix() * 1000)}
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        );
    }

    return (
        <Layout
            title='Dashboards'
            showNavbar={showNavbar}
            backgroundColor={'bg-pearlsoft'}>
            <div className="mb-3">
                {myDetail ? <HeroProfile profile={myDetail} /> : <div className='p-2'><Skeleton height={100} /></div>}
            </div>
            <div className="mb-3">
                {
                    (myDetail != null && myMissions != null && myRanking != null)
                        ? <DashboardMission profile={myDetail} missions={myMissions} ranks={myRanking} />
                        : <div className='p-2'><Skeleton height={100} /></div>
                }
            </div>
            <div className="py-2 mb-3 bg-white">
                {videos ? <SliderVideo videos={videos} /> : <div className='p-2'><Skeleton height={100} /></div>}
            </div>
            {/* <div className='py-2 mb-3 bg-white'>
                {promotions ? <Promotions promos={promotions} /> : <div className='p-2'><Skeleton height={100} /></div>}
            </div> */}

            {(newsRecent == null) && <div className='p-2'><Skeleton height={100} /></div>}
            {(newsRecent != null && newsRecent.length > 0) && _renderNewsRecent(newsRecent)}

            {(newsOther != null && newsOther.length > 0) ?
                <div className="p-4 mb-3 bg-white">
                    <h3 className="font-bold text-base mb-3">Berita Lainnya</h3>
                    {
                        newsOther.map((item, index) => {
                            return (<OtherNews news={item} key={`news-other-${index.toString()}`} />);
                        })
                    }
                    <div className="mt-5">
                        <Link href="/mobiles/news" as='/news'>
                            <a className="block w-full text-center text-ruby-base hover:text-ruby-base text-xs font-semibold">
                                Lihat Berita Lainnya
                            </a>
                        </Link>
                    </div>
                </div>
                : <div className='p-2'><Skeleton height={100} /></div>
            }
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const showNavbar = HelperComponents.isNavbarShow(context);

    return {
        props: {
            showNavbar,
        }
    }
}