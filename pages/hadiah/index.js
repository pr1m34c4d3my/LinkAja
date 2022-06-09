import { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '@/components/desktop/Layout'
import Promotions from '@/components/desktop/hadiah/Promotions'
import Skeleton from 'react-loading-skeleton'
import GrandPrizes from '@/components/desktop/hadiah/GrandPrizes'
import CardRedeems from '@/components/desktop/hadiah/CardRedeems'

export default function TukarHadiah() {

  const [redeems, setRedeems] = useState([]);
  const [promotions, setPromotions] = useState(null);

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
      apiRedeems(),
      apiPromotions(),
    ])
      .then(([
        redeems,
        promotions,
      ]) => {
        if (!redeems._error) setRedeems(redeems);
        if (!promotions._error) setPromotions(promotions);
      })
      .catch(err => {
        setRedeems(null);
        setPromotions(null);
      });
  }

  //=============================================================//
  //=================== COMPONENT - FUNCTION ====================//
  //=============================================================//
  const apiRedeems = async () => {
    return axios.post('/redeem',
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

  const apiPromotions = async () => {
    return axios.post('/dashboard/promotions',
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
    <Layout title='Tukar Hadiah'>
      {redeems.length > 0 ?
        <>
          <div className='mb-3'>
            {redeems ? <GrandPrizes redeems={redeems} /> : <div className='p-2'><Skeleton height={100} /></div>}
          </div>
          <div className='mb-3'>
            <h3 className='text-ruby-base font-extrabold text-xl'>Tukar Hadiah</h3>
            <p className='text-gray-500'>Pilih dan tukarkan hadiah dari point yang kalian kumpulkan</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-3'>
            {redeems ? <CardRedeems redeems={redeems} /> : Array(4).fill(null).map((value, index) => (<div className='p-2'><Skeleton height={50} key={index} /></div>))}
          </div>
        </> :
        <div className=''>
          <img
            className="w-full"
            src='/images/hadiah/thank-you.jpg'
            alt="Terima kasih" />
        </div>
      }

    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  return {
    props: {

    }
  }
}