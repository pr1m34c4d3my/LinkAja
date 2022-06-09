import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

import { Spin } from 'antd'
import Link from 'next/link'
import Layout from '@/components/mobiles/Layout'


export default function ForumThreads({
    dataCategoryId,
}) {
    const filters = [
        {
            name: 'semua',
            label: 'Semua',
        },
        {
            name: 'terbaru',
            label: 'Terbaru',
        },
        {
            name: 'teraktif',
            label: 'Teraktif',
        },
    ]

    const [activefilter, setActiveFilter]       = useState(filters[0].name)

    const [loadingContent, setLoadingContent]   = useState(false);
    const [loadingMore, setLoadingMore]         = useState(false);

    const [forumPageNow, setForumPageNow]       = useState(1);
    const [forumPageTotal, setForumPageTotal]   = useState(1);
    const [forumDetail, setForumDetail]         = useState(null);
    const [forumThreads, setForumThreads]       = useState(null);

    //==========================================================//
    //=================== COMPONENT - HOOKS ====================//
    //==========================================================//
    useEffect(() => {
        const categoryId = (typeof dataCategoryId == 'undefined' || dataCategoryId == "") ? null : dataCategoryId;
        
        if (categoryId != null) onInitData();
    }, []);

    //=============================================================//
    //=================== COMPONENT - LISTENER ====================//
    //=============================================================//
    const onInitData = () => {
        setLoadingContent(true);

        Promise.all([
            __apiForumThreads(dataCategoryId, forumPageNow),
        ])
        .then(([threads]) => {
            if (threads != null && !threads._error) {
                setForumPageNow(parseInt(threads.payload.current_page));
                setForumPageTotal(threads.payload.total_page);
                setForumDetail(threads.payload.forum);
                setForumThreads(threads.payload.thread);
            }

            setLoadingContent(false);
        })
        .catch((err) => {
            setLoadingContent(false);
        });
    }

    const onLoadmoreForumThreads = useCallback(() => {
        // if (forumPageTotal > forumPageNow) {
            setLoadingMore(true);
            
            Promise.all([
                __apiForumThreads(dataCategoryId, (forumPageNow + 1)),
            ]).then(([threads]) => {
                if (threads != null && !threads._error) {
                    setForumPageNow(parseInt(threads.payload.current_page));
                    setForumPageTotal(threads.payload.total_page);
                    setForumDetail(threads.payload.forum);
                    setForumThreads(forumThreads.concat(threads.payload.thread))
                }

                setLoadingMore(false);
            })
        // }
    });

    //=============================================================//
    //=================== COMPONENT - FUNCTION ====================//
    //=============================================================//
    const __apiForumThreads = async (categoryId, page) => {
        return axios.post(`/forum/${categoryId}/?page=${page}`,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return null;
        });
    }

    //==========================================================//
    //=================== COMPONENT - RENDER ===================//
    //==========================================================//
    const _renderThreadLoadmore = () => {
        return (
            <div className="flex justify-center">
                { !loadingMore && <a className="block py-2 px-4 font-bold text-xs text-center text-linkajared" onClick={() => onLoadmoreForumThreads()}>Lihat thread Lainnya</a> }
                { loadingMore && <div className="flex justify-center items-center p-4"><Spin size="default" /></div> }
            </div>
        );
    }

    const _renderThreadItem = (item, index) => {
        return (
            <Link href={`/mobiles/forum/thread/[id]?id=${item.id}`} as={`/forum/thread/${item.id}`} key={`forum-thread-${index}`}>
                <a className="flex justify-between py-2 mb-3 rounded-lg border border-pearlsoft bg-white">
                    <div className="w-16 h-16 mx-2 rounded-lg border border-pearlsoft overflow-hidden">
                        <img className="block h-full w-full object-cover object-center" src={item.picture} alt="" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold mb-2">{item.title}</h3>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center pr-2">
                                <img className="block w-6 h-6 mr-1" src={`/images/mobiles/ic_comment_outline.png`} alt={``} />
                                <div className="text-xs text-pearlroot">{item.reply_count} Balasan</div>
                            </div>
                            <div className="w-12">
                                { item.is_hot != 0 && <img className="block w-full" src={`/images/mobiles/ic_hot.png`} alt={``} /> }
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        );
    }

    const _renderCategorySort = () => {
        return (
            <div className="flex flex-wrap mb-4">
                {forumDetail != null && filters.map((item, index) => {
                    return (
                        <div
                            key={`filter-thread-${index}`}
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

    const _renderCategoryDetail = () => {
        return (
            <div className="mb-8 flex">
                <div className="w-16 h-16 rounded-full mr-3 border border-pearlsoft overflow-hidden">
                    {forumDetail != null &&
                        <img className="block h-full w-full object-cover object-center" src={forumDetail.picture} alt="" />
                    }
                </div>
                <div className="flex-1">
                    {forumDetail != null && <h3 className="text-base font-semibold mb-1">{forumDetail.title}</h3>}
                    {forumDetail != null && <p className="text-xs text-gray-500">{forumDetail.description}</p>}
                </div>
            </div>
        );
    }

    const _renderContent = () => {
        return (
            <div className="p-4 bg-white">
                {_renderCategoryDetail()}
                {/* {_renderCategorySort()} */}
                { forumThreads != null && forumThreads.length > 0 && forumThreads.map(_renderThreadItem) }
                { forumPageTotal > forumPageNow && _renderThreadLoadmore() }
            </div>
        );
    }

    const _renderLayout = () => {
        return (
            <Layout
                title={`Apa2Bisa - Forum Threads | LinkAja`}
                headerBack={`/forum`}>
                {_renderContent()}
            </Layout>
        );
    }

    if (forumDetail != null && forumThreads != null) return _renderLayout();
    else return null;
}

export async function getServerSideProps(context) {
    const params     = context.params;
    const categoryId = params.id;

    return {
        props: {
            dataCategoryId: categoryId,
        }
    }
}