import { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '@/components/desktop/Layout'
import SliderUpdatedNews from '@/components/desktop/news/SliderUpdatedNews'
import OtherNews from '@/components/desktop/news/OtherNews'
import { Card } from 'antd'
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

  function cardTitleBeritaLainnya() {
    return (
      <div className="flex font-bold">
        <span>Berita Lainnya</span>
      </div>
    )
  }

  return (
    <Layout title='Berita'>
      <div className='flex'>
        <div className="w-8/12">
          <div className="bg-white rounded-lg mb-4">
            {/* { _renderNewsFilter() } */}
            <Card title={cardTitleBeritaLainnya()} className="rounded-lg">
              {newsRecent ?
                <SliderUpdatedNews news={newsRecent} /> : <Skeleton height={100} />
              }
            </Card>
          </div>
          <div className="bg-white rounded-lg mb-4">
            {(newsOther != null && newsOther.length > 0) ?
              <Card title={cardTitleBeritaTerkini()} className="rounded-lg">
                {newsOther.map((item, index) => {
                  return (<OtherNews news={item} key={`news-other-${index.toString()}`} />);
                })}
              </Card>
              : <div className='p-2'><Skeleton height={100} /></div>
            }
          </div>
        </div>
        <div className='w-4/12'></div>
      </div>
    </Layout>
  )
}