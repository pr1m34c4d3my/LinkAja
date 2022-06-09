import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Layout from '@/components/desktop/Layout'
import TopThread from '@/components/desktop/forum/TopThread'
import CardForumCategory from '@/components/desktop/forum/CardForumCategory'
import { Card } from 'antd'
import Skeleton from 'react-loading-skeleton'

export default function ForumPage() {

  const [forumList, setForumList] = useState(null);

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
      apiForumList(),
    ])
      .then(([
        forumList,
      ]) => {
        if (!forumList._error) setForumList(forumList);
      })
      .catch(err => {
        setForumList(null);
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
          return res.data.payload;
        } else {
          return null;
        }
      })
  };


  function cardTitleTopThread() {
    return (
      <div className="flex items-center font-bold">
        <div className="mr-2">
          <img src='/images/desktop/hot.png' className='h-4' />
        </div>
        <span>5 Hot Thread</span>
      </div>
    )
  }

  //==========================================================//
  //=================== COMPONENT - RENDER ===================//
  //==========================================================//
  return (
    <Layout title='Forum'>
      <div className='flex'>
        <div className='w-12/12 pr-2 lg:w-8/12 xl:w-8/12'>
          <div className='bg-white rounded-xl p-3 mb-4'>
            <div className='w-full rounded-full flex border-4 border-gray-100 bg-gray-150 mb-4'>
              <Link href='/forum'>
                <a className='bg-ruby-base text-gray-100 flex-1 text-center rounded-full py-3 font-bold'>
                  <div>
                    <span>Forum</span>
                  </div>
                </a>
              </Link>
              <Link href='/group'>
                <a className='bg-gray-150 text-red-600 flex-1 text-center rounded-full py-3 font-bold'>
                  <div>
                    <span>Group</span>
                  </div>
                </a>
              </Link>
            </div>
            <p className='text-gray-500 mx-2'>Bergabung dan berdiskusi bersama dalam forum yang kamu sukai.</p>
          </div>
          <div className="mb-5">
            {forumList ? forumList.map((item) => {
              return <CardForumCategory key={item.id} data={item} />
            }) : Array(5).fill(null).map((value, index) => (<div className='p-2'><Skeleton height={50} key={index} /></div>))}
          </div>
        </div>
        <div className='w-4/12 pl-2 mb-5 hidden lg:block xl:block'>
          {/* <Card title={cardTitleTopThread()} className="rounded-lg">
            {forumList ? <TopThread hots={forumList} /> : Array(5).fill(null).map((value, index) => (<div className='p-2'><Skeleton height={50} key={index} /></div>))}
          </Card> */}
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {

  return {
    props: {}
  }
}