import { useState, useEffect } from 'react'
import axios from 'axios'

import Skeleton from 'react-loading-skeleton'
import Link from 'next/link'
import Layout from '@/components/mobiles/Layout'

import * as HelperComponents from '@/helpers/components'

export default function Forum({
    showNavbar,
}) {
    const [forumList, setForumList]                 = useState(null);
    const [forumListLoading, setForumListLoading]   = useState(false);

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
        setForumListLoading(true);

        Promise.all([
            apiForumList(),
        ])
            .then(([
                forumList,
            ]) => {
                if (!forumList._error) setForumList(forumList.payload);

                setForumListLoading(false);
            })
            .catch(err => {
                setForumList(null);
                setForumListLoading(false);
            });
    }

    //=============================================================//
    //=================== COMPONENT - FUNCTION ====================//
    //=============================================================//
    const apiForumList = async () => {
        return axios.post('/forum',
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                if (res.status === 200) {
                    return res.data;
                } else {
                    return { _error: 1 };
                }
            })
    };

    //==========================================================//
    //=================== COMPONENT - RENDER ===================//
    //==========================================================//
    const _renderForumCategory = (item, index) => {
        return (
            <Link href={`/mobiles/forum/category/[id]?id=${item.id}`} as={'/forum/' + item.id} key={`forum-category-${index}`}>
                <a className="flex justify-between p-3 mb-2 rounded-lg border border-pearlsoft bg-white">
                    <div className="w-16 h-16 mr-4 rounded-full border border-pearlsoft overflow-hidden">
                        <img className="block w-full h-full object-center object-cover" src={item.picture} alt="" />
                    </div>
                    <div className="flex-1">
                        <div className="font-bold">{item.title}</div>
                        <p className="mb-1 text-xs text-pearlroot">{item.description}</p>
                        <div className="flex items-center">
                            <div className="flex items-centermr-2">
                                <img className="block w-5 h-5 mr-1" src={`/images/mobiles/ic_post_outline.png`} alt={``} />
                                <span className="text-xs text-pearlroot leading-relaxed">{item.thread_count} Threads</span>
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        );
    }

    const _renderForumCategoryLoading = () => {
        return (
            <div className='p-2'>
                <Skeleton className={`h-20 my-1`} />
                <Skeleton className={`h-20 my-1`} />
                <Skeleton className={`h-20 my-1`} />
            </div>
        );
    }

    const _renderContent = () => {
        return (
            <div className="p-4 bg-white">
                <div className="mb-3">
                    <h3 className="text-base font-semibold mb-1">Forum</h3>
                    <p className="text-xs text-gray-500">
                        Bergabung dan berdiskusi bersama dalam forum yang kamu sukai.
                    </p>
                </div>
                <div>
                    { forumListLoading && _renderForumCategoryLoading() }
                    { !forumListLoading && forumList != null && forumList.length > 0 && forumList.map(_renderForumCategory) }
                </div>
            </div>
        );
    }

    const _renderHeaderTabPaneSelected = (item, index) => {
        return (
            <Link href={item.path} as={item.url} key={`forum-group-tab-${index}`}>
                <a className={`block flex-1 justify-center items-center py-2 border border-t-0 border-b-2 border-l-0 border-r-0 border-solid border-linkajared font-bold text-center text-blackmassive`}>
                    <span>{item.label}</span>
                </a>
            </Link>
        );
    }

    const _renderHeaderTabPane = (item, index) => {
        return (
            <Link href={item.path} as={item.url} key={`forum-group-tab-${index}`}>
                <a className={`block flex-1 justify-center items-center py-2 border border-t-0 border-b-2 border-l-0 border-r-0 border-solid border-pearlsoft font-bold text-center text-blackroot`}>
                    <span>{item.label}</span>
                </a>
            </Link>
        );
    }

    const _renderHeaderTabs = () => {
        const tabs = [
            { name: 'forum', label: 'Forum', path: '/mobiles/forum', url: '/forum' }, 
            { name: 'group', label: 'Group', path: '/mobiles/group', url: '/group' }
        ]

        return (
            <div className="bg-white flex">
                { tabs.map((item, index) => {
                    if (item.name === 'forum') return _renderHeaderTabPaneSelected(item, index)
                    else return _renderHeaderTabPane(item, index)
                })}
            </div>
        );
    }

    const _renderLayout = () => {
        return (
            <Layout 
                showNavbar={showNavbar}
                title='Apa2Bisa - Forum &amp; Group | LinkAja'>
                { _renderHeaderTabs() }
                { _renderContent() }
            </Layout>
        );
    }

    return _renderLayout();
}
export async function getServerSideProps(context) {
    // console.log(`session: ${JSON.stringify(sessionAccessToken)}`);
    const showNavbar = HelperComponents.isNavbarShow(context);

    return {
        props: {
            showNavbar,
        }
    }
}