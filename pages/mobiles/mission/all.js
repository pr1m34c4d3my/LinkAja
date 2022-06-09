import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import CardMission from '@/components/mobiles/mission/CardMission'
import SpecialCardMission from '@/components/mobiles/mission/SpecialCardMission'
import Layout from '@/components/mobiles/Layout'
import Skeleton from 'react-loading-skeleton'
import * as HelperComponents from '@/helpers/components'

export default function PageComponent({ showNavbar }) {
  const router = useRouter()

  const tabs = [
    {
      name: 'all',
      label: 'Semua',
    },
    {
      name: 'finish',
      label: 'Selesai',
    },
  ]

  const [myMissions, setMyMissions] = useState(null)
  const [myAlphabets, setMyAlphabets] = useState(null)

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
      apiMyMissions(),
      apiMyAlphabets(),
    ]).then(([
      myMissions,
      myAlphabets
    ]) => {
      if (!myMissions._error) setMyMissions(myMissions);
      if (!myAlphabets._error) setMyAlphabets(myAlphabets);
    }).catch(err => {
      setMyMissions(null);
      setMyAlphabets(null);
    });
  }

  //=============================================================//
  //=================== COMPONENT - FUNCTION ====================//
  //=============================================================//
  const apiMyMissions = async () => {
    return axios.post('/dashboard/my-missions',
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

  const apiMyAlphabets = async () => {
    return axios.post('/missions/my-alphabet',
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

  const handleCountMissionCompleted = () => {
    if (myMissions != null && myMissions.length > 0) {
      const arrMissionCompleted = myMissions.filter((item) => item.is_complete === true);
      return arrMissionCompleted.length;
    }
  }

  const handleCountMissionProgress = () => {
    if (myMissions != null && myMissions.length > 0) {
      const totalMission = myMissions.length;
      const completedMission = myMissions.filter((item) => item.is_complete === true);
      return ((completedMission.length / totalMission) * 100).toFixed(0);
    }
  }

  const handleCountAlphabetCompleted = () => {
    if (myAlphabets != null && myAlphabets.length > 0) {
      const arrAlphabetCompleted = myAlphabets.filter((item) => item.UserAlphabet != null);
      return arrAlphabetCompleted.length;
    }
  }

  return (
    <Layout title='Misi Harian'
      headerTitle={`Misi Harian`}
      headerBack={`/dashboard`}
      showNavbar={showNavbar}>
      <div className="bg-ruby-base p-4 text-gray-100">
        <h3 className="text-gray-100 font-bold mb-3 text-xl">Misi Harian</h3>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div
            className="bg-gray-100 rounded-full border-gray-100"
            style={{ height: '16px', borderWidth: '3px' }}
          >
            <div className="bg-ruby-base h-full rounded-full" style={{ width: `${handleCountMissionProgress()}%`, content: `` }}></div>
          </div>
          <div className="" style={{ marginTop: '-3px' }}>
            <span className="font-semibold mr-1">{handleCountMissionCompleted()}</span>
            <span className="mr-1">dari</span>
            <span className="font-semibold mr-1">{myMissions != null && myMissions.length}</span>
            <span className="">Misi Terselesaikan</span>
          </div>
        </div>
        <p>Selesaikan misi harian dan dapatkan poin untuk kamu tukar dengan hadiah</p>
      </div>
      <div>
        <div className="bg-white flex">
          {tabs.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => router.push(`/missions/${item.name}`)}
                className={`bg-white text-center flex-1 flex justify-center items-center font-bold border-t-0 border-l-0 border-r-0 cursor-pointer ${String(router.pathname).toLowerCase().startsWith(`/mobiles/misi-harian/${item.name}`)
                  ? 'border-ruby-base'
                  : 'border-gray-100'
                  }`}
                style={{ height: '44px', borderBottomWidth: '4px' }}
              >
                <span>{item.label}</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="bg-white p-4">
        <h3 className="text-center text-ruby-base font-bold text-lg mb-3">Alfabet Kamu!</h3>
        <p className="text-xs text-center mb-5">
          Lengkapi alfabet kamu dan dapatkan hadiah menarik
        </p>
        <div className="flex flex-wrap justify-center px-5 mb-4 ">
          {myAlphabets ? myAlphabets.map((item, index) => {
            return (
              <div key={index} className="w-auto" style={{ padding: '0 6px' }}>
                <span
                  className={`font-title font-bold ${item.UserAlphabet ? 'text-ruby-base' : 'text-gray-200'}`}
                  style={{ fontSize: '34px', lineHeight: '45px' }}
                >
                  {String(item.alphabet).toUpperCase()}
                </span>
              </div>
            )
          }) : <Skeleton height={100} />}
        </div>
        <div className="flex justify-center mb-5">
          <span className="mr-2 text-gray-700">Jumlah Alfabet Kamu</span>
          <span className="text-ruby-base font-bold">
            {handleCountAlphabetCompleted()} / {myAlphabets != null && myAlphabets.length}
          </span>
        </div>
        <div>
          {myMissions ? <CardMission missions={myMissions} /> : <Skeleton count={20} />}
        </div>
        <div>
          {myMissions ? <SpecialCardMission missions={myMissions} /> : <Skeleton count={20} />}
        </div>
      </div>
    </Layout >
  )
}

export async function getServerSideProps(context) {
  const showNavbar = HelperComponents.isNavbarShow(context);

  return {
    props: {
      showNavbar,
    }
  }
}