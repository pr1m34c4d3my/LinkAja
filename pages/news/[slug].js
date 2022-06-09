import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser';
import { parseTimeAgo } from "@/helpers/index"
import moment from 'moment'

import {
  FacebookIcon, TwitterIcon, WhatsappIcon, LinkedinIcon,
  FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton,
} from 'react-share';
import { Breadcrumb, Card } from 'antd'
import Skeleton from 'react-loading-skeleton'
import Layout from '@/components/desktop/Layout'
import OtherNews from '@/components/mobiles/dashboard/OtherNews'

const apiNewsDetail = async (session, url) => {
  return axios.get(url,
    {
      responseType: 'json',
      crossdomain: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`,
      }
    })
    .then((response) => {
      // console.log('apiNewsDetail.response: ' + JSON.stringify(response.data.data));
      if (response.status === 200) {
        const resData = response.data.data;

        const _error = 0;
        const payload = resData;

        return { _error, payload };
      } else {
        return { _error: 1, message: response.data.message };
      }
    })
    .catch(error => {
      // console.log('apiNewsDetail.error: ' + JSON.stringify(error));
      if (error.response !== undefined && error.response.data !== null) {
        return { _error: 1, message: error.message };
      } else {
        return { _error: 1, message: error.message };
      }
    });
}

export default function NewsDetail({
  dataHostUrl,
  newsUrl,
  news,
}) {
  const [newsDetail, setNewsDetail] = useState(null);
  const [newsOther, setNewsOther] = useState(null);
  const [newsTotalPage, setNewsTotalPage] = useState(1);

  //==========================================================//
  //=================== COMPONENT - HOOKS ====================//
  //==========================================================//
  useEffect(() => {
    if (!news._error) setNewsDetail(news.payload);
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
        newest,
      ]) => {
        if (!newest._error) {
          let dataNewsRecent = [];
          let dataNewsOther = [];

          if (newest.data.length > 0) {
            newest.data.map((item, index) => {
              if (index < 5 && typeof index !== 'undefined') dataNewsRecent.push(item);
              else if ((index > 4 && index < 10 && typeof index !== 'undefined')) dataNewsOther.push(item);
            });
          }

          setNewsOther(dataNewsOther);
          setNewsTotalPage(newest.total_page);
        }
      })
      .catch(err => {
        // setNewsOther(null);
      });
  }

  //=============================================================//
  //=================== COMPONENT - LISTENER ====================//
  //=============================================================//

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

  function cardTitleBeritaTerkini() {
    return (
      <div className="flex items-center font-bold">
        <span>Berita Lainnya</span>
      </div>
    )
  }

  //==========================================================//
  //=================== COMPONENT - RENDER ===================//
  //==========================================================//
  const _renderNewsShare = () => {
    const contentURL = newsUrl;
    const postTitle = `LinkAja Apa2Bisa - ${newsDetail.title}`;

    return (
      <div id="post_share">
        <ul className="flex flex-row items-center">
          <li className="w-8 h-8">
            <FacebookShareButton url={contentURL} quote={postTitle}>
              <FacebookIcon size={28} round={true} />
            </FacebookShareButton>
          </li>
          <li className="w-8 h-8">
            <TwitterShareButton url={contentURL} title={postTitle}>
              <TwitterIcon size={28} round={true} />
            </TwitterShareButton>
          </li>
          <li className="w-8 h-8">
            <WhatsappShareButton url={contentURL} title={postTitle}>
              <WhatsappIcon size={28} round={true} />
            </WhatsappShareButton>
          </li>
          <li className="w-8 h-8">
            <LinkedinShareButton url={contentURL} title={postTitle}>
              <LinkedinIcon size={28} round={true} />
            </LinkedinShareButton>
          </li>
        </ul>
      </div>
    );
  }

  const _renderLayout = () => {
    return (
      <Layout
        title={`LinkAja Apa2Bisa - ${newsDetail.title}`}
      >
        <div className='flex'>
          <div className='w-8/12 pr-2'>
            <div className="mb-5">
              <Breadcrumb separator=">">
                <Breadcrumb.Item>
                  <Link href='/news' as='/news'><a>Berita</a></Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{newsDetail ? newsDetail.title : <Skeleton />}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className='bg-white rounded-xl p-3 mb-4'>
              <div className="mb-5 rounded-lg overflow-hidden">
                <img className="w-full h-auto" src={newsDetail ? newsDetail.image : <Skeleton height={50} />} alt={newsDetail != null && newsDetail.title} />
              </div>
              <div className="flex justify-between items-center mb-3">
                <div className="text-blue-400 text-sm">{newsDetail != null && newsDetail.category}</div>
                <div className="text-gray-400 text-sm">
                  {newsDetail != null && parseTimeAgo(moment(newsDetail.created_at).unix() * 1000)}
                </div>
              </div>
              <h3 className="font-extrabold text-xl mb-3">{newsDetail != null && newsDetail.title}</h3>
              <div className="text-sm text-blackmassive">
                {newsDetail ? ReactHtmlParser(newsDetail.content) : <Skeleton count={20} />}
              </div>
              {process.env.SHARES_ENABLED ?
                <div className="my-8 flex items-center">
                  <div className="mr-3">Bagikan</div>
                  <div className="flex flex-wrap items-center">
                    {newsDetail != null && newsUrl != null && _renderNewsShare()}
                  </div>
                </div>
                : ''
              }
            </div>
          </div>
          <div className='w-4/12 pl-2 mb-5'>
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
      </Layout>
    );
  }

  if (newsDetail == null) return null;
  else return _renderLayout();

}

export async function getServerSideProps(context) {
  const params = context.params;
  const session = context.req.session;
  const hostUrl = process.env.NEXT_FRONT_URL;
  const newsSlug = params.slug;
  const newsUrl = `${process.env.NEXT_FRONT_URL}/news/${newsSlug}`;
  const newsUrlAPI = `${process.env.NEXT_API_URL}/v1/news/${newsSlug}`;
  const news = await apiNewsDetail(session, newsUrlAPI);

  // console.log(`process.env.NEXT_API_URL: ${JSON.stringify(process.env.NEXT_API_URL)}`);

  return {
    props: {
      dataHostUrl: hostUrl,
      newsUrl,
      news,
    }
  }
}