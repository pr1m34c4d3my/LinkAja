import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Layout from '@/components/desktop/Layout'
import TopThread from '@/components/desktop/forum/TopThread'
import CardGroupCategory from '@/components/desktop/group/CardGroupCategory'
import { Card } from 'antd'
import Skeleton from 'react-loading-skeleton'

export default function GroupPage() {

  const [groupList, setGroupList] = useState(null);

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
      apiGroupList(),
    ])
      .then(([
        groupList,
      ]) => {
        if (!groupList._error) setGroupList(groupList);
      })
      .catch(err => {
        setGroupList(null);
      });
  }

  //=============================================================//
  //=================== COMPONENT - FUNCTION ====================//
  //=============================================================//
  const apiGroupList = async () => {
    return axios.post('/group',
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
    <Layout title='Group'>
      <div className='flex'>
        <div className='w-12/12 pr-2 lg:w-8/12 xl:w-8/12'>
          <div className='bg-white rounded-xl p-3 mb-4'>
            <div className='w-full rounded-full flex border-4 border-gray-100 bg-gray-150 mb-4'>
              <Link href='/forum'>
                <a className='bg-gray-150 text-red-600 flex-1 text-center rounded-full py-3 font-bold'>
                  <div>
                    <span>Forum</span>
                  </div>
                </a>
              </Link>
              <Link href='/group'>
                <a className='bg-ruby-base text-gray-100 flex-1 text-center rounded-full py-3 font-bold'>
                  <div>
                    <span>Group</span>
                  </div>
                </a>
              </Link>
            </div>
            <p className='text-gray-500 mx-2'>Pilih Group yang sesuai denganmu, dan temukan hal-hal menarik.</p>
          </div>
          <div className="mb-5">
            {groupList ? groupList.map((item) => {
              return <CardGroupCategory key={item.id} data={item} />
            }) : <div className='p-2'><Skeleton height={50} /></div>}
          </div>
        </div>
        <div className='w-4/12 pl-2 mb-5 hidden lg:block xl:block'>
          {/* <Card title={cardTitleTopThread()} className="rounded-lg">
            {hotThread.map((item) => {
              return <TopThread key={item.id} item={item} />
            })}
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