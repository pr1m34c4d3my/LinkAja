import { useState, useEffect } from 'react'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser';
import { parseTimeAgo } from "@/helpers/index"
import moment from 'moment'

import {
    FacebookIcon, TwitterIcon, WhatsappIcon, LinkedinIcon,
    FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton,
} from 'react-share';
import { Breadcrumb } from 'antd'
import Skeleton from 'react-loading-skeleton'
import Layout from '@/components/mobiles/Layout'

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
    newsUrl,
    news,
}) {
    const [newsDetail, setNewsDetail] = useState(null);

    //==========================================================//
    //=================== COMPONENT - HOOKS ====================//
    //==========================================================//
    useEffect(() => {
        if (!news._error) setNewsDetail(news.payload);
    }, []);

    //=============================================================//
    //=================== COMPONENT - LISTENER ====================//
    //=============================================================//

    //=============================================================//
    //=================== COMPONENT - FUNCTION ====================//
    //=============================================================//

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
                headerTitle={`Detail Berita`}
                headerBack={`/news`}>

                <div className="p-4 bg-white">
                    <div className="mb-5">
                        <Breadcrumb separator=">">
                            <Breadcrumb.Item>Berita</Breadcrumb.Item>
                            <Breadcrumb.Item>{newsDetail ? newsDetail.title : <Skeleton />}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="mb-5 rounded-lg overflow-hidden">
                        <img className="w-full h-auto" src={newsDetail ? newsDetail.image : <Skeleton height={50} />} alt={newsDetail != null && newsDetail.title} />
                    </div>
                    <div className="flex justify-between items-center mb-3">
                        <div className="text-blue-400 text-xs">{newsDetail != null && newsDetail.category}</div>
                        <div className="text-gray-400 text-xs">
                            {newsDetail != null && parseTimeAgo(moment(newsDetail.created_at).unix() * 1000)}
                        </div>
                    </div>
                    <h3 className="font-bold text-lg mb-3">{newsDetail != null && newsDetail.title}</h3>
                    <div className="text-xs text-blackmassive">
                        <div className='article' dangerouslySetInnerHTML={{ __html: newsDetail != null && newsDetail.content }}></div>
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
            </Layout>
        );
    }

    if (newsDetail == null) return null;
    else return _renderLayout();
}

export async function getServerSideProps(context) {
    const params = context.params;
    const session = context.req.session;
    const newsSlug = params.slug;
    const newsUrl = `${process.env.NEXT_FRONT_URL}/news/${newsSlug}`;
    const newsUrlAPI = `${process.env.NEXT_API_URL}/v1/news/${newsSlug}`;
    const news = await apiNewsDetail(session, newsUrlAPI);

    // console.log(`process.env.NEXT_API_URL: ${JSON.stringify(process.env.NEXT_API_URL)}`);

    return {
        props: {
            newsUrl,
            news,
        }
    }
}