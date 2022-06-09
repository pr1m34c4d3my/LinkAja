import { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '@/components/mobiles/Layout'
import SliderUpdatedNews from '@/components/mobiles/dashboard/SliderUpdatedNews'
import OtherNews from '@/components/mobiles/dashboard/OtherNews'
import Skeleton from 'react-loading-skeleton'

export default function News() {
    const filters = [
        {
            name: 'semua',
            label: 'Semua',
        },
        {
            name: 'news',
            label: 'News',
        },
        {
            name: 'syariah',
            label: 'Syariah',
        },
        {
            name: 'bisnis',
            label: 'Bisnis',
        },
        {
            name: 'tekno',
            label: 'Tekno',
        },
    ]

    const [activefilter, setActiveFilter] = useState(filters[0].name)

    const [newsRecent, setNewsRecent] = useState(null);
    const [newsOther, setNewsOther] = useState(null);
    const [newsTotalPage, setNewsTotalPage] = useState(1);

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
            apiNews(),
        ])
            .then(([
                news,
            ]) => {
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
                    setNewsTotalPage(news.total_page);
                }
            })
            .catch(err => {
                setNews(null);
            });
    }

    const onClickLoadmore = () => {

    }

    //=============================================================//
    //=================== COMPONENT - FUNCTION ====================//
    //=============================================================//
    const apiNews = async () => {
        return axios.post('/news',
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
    const _renderNewsFilter = () => {
        return (
            <div className="flex overflow-x-scroll mb-4">
                {filters.map((item) => {
                    return (
                        <div
                            key={item.name}
                            className={`px-4 py-3  text-sm ${activefilter === item.name
                                ? 'bg-ruby-base text-gray-100'
                                : 'bg-gray-200 text-gray-800'
                                }  mr-2 rounded-lg cursor-pointer`}
                            onClick={() => setActiveFilter(item.name)}
                        >
                            {item.label}
                        </div>
                    )
                })}
            </div>
        );
    }

    return (
        <Layout
            title={'Berita'}
            headerTitle={`Berita`}
            headerBack={`/dashboard`}>
            <div className='p-4 bg-white'>
                <h3 className="font-bold text-base mb-3">Berita Terkini</h3>

                {/* { _renderNewsFilter() } */}


                <div className="mb-4">
                    {newsRecent ?
                        <SliderUpdatedNews news={newsRecent} /> : <Skeleton height={100} />
                    }
                </div>

                <h3 className="font-bold text-base mb-3">Berita Lainnya</h3>

                <div className="mb-2">
                    {newsOther ?
                        newsOther.map((item, index) => {
                            return (<OtherNews news={item} key={`news-other-${index.toString()}`} />);
                        })
                        : <Skeleton count={20} />
                    }
                </div>

                {newsTotalPage > 1 &&
                    <div className="mt-5">
                        <a
                            className="block w-full text-center text-ruby-base hover:text-ruby-base text-xs font-semibold"
                            onClick={() => onClickLoadmore()}>
                            Lihat Berita Lainnya
                        </a>
                    </div>
                }
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {}
    }
}