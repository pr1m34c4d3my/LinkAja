import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Layout from '@/components/mobiles/Layout'

export default function LayoutForumGroup({ showNavbar, children }) {
    const tabs = [
        {
            name: 'forum',
            label: 'Forum',
            path: '/mobiles/forum',
            url: '/forum',
        },
        {
            name: 'group',
            label: 'Group',
            path: '/mobiles/group',
            url: '/group',
        },
    ]

    //==========================================================//
    //=================== COMPONENT - RENDER ===================//
    //==========================================================//
    const _renderTabPaneSelected = (item, index) => {
        return (
            <Link href={item.path} as={item.url} key={`forum-group-tab-${index}`}>
                <a className={`block flex-1 justify-center items-center py-2 border border-t-0 border-b-2 border-l-0 border-r-0 border-solid border-linkajared font-bold text-center text-blackmassive`}>
                    <span>{item.label}</span>
                </a>
            </Link>
        );
    }

    const _renderTabPane = (item, index) => {
        return (
            <Link href={item.path} as={item.url} key={`forum-group-tab-${index}`}>
                <a className={`block flex-1 justify-center items-center py-2 border border-t-0 border-b-2 border-l-0 border-r-0 border-solid border-pearlsoft font-bold text-center text-blackroot`}>
                    <span>{item.label}</span>
                </a>
            </Link>
        );
    }

    return (
        <Layout 
            showNavbar={showNavbar}
            title='Apa2Bisa - Forum &amp; Group | LinkAja'>

            <div className="bg-white flex">
                { tabs.map((item, index) => {
                    if (item.name === 'forum') return _renderTabPaneSelected(item, index)
                    else return _renderTabPane(item, index)
                })}
            </div>
            <div>{children}</div>
        </Layout>
    )
}