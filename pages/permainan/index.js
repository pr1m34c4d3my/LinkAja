import axios from 'axios'
import Link from 'next/link'
import Layout from '@/components/desktop/Layout'
import TopBanner from '@/components/desktop/games/TopBanner'

export default function Game() {

  //=============================================================//
  //=================== COMPONENT - LISTENER ====================//
  //=============================================================//
  const onClickGameNav = (e, game) => {
    e.preventDefault();

    if (game === 'Bisa Tangkap') {
      apiInitGameBisaTangkap();
    } else if (game === 'Bisa Buka') {
      apiInitGameBisaBuka();
    } else if (game === 'Bisa Jawab') {
      apiInitGameBisaJawab();
    } else {

    }
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
          window.open(res.data.payload, '_blank');
        }
      })
      .catch(err => {
        console.log(err)
      });
  }

  const apiInitGameBisaJawab = async () => {
    return axios.post('/permainan/bisa-jawab',
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        console.log(`redirect: ${JSON.stringify(res.data)}`);
        if (!res.data._error) {
          window.open(res.data.payload, '_blank');
        }
      })
      .catch(err => {
        console.log(err)
      });
  }

  const apiInitGameBisaTangkap = async () => {
    return axios.post('/permainan/bisa-tangkep',
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        console.log(`redirect: ${JSON.stringify(res.data)}`);
        if (!res.data._error) {
          window.open(res.data.payload, '_blank');
        }
      })
      .catch(err => {
        console.log(err)
      });
  }

  const topBanner = {
    image: '/images/desktop/permainan-apa2bisa.png',
    title: 'Permainan Apa2Bisa'
  }

  const virtualCity = {
    image: '/images/desktop/virtual-city-coming-soon.png',
    title: 'Virtual City Comming Soon'
  }

  const data = [
    {
      title: 'Bisa Buka',
      summary: 'Tebak pintu dimana pintu yang terdapat poin paling banyak?',
      chances: 1,
      isEnable: true,
      imgPath: '/images/games/thumbnail/bisa-aja.png',
      path: '/permainan/bisa-buka',
      url: '/permainan/bisa-buka',
    },
    {
      title: 'Bisa Tangkap',
      summary: 'Lihat hadiahmu dan pancing sekarang',
      chances: 1,
      isEnable: process.env.BISA_TANGKAP_ENABLED,
      imgPath: '/images/games/thumbnail/lomba-aja.png',
      path: '/permainan/bisa-tangkep',
      url: '/permainan/bisa-tangkep',
    },
    {
      title: 'Bisa Jawab',
      summary: 'Asah kemampuanmu dalam kuis A-Z',
      chances: 1,
      isEnable: process.env.BISA_JAWAB_ENABLED,
      imgPath: '/images/games/thumbnail/kuis-a-z.png',
      path: '/permainan/bisa-jawab',
      url: '/permainan/bisa-jawab',
    }
  ]

  function renderChancesText(game) {
    const { chances } = game
    if (chances >= 1) {
      return <p className="text-gray-500 text-xs text-center">Kesempatan Bermain {chances}x Lagi di Hari ini</p>
    } else {
      return (
        <p className="text-gray-500 text-xs text-center">
          Kesempatan Bermain Telah Habis, Coba Kembali Hari Berikutnya
        </p>
      )
    }
  }

  //==========================================================//
  //=================== COMPONENT - RENDER ===================//
  //==========================================================//
  return (
    <Layout title='Permainan'>
      <div className='mb-3'>
        <TopBanner data={topBanner} />
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {data.map((item, index) => {
          return (
            <div key={index} className={`${item.isEnable ? 'bg-white' : 'bg-gray-100'} rounded-lg overflow-hidden flex flex-col`}>
              <div className="p-2 flex justify-center">
                <div
                  style={{ height: '100px', width: '100px' }}
                  className="mt-3"
                >
                  <img
                    src={item.imgPath}
                    alt=""
                    className="w-full h-full object-cover object-center rounded-full"
                  />
                </div>
              </div>
              <div className="p-3 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-bold mb-3 text-gray-800 text-lg text-center">
                    {item.title}
                  </h3>
                  <p className="text-gray-800 text-md text-center">
                    {item.summary}
                  </p>
                </div>
                <div className="flex justify-center py-2">
                  {item.isEnable ?
                    <a
                      className="bg-ruby-base px-10 py-2 text-gray-100 rounded-sm font-extrabold text-md rounded-full hover:text-white"
                      onClick={(e) => onClickGameNav(e, item.title)} >
                      Mainkan
                    </a>
                    : <div className='bg-gray-400 px-10 py-2 text-gray-100 rounded-sm font-extrabold text-md rounded-full hover:text-white'>
                      Comming Soon
                    </div>
                  }
                </div>
                {/* <div>
                  {renderChancesText(item)}
                </div> */}
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {

  return {
    props: {}
  }
}