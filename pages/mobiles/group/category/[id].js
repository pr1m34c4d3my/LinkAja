import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

import { Spin } from 'antd'
import Link from 'next/link'
import Layout from '@/components/mobiles/Layout'


export default function GroupCategory({
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

    const [activefilter, setActiveFilter] = useState(filters[0].name)

    const [loadingContent, setLoadingContent]   = useState(false);
    const [loadingMore, setLoadingMore]         = useState(false);

    const [groupPageNow, setGroupPageNow]       = useState(1);
    const [groupPageTotal, setGroupPageTotal]   = useState(1);
    const [groupCategoryId, setGroupCategoryId] = useState(null);
    const [groupDetail, setGroupDetail]         = useState(null);
    const [groupPosts, setGroupPosts]           = useState(null);

    //==========================================================//
    //=================== COMPONENT - HOOKS ====================//
    //==========================================================//
    useEffect(() => {
        const categoryId = (typeof dataCategoryId == 'undefined' || dataCategoryId == "") ? null : dataCategoryId;
        
        if (categoryId != null) {
            setGroupCategoryId(categoryId);
            onInitData();
        }
    }, []);

    //=============================================================//
    //=================== COMPONENT - LISTENER ====================//
    //=============================================================//
    const onInitData = () => {
        setLoadingContent(true);

        Promise.all([
            __apiGroupPosts(dataCategoryId, groupPageNow),
        ])
        .then(([posts]) => {
            if (posts != null && !posts._error) {
                setGroupPageNow(parseInt(posts.payload.current_page));
                setGroupPageTotal(posts.payload.total_page);
                setGroupDetail(posts.payload.group);
                setGroupPosts(posts.payload.post);
            }

            setLoadingContent(false);
        })
        .catch((err) => {
            setLoadingContent(false);
        });
    }

    const onLoadmoreGroupPosts = useCallback(() => {
        if (groupPageTotal > groupPageNow) {
            setLoadingMore(true);

            Promise.all([
                __apiGroupPosts(dataCategoryId, (groupPageNow + 1)),
            ]).then(([posts]) => {
                if (!posts._error) {
                    setGroupPageNow(parseInt(posts.payload.current_page));
                    setGroupPageTotal(posts.payload.total_page);
                    setGroupDetail(posts.payload.group);
                    setGroupPosts(groupPosts.concat(posts.payload.post))
                }

                setLoadingMore(false);
            })
        }
    });

    const onClickPostLike = async (post) => {
        if (typeof post !== 'undefined' && post != null) {
            const apiPostLike = await __apiPostLike(post);

            if (!apiPostLike._error) {
                const apiGroupPosts = await __apiGroupPosts(dataCategoryId, groupPageNow);

                if (!apiGroupPosts._error) {
                    setGroupPosts(apiGroupPosts.payload.post);
                }
            }
        }
    }

    //=============================================================//
    //=================== COMPONENT - FUNCTION ====================//
    //=============================================================//
    const __apiGroupPosts = async (categoryId, page) => {
        return axios.post(`/group/${categoryId}/?page=${page}`,
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

    const __apiPostList = async () => {
        if (groupCategoryId != null) {
            return axios.post(`/group/${groupCategoryId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(res => {
                    return res.data;
                })
                .catch(err => {
                    return { _error: true };
                });
        }
    }

    const __apiPostLike = async (post) => {
        if (post != null) {
            return axios.post(`/group/post/${post.id}/like`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(res => {
                    return res.data;
                })
                .catch(err => {
                    return { _error: true };
                });
        }
    }

    //==========================================================//
    //=================== COMPONENT - RENDER ===================//
    //==========================================================//
    const _renderPostLoadmore = () => {
        return (
            <div className="flex justify-center">
                { !loadingMore && <a className="block py-2 px-4 font-bold text-xs text-center text-linkajared" onClick={() => onLoadmoreGroupPosts()}>Lihat post Lainnya</a> }
                { loadingMore && <div className="flex justify-center items-center p-4"><Spin size="default" /></div> }
            </div>
        );
    }

    const _renderCategoryItem = (item, index) => {
        return (
            <div className="py-2" key={`group-post-${index}`}>
                <div className="rounded-lg border border-pearlsoft bg-white overflow-hidden">
                    <div className="">
                        <Link href={`/mobiles/group/post/[id]?id=${item.id}`} as={`/group/post/${item.id}`}>
                            <a className="block">
                                <div className="w-full h-40 overflow-hidden">
                                    <img className="block w-full h-full object-center object-cover" src={item.picture} alt={``} />
                                </div>
                                <div className="p-4">
                                    <p className="text-sm">{item.title}</p>
                                </div>
                            </a>
                        </Link>
                    </div>
                    <div className="flex border border-b-0 border-l-0 border-r-0 border-pearlsoft">
                        <a className="flex-1 flex justify-center items-center p-2 border border-t-0 border-b-0 border-l-0 border-pearlsoft" onClick={() => onClickPostLike(item)}>
                            <div className="h-full">
                                {item.me_like.user_id == null && <img className="inline-block w-5 h-5 mr-1 object-center object-cover" src={`/images/mobiles/ic_love_false.png`} alt={``} />}
                                {item.me_like.user_id != null && <img className="inline-block w-5 h-5 mr-1 object-center object-cover" src={`/images/mobiles/ic_love_true.png`} alt={``} />}
                                <span className="text-xs mr-1">Suka</span>
                                <span className="text-xs">({item.like_count})</span>
                            </div>
                        </a>
                        <Link href={`/mobiles/group/post/[id]?id=${item.id}`} as={`/group/post/${item.id}`}>
                            <a className="flex-1 flex justify-center items-center p-2">
                                <div className="h-full">
                                    <img className="inline-block w-5 h-5 mr-1 object-center object-cover" src={`/images/mobiles/ic_comment_outline.png`} alt={``} />
                                    <span className="text-xs mr-1">Komentar</span>
                                    <span className="text-xs">({item.comment_count})</span>
                                </div>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const _renderCategoryList = () => {
        return (
            <div className="pt-4">
                {groupPosts != null && groupPosts.map(_renderCategoryItem)}
            </div>
        );
    }

    const _renderCategorySort = () => {
        return (
            <div className="flex flex-wrap mb-4">
                {groupDetail != null && filters.map((item, index) => {
                    return (
                        <div
                            key={`filter-post-${index}`}
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
            <div className="mb-3 flex">
                <div style={{ height: '64px', width: '64px' }} className="rounded-full mr-3">
                    {groupDetail != null &&
                        <img
                            src={groupDetail.picture}
                            alt=""
                            className="h-full w-full object-cover object-center rounded-full"
                        />
                    }
                </div>
                <div className="flex-1">
                    {groupDetail != null && <h3 className="text-base font-semibold mb-1">{groupDetail.title}</h3>}
                    {groupDetail != null && <p className="text-xs text-gray-500">{groupDetail.description}</p>}
                </div>
            </div>
        );
    }

    const _renderContent = () => {
        return (
            <div className="p-4 bg-white">
                {_renderCategoryDetail()}
                {/* { _renderCategorySort() } */}
                {_renderCategoryList()}
                { groupPageTotal > groupPageNow && _renderPostLoadmore() }
            </div>
        );
    }

    const _renderLayout = () => {
        return (
            <Layout
                title={``}
                headerTitle={`Group Kategori`}
                headerBack={`/group`}>
                {_renderContent()}
            </Layout>
        );
    }

    if (groupDetail != null && groupPosts != null) return _renderLayout();
    else return null;
}

export async function getServerSideProps(context) {
    const params = context.params;
    const categoryId = params.id;

    return {
        props: {
            dataCategoryId: categoryId,
        }
    }
}