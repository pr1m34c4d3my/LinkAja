import { useState, useEffect } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import Skeleton from 'react-loading-skeleton'
import moment from 'moment'
import Layout from '@/components/desktop/Layout'
import CardPoint from '@/components/desktop/history-point/CardPoint'
import ItemHistory from '@/components/desktop/history-point/ItemHistory'

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
      <ItemHistory key={index} item={item} />
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
        scrollableTarget="scrollableDiv"
      >
        {points.map(_renderPointItem)}
      </InfiniteScroll>

    )
  }

  return (
    <Layout title='History Poin'>
      <div className='mb-3'>
        {myDetail ? <CardPoint profile={myDetail} /> : <Skeleton height={30} />}
      </div>
      <div className='m-4'>
        <h3 className='font-black text-gray-600 text-xl'>Riwayat Transaksi</h3>
      </div>
      <div className='bg-white p-4 rounded-xl mb-3'>
        {points ? _renderPointList() : <Skeleton count={10} />}
      </div>
    </Layout>
  )
}