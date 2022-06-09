import { useState, useEffect } from 'react'
import axios from 'axios'
import GrandPrizes from '@/components/mobiles/hadiah/GrandPrizes'
import CardRedeems from '@/components/mobiles/hadiah/CardRedeems'
import Layout from '@/components/mobiles/Layout'
import Skeleton from 'react-loading-skeleton'

export default function Hadiah() {

  const [redeems, setRedeems] = useState([]);

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
    ])
      .then(([
        redeems,
      ]) => {
        if (!redeems._error) setRedeems(redeems);
      })
      .catch(err => {
        setRedeems(null);
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

  return (
    <Layout
      title='Hadiah'
      headerTitle={`Hadiah`}
      headerBack={`/dashboard`}
    >
      <div className="bg-white p-4 min-h-screen">
        {redeems ?
          <>
            {redeems.length > 0 ?
              <>
                <GrandPrizes redeems={redeems} />
                <CardRedeems redeems={redeems} />
              </>
              :
              <div className=''>
                <img
                  className="w-full"
                  src='/images/hadiah/thank-you.jpg'
                  alt="Terima kasih" />
              </div>
            }
          </>
          : <Skeleton count={20} />
        }
      </div>
    </Layout >
  )
}