import { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '@/components/desktop/Layout'

export default function BisaBuka() {

  const [gameUrl, setGameUrl] = useState(null)

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
    apiInitGameBisaBuka()
  }

  const apiInitGameBisaBuka = async () => {
    return axios.post('/permainan/bisa-buka',
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        console.log(`redirect: ${JSON.stringify(res.data)}`);
        if (!res.data._error) {
          setGameUrl(res.data.payload)
        }
      })
      .catch(err => {
        setGameUrl(null);
      });
  }

  return (
    <Layout title='Permainan - Bisa Buka'>
      <div className='bg-white p-3 rounded-xl mb-4'>
        <div className='w-full'>
          <iframe
            className='flex mx-auto'
            width="338" height="620"
            scrolling="none"
            frameBorder="0"
            webkitallowfullscreen="webkitallowfullscreen"
            mozallowfullscreen="mozallowfullscreen"
            allowFullScreen="allowfullscreen"
            src={gameUrl}></iframe>
        </div>
      </div>
    </Layout>
  )
}