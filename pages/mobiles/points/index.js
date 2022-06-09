import { useState, useEffect } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import Skeleton from 'react-loading-skeleton'
import { parseTimeAgoMini } from '@/helpers/index'
import Layout from '@/components/mobiles/Layout'
import CardPoint from '@/components/mobiles/history-point/CardPoint'

export default function HistoryPoint() {

  const [myDetail, setMyDetail] = useState(null);
  const [points, setPoints] = useState(null);
  const [pointCurrentPage, setPointCurrentPage] = useState(1);
  const [pointTotalPage, setPointTotalPage] = useState(1);

  //==========================================================//
  //=================== COMPONENT - HOOKS ====================//
  //==========================================================//
  useEffect(() => {
    apiMyDetail();
    apiPoint();
  }, []);


  //=============================================================//
  //=================== COMPONENT - FUNCTION ====================//
  //=============================================================//
  const apiMyDetail = async () => {
    return axios.post('/dashboard/my-detail',
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        if (res.status === 200) {
          const detail = res.data.payload;
          setMyDetail(detail);
        }
      })
      .catch(err => {
        setMyDetail(null);
      });
  }

  const apiPoint = async () => {
    return axios.post('/point',
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        if (res.status === 200) {
          const points = res.data.payload;
          const currentPage = res.data.payload.current_page;
          const totalPage = res.data.payload.total_page;

          setPoints(points);
          setPointCurrentPage(currentPage);
          setPointTotalPage(totalPage);
        }
      })
      .catch(err => {
        setPoints(null);
        setPointCurrentPage(1);
        setPointTotalPage(1);
      });
  }

  //==========================================================//
  //=================== COMPONENT - RENDER ===================//
  //==========================================================//
  const _renderPointItem = (item, index) => {
    return (
      <div key={index} className="bg-white mb-3">
        <div className="flex items-center border-b">
          <div className="px-4">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="39"
                height="39"
                rx="5.5"
                stroke="#E7E8F3"
              />
              <rect
                width="32"
                height="32"
                transform="translate(4 4)"
                fill="white"
              />
              <path
                d="M24.1439 16.0007C23.3281 16.0007 22.6668 16.6621 22.6668 17.4779C22.6668 18.2937 23.3281 18.9551 24.1439 18.9551C24.9597 18.9551 25.6211 18.2937 25.6211 17.4779C25.6211 16.6621 24.9597 16.0007 24.1439 16.0007Z"
                fill="#989EB8"
              />
              <path
                d="M26.8106 18.6668C25.9948 18.6668 25.3334 19.3281 25.3334 20.1439C25.3334 20.9597 25.9948 21.6211 26.8106 21.6211C27.6264 21.6211 28.2878 20.9597 28.2878 20.1439C28.2878 19.3281 27.6264 18.6668 26.8106 18.6668Z"
                fill="#989EB8"
              />
              <path
                d="M29.4773 16.0007C28.6615 16.0007 28.0001 16.6621 28.0001 17.4779C28.0001 18.2937 28.6615 18.9551 29.4773 18.9551C30.2931 18.9551 30.9545 18.2937 30.9545 17.4779C30.9545 16.6621 30.2931 16.0007 29.4773 16.0007Z"
                fill="#989EB8"
              />
              <path
                d="M26.8106 13.3347C25.9948 13.3347 25.3334 13.9961 25.3334 14.8119C25.3334 15.6277 25.9948 16.2891 26.8106 16.2891C27.6264 16.2891 28.2878 15.6277 28.2878 14.8119C28.2878 13.9961 27.6264 13.3347 26.8106 13.3347Z"
                fill="#989EB8"
              />
              <path
                d="M10.8106 16.0007C9.9948 16.0007 9.33345 16.6621 9.33345 17.4779C9.33345 18.2937 9.9948 18.9551 10.8106 18.9551C11.6264 18.9551 12.2878 18.2937 12.2878 17.4779C12.2878 16.6621 11.6264 16.0007 10.8106 16.0007Z"
                fill="#989EB8"
              />
              <path
                d="M13.4773 18.6668C12.6615 18.6668 12.0001 19.3281 12.0001 20.1439C12.0001 20.9597 12.6615 21.6211 13.4773 21.6211C14.2931 21.6211 14.9545 20.9597 14.9545 20.1439C14.9545 19.3281 14.2931 18.6668 13.4773 18.6668Z"
                fill="#989EB8"
              />
              <path
                d="M16.1439 16.0007C15.3281 16.0007 14.6668 16.6621 14.6668 17.4779C14.6668 18.2937 15.3281 18.9551 16.1439 18.9551C16.9597 18.9551 17.6211 18.2937 17.6211 17.4779C17.6211 16.6621 16.9597 16.0007 16.1439 16.0007Z"
                fill="#989EB8"
              />
              <path
                d="M13.4773 13.3347C12.6615 13.3347 12.0001 13.9961 12.0001 14.8119C12.0001 15.6277 12.6615 16.2891 13.4773 16.2891C14.2931 16.2891 14.9545 15.6277 14.9545 14.8119C14.9545 13.9961 14.2931 13.3347 13.4773 13.3347Z"
                fill="#989EB8"
              />
              <rect
                x="12"
                y="14.668"
                width="2.93333"
                height="5.33333"
                fill="#989EB8"
              />
              <rect
                x="16.1335"
                y="16"
                width="2.93333"
                height="5.33333"
                transform="rotate(90 16.1335 16)"
                fill="#989EB8"
              />
              <path
                d="M10.6667 9.93398H29.3334C31.2111 9.93398 32.7334 11.4562 32.7334 13.334V24.5847C32.7334 25.6942 32.192 26.7338 31.2831 27.3701L29.6749 28.4959C28.1118 29.59 25.9545 29.184 24.8961 27.5965L23.8275 25.9935C22.0067 23.2623 17.9934 23.2623 16.1726 25.9935L15.1039 27.5965C14.0456 29.184 11.8883 29.59 10.3252 28.4959L8.71691 27.3701C7.808 26.7338 7.26669 25.6942 7.26669 24.5847V13.334C7.26669 11.4562 8.78892 9.93398 10.6667 9.93398Z"
                stroke="#989EB8"
                strokeWidth="1.2"
              />
            </svg>
          </div>
          <div className="font-bold flex-auto py-4">
            <div className="">{item.description}</div>
            <div className="text-blue-500">
              {`+ ${item.point}`} Poin
            </div>
          </div>
          <div className="font-bold px-4 pb-4">
            {parseTimeAgoMini(new Date(item.created_at))}
          </div>
        </div>
      </div>
    )
  }

  const _renderPointList = () => {
    return (
      <InfiniteScroll
        dataLength={points.length}
        // next={fetchMoreData}
        style={{ display: 'flex', flexDirection: 'column' }} //To put endMessage and loader to the top.
        inverse={true} //
        // hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv">
        {points.map(_renderPointItem)}
      </InfiniteScroll>
    )
  }

  return (
    <Layout
      title='History Poin'
      headerTitle={`History Poin`}
      headerBack={`/medal`}>
      <div className="bg-white p-4 mb-3">
        {myDetail ? <CardPoint profile={myDetail} /> : <Skeleton height={30} />}
      </div>
      <div className='w-full h-auto'>
        {points ? _renderPointList() : <div className='p-4'><Skeleton count={10} /></div>}
      </div>
    </Layout>
  )
}