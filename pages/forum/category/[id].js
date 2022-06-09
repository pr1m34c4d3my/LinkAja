import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import axios from 'axios'
import CardForumThread from '@/components/desktop/forum/CardForumThread'
import Layout from '@/components/desktop/Layout'
import TopThread from '@/components/desktop/forum/TopThread'
import { Breadcrumb, Card, Spin } from 'antd'
import Skeleton from 'react-loading-skeleton'

export default function ForumCategory({ dataCategoryId }) {

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

  const [loadingContent, setLoadingContent] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [forumPageNow, setForumPageNow] = useState(1);
  const [forumPageTotal, setForumPageTotal] = useState(1);
  const [forumDetail, setForumDetail] = useState(null);
  const [forumThreads, setForumThreads] = useState(null);

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

  const _renderThreadLoadmore = () => {
    return (
      <div className="flex justify-center">
        {!loadingMore && <a className="block py-2 px-4 font-bold text-xs text-center text-linkajared" onClick={() => onLoadmoreForumThreads()}>Lihat thread Lainnya</a>}
        {loadingMore && <div className="flex justify-center items-center p-4"><Spin size="default" /></div>}
      </div>
    );
  }

  const _renderCategoryList = () => {
    return (
      <div>
        {
          forumThreads != null && forumThreads.map((item, index) => {
            return <CardForumThread key={`forum-thread-${index}`} data={item} />
          })
        }
        {forumPageTotal > forumPageNow && _renderThreadLoadmore()}
      </div>
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
      <div className="mb-3 flex">
        <div style={{ height: '64px', width: '64px' }} className="rounded-full mr-3">
          {forumDetail != null &&
            <img
              src={forumDetail.picture}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          }
        </div>
        <div className="flex-1">
          {forumDetail != null && <h3 className="text-base font-semibold mb-1">{forumDetail.title}</h3>}
          {forumDetail != null && <p className="text-xs text-gray-500">{forumDetail.description}</p>}
          {forumDetail != null && <div className="flex items-center">
            <div className="mr-2">
              <svg
                width="14"
                height="17"
                viewBox="0 0 14 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.50015 4.50098L0.500149 14.5082C0.500149 15.8292 1.09827 16.5 2.41827 16.5C2.41827 16.5 3.14874 16.5 6.50018 16.5"
                  stroke="#989EB8"
                  strokeLinecap="round"
                />
                <path
                  d="M12.0002 0.500007L2.41827 0.500006C1.09827 0.500006 0.500149 1.17179 0.500149 2.49179L0.500149 7"
                  stroke="#989EB8"
                  strokeLinecap="round"
                />
                <path
                  d="M8.53561 0.500977L11.482 0.500977C12.802 0.500977 13.4001 1.17178 13.4001 2.49276L13.4001 14.5C13.4001 15.6046 12.5047 16.5 11.4001 16.5H6.50024"
                  stroke="#989EB8"
                  strokeLinecap="round"
                />
                <path
                  d="M10.1002 4.2998H4.10016"
                  stroke="#989EB8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.1002 7.1001H4.10016"
                  stroke="#989EB8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.1002 9.5H4.10022"
                  stroke="#989EB8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.1002 12.5H4.10022"
                  stroke="#989EB8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-xs text-gray-500">{forumDetail.thread_count} Threads</div>
          </div>}
        </div>
      </div>
    );
  }

  const _renderBreadcrumb = () => {
    return (
      <div className="mb-3">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link href='/forum'>
              <a>Forum</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{forumDetail.title}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }

  const _renderContent = () => {
    return (
      <div className='flex'>
        <div className='w-8/12 pr-2'>
          {_renderBreadcrumb()}
          <div className='bg-white rounded-xl p-3 mb-4'>
            {_renderCategoryDetail()}
            {_renderCategorySort()}
            {_renderCategoryList()}
          </div>
        </div>
        <div className='w-4/12 pl-2 mb-5'>
          {/* <Card title={cardTitleTopThread()} className="rounded-lg">
            {hotThread.map((item) => {
              return <TopThread key={item.id} item={item} />
            })}
          </Card> */}
        </div>
      </div>
    );
  }

  const _renderLayout = () => {
    return (
      <Layout
        title='Forum'>
        {_renderContent()}
      </Layout>
    );
  }

  if (forumDetail != null && forumThreads != null) return _renderLayout();
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