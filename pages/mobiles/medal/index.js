import { useState, useEffect } from 'react'
import axios from 'axios'

import { numberWithCommas } from '@/helpers/index'

import Link from 'next/link'

import Layout from "@/components/mobiles/Layout"
import UserMedal from '@/components/mobiles/medal/UserMedal'
import CardMedal from '@/components/mobiles/medal/CardMedal'
import Skeleton from 'react-loading-skeleton'
import { getBadgeIcon } from '@/helpers/index'

const apiMyDetail = async (session, url) => {
    return axios.get(url,
        {
            responseType: 'json',
            crossdomain: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`,
            }
        })
        .then((response) => {
            // console.log('apiMyDetail.response: ' + JSON.stringify(response.data.data));
            if (response.status === 200) {
                const resData = response.data.data;

                const _error = 0;
                const payload = resData;

                return { _error, payload };
            } else {
                return { _error: 1, message: response.data.message };
            }
        })
        .catch(error => {
            // console.log('apiMyDetail.error: ' + JSON.stringify(error));
            if (error.response !== undefined && error.response.data !== null) {
                return { _error: 1, message: error.message };
            } else {
                return { _error: 1, message: error.message };
            }
        });
}

export default function Medal({
    dataMyDetail,
}) {

    const [myDetail, setMyDetail] = useState(null);
    const [myMedals, setMyMedals] = useState(null);

    //==========================================================//
    //=================== COMPONENT - HOOKS ====================//
    //==========================================================//
    useEffect(() => {
        onInitData();
    }, [])

    //=============================================================//
    //=================== COMPONENT - LISTENER ====================//
    //=============================================================//
    const onInitData = () => {
        if (typeof dataMyDetail !== 'undefined' && dataMyDetail != null && !dataMyDetail._error) {
            setMyDetail(dataMyDetail.payload);
        }

        Promise.all([
            apiMyMedals(),
        ])
            .then(([
                resMyMedal,
            ]) => {
                if (!resMyMedal._error) setMyMedals(resMyMedal.payload);
            })
            .catch(err => {
                setMyMedals(null);
            });
    }

    //=============================================================//
    //=================== COMPONENT - FUNCTION ====================//
    //=============================================================//
    const apiMyMedals = async () => {
        return axios.post('/medal/my-medals',
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                if (res.status === 200) {
                    return res.data;
                }
            })
            .catch(err => {
                return { _error: true };
            });
    }

    //==========================================================//
    //=================== COMPONENT - RENDER ===================//
    //==========================================================//
    const _renderUserMedal = () => {
        return (
            <div className="bg-blue-500 w-full p-4 text-gray-100">
                <div className="flex justify-between items-center">
                    <div className="flex-1 flex-wrap">
                        <h3 className="font-bold text-md text-white">{myDetail.fullname}</h3>
                        <div className="">
                            <img className="inline-block w-4 h-4 mr-1" src={getBadgeIcon(myDetail.experience)} alt={``} />
                            <span className="text-3xs mr-1">{myDetail.Medal.title}</span>
                            <span className="text-3xs mr-1">|</span>
                            <span className="text-3xs mr-1">{numberWithCommas(myDetail.experience)} XP</span>
                            <span className="text-3xs mr-1">({numberWithCommas(myDetail.point)} Point)</span>
                        </div>
                    </div>
                    <div className="">
                        <Link href={`/mobiles/hadiah`} as={`/hadiah`}>
                            <a className="block py-1.5 px-4 rounded-lg font-bold text-2xs text-white bg-linkajared">Tukar Point</a>
                        </Link>
                    </div>
                </div>
                <div className='bg-white rounded my-5 grid grid-cols-2 gap-3 px-4 py-2'>
                    <div className='p-3 flex border-dashed border-gray-100 border-r-2'>
                        <div>
                            <div className='text-xs font-bold mr-2 text-black'>Total Misi</div>
                            <div className='text-xs mr-2 text-black'>0 dari 14 Selesai</div>
                        </div>
                    </div>
                    <div className='p-3 flex'>
                        <div>
                            <div className='text-xs font-bold mr-2 text-black'>Kupon</div>
                            <div className='text-xs mr-2 text-black'>-</div>
                        </div>
                    </div>
                </div>
                <div className='my-1'>
                    <Link href='/mobiles/points' as='/points'>
                        <a className='text-white text-sm font-semibold block text-center underline'>History Poin</a>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <Layout
            title='Medal'
            headerTitle='Medal'
            headerBack={`/dashboard`}>
            <div className='bg-carbon-light'>
                <div className='mb-3'>
                    {myDetail != null ? _renderUserMedal() : <Skeleton height={170} />}
                </div>
                <div className='bg-gray-50 p-4'>
                    {myMedals ? <CardMedal medals={myMedals} /> : <Skeleton count={20} />}
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const session = context.req.session;
    const myDetailUrl = `${process.env.NEXT_API_URL}/v1/home/my-detail`;
    const myDetail = await apiMyDetail(session, myDetailUrl);

    return {
        props: {
            dataMyDetail: myDetail,
        }
    }
}