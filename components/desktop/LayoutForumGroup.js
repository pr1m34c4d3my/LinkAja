import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Layout from '@/components/desktop/Layout'

export default function LayoutForumGroup({ children }) {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState('forum');

  const tabs = [
    {
      name: 'forum',
      label: 'Forum',
      path: '/forum',
      url: '/forum',
    },
    {
      name: 'group',
      label: 'Group',
      path: '/group',
      url: '/group',
    },
  ]

  //==========================================================//
  //=================== COMPONENT - RENDER ===================//
  //==========================================================//
  return (
    <>
      <Layout
        title='Apa2Bisa - Forum &amp; Group | LinkAja'>

      </Layout>
    </>
  )
}