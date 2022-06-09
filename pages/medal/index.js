import { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '@/components/desktop/Layout'
import UserMedal from '@/components/desktop/medal/UserMedal'
import CardMedal from '@/components/desktop/medal/CardMedal'
import Skeleton from 'react-loading-skeleton'

export default function MedalPage() {

  const [myDetail, setMyDetail] = useState(null);
  const [myMedals, setMyMedals] = useState(null);


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
      apiMyDetail(),
      apiMyMedals(),
    ])
      .then(([
        myDetail,
        myMedals,
      ]) => {
        if (!myDetail._error) setMyDetail(myDetail);
        if (!myMedals._error) setMyMedals(myMedals);
      })
      .catch(err => {
        setMyDetail(null);
        setMyMedals(null);

      });
  }


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
          return res.data.payload;
        } else {
          return null;
        }
      })
      .catch(err => {
        return null;
      });
  }

  const apiMyMedals = async () => {
    return axios.post('/medal/my-medals',
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
      .catch(err => {
        return null;
      });
  }

  return (
    <Layout title='Medal'>
      <div className='mb-2 hidden lg:block xl:block'>
        {myDetail ? <UserMedal profile={myDetail} /> : <Skeleton height={40} />}
      </div>
      <div className='py-4'>
        <h3 className='font-extrabold text-gray-900 text-xl'>Medali</h3>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4'>
        {myMedals ? <CardMedal medals={myMedals} /> : Array(4).fill(null).map((value, index) => (<Skeleton key={index} count={10} />))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {

  return {
    props: {}
  }
}