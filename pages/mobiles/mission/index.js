import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Tabs } from 'antd'
import { BottomSheet } from 'react-spring-bottom-sheet'
import Router from 'next/router'
import Layout from '@/components/mobiles/Layout'
import ProgressMission from '@/components/mobiles/mission/ProgressMission'
import 'react-spring-bottom-sheet/dist/style.css'
import {
    FacebookIcon, TwitterIcon, WhatsappIcon, LinkedinIcon,
    FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton,
} from 'react-share';
import QRCode from "react-qr-code"

const apiMyMissions = async (session, url) => {
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
            // console.log('apiMyMissions.response: ' + JSON.stringify(response.data.data));
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
            // console.log('apiMyMissions.error: ' + JSON.stringify(error));
            if (error.response !== undefined && error.response.data !== null) {
                return { _error: 1, message: error.message };
            } else {
                return { _error: 1, message: error.message };
            }
        });
}

export default function Missions({
    dataMissions,
    datafrontUrl
}) {

    const [myDetail, setMyDetail] = useState(null);
    const [open, setOpen] = useState(false);
    const [missionAll, setMissionAll] = useState(null);
    const [missionDailys, setMissionDailys] = useState(null);
    const [missionSpecials, setMissionSpecials] = useState(null);
    const [missionConvensionals, setMissionConvensionals] = useState(null);
    const [missionSyariahs, setMissionSyariahs] = useState(null);

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
        ])
            .then(([
                myDetail,
            ]) => {
                if (!myDetail._error) setMyDetail(myDetail);
            })
            .catch(err => {
                setMyDetail(null);

            });
        if (typeof dataMissions !== 'undefined' && dataMissions != null && !dataMissions._error) {
            setMissionAll(dataMissions.payload);
            handleMissionDaily(dataMissions.payload);
            handleMissionSpecial(dataMissions.payload);
            handleMissionConvensional(dataMissions.payload);
            handleMissionSyariah(dataMissions.payload);
        }
    }

    const onClickMissionConditionItem = (missionCondition) => {
        const linkPath = __handleMissionDialyConditionLinkPath(missionCondition);
        const linkUrl = __handleMissionDialyConditionLinkUrl(missionCondition);
        console.log(`linkPath: ${linkPath}`)
        console.log(`linkUrl: ${linkPath}`)
        Router.push(linkPath, linkUrl);
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

    const handleMissionDaily = (missions) => {
        const missionDailys = missions.filter((item) => item.is_weekly == false && item.is_visible == true);
        setMissionDailys(missionDailys);
    }

    const handleMissionSpecial = (missions) => {
        const missionSpecials = missions.filter((item) => item.is_weekly == true);
        setMissionSpecials(missionSpecials);
    }

    const handleMissionConvensional = (missions) => {
        const missionConvensionals = missions.filter((item) => item.is_weekly == true && item.is_syariah == false);
        setMissionConvensionals(missionConvensionals);
    }

    const handleMissionSyariah = (missions) => {
        const missionSyariahs = missions.filter((item) => item.is_weekly == true && item.is_syariah == true);
        setMissionSyariahs(missionSyariahs);
    }

    const __handleMissionDialyConditionLinkPath = (missionCondition) => {
        if (missionCondition.flag == 'CEK_LOGIN') {
            return `/mobiles/forum`;
        } else if (missionCondition.flag == 'CEK_GROUP') {
            return `/mobiles/group`;
        } else if (missionCondition.flag == 'CEK_FORUM') {
            return `/mobiles/forum`;
        } else if (missionCondition.flag == 'BERGAUL_GROUP') {
            return `/mobiles/group`;
        } else if (missionCondition.flag == 'BERGAUL_LIKE') {
            return `/mobiles/group`;
        } else if (missionCondition.flag == 'BERGAUL_SHARE') {
            return `/mobiles/group`;
        } else if (missionCondition.flag == 'BUKA_AJA') {
            return `/mobiles/permainan`;
        } else if (missionCondition.flag == 'MANCING_AJA') {
            return `/mobiles/permainan`;
        } else if (missionCondition.flag == 'JAWAB_AJA') {
            return `/mobiles/permainan`;
        } else if (missionCondition.flag == 'BAGIKAN_AJA') {
            setOpen(true)
            return ``;
        }
        else return ``;
    }

    const __handleMissionDialyConditionLinkUrl = (missionCondition) => {
        if (missionCondition.flag == 'CEK_LOGIN') {
            return `/forum`;
        } else if (missionCondition.flag == 'CEK_GROUP') {
            return `/group`;
        } else if (missionCondition.flag == 'CEK_FORUM') {
            return `/forum`;
        } else if (missionCondition.flag == 'BERGAUL_GROUP') {
            return `/group`;
        } else if (missionCondition.flag == 'BERGAUL_LIKE') {
            return `/group`;
        } else if (missionCondition.flag == 'BERGAUL_SHARE') {
            return `/group`;
        } else if (missionCondition.flag == 'BUKA_AJA') {
            return `/permainan`;
        } else if (missionCondition.flag == 'MANCING_AJA') {
            return `/permainan`;
        } else if (missionCondition.flag == 'JAWAB_AJA') {
            return `/permainan`;
        } else if (missionCondition.flag == 'BAGIKAN_AJA') {
            setOpen(true)
            return ``;
        }
        else return ``;
    }

    const _handleClickMissionSpecial = (item) => {
        let urlLinkAja = process.env.DAILY_MISSION_URL;
        if (!item.is_complete) {
            Router.push(urlLinkAja);
        }
    }

    const getIconPath = (flag) => {
        if (flag == 'LOGIN') return `/images/mobiles/ic_mission_login.png`;
        else if (flag == 'PROFILE') return `/images/mobiles/ic_mission_profile.png`;
        else if (flag == 'CEK_AJA') return `/images/mobiles/ic_mission_cek.png`;
        else if (flag == 'BERGAUL_AJA') return `/images/mobiles/ic_mission_gaul.png`;
        else if (flag == 'MAIN_AJA') return `/images/mobiles/ic_mission_game.png`;
        else if (flag == 'BAGIKAN_AJA') return `/images/mobiles/ic_mission_invite.png`;
        else if (flag == 'TRANSAKSI_AZ' || flag == 'SPECIAL_AZ') return `/images/mobiles/ic_mission_transaction.png`;
        else if (flag == 'JADI_BERKAH' || flag == 'SPECIAL_BERKAH') return `/images/mobiles/ic_mission_berkah.png`;
    }

    const getIconCompleted = (completed) => {
        if (completed == true) {
            return <img className="block w-5 h-5" src='/images/mobiles/ic-bullet-true.png' />
        } else {
            return <img className="block w-5 h-5" src='/images/mobiles/ic-bullet-false.png' />
        }
    }

    const getIconLocked = (completed) => {
        if (completed == true) {
            return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17ZM18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM8.9 6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8H8.9V6ZM18 20H6V10H18V20Z" fill="#E3292B" />
            </svg>
        } else {
            return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17ZM18 8H17V6C17 3.24 14.76 1 12 1C9.95097 1 8.18855 2.2346 7.41652 4C7.5 4 8 4 8 4C8.39984 4 8 4 8.5 4H9C9.5 4 9.43469 4 9.5 4C9.56531 4 9.5 4 9.63278 4C10.2018 3.3275 11.0517 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM18 20H6V10H18V20Z" fill="#989EB8" />
            </svg>
        }
    }

    //==========================================================//
    //=================== COMPONENT - RENDER ===================//
    //==========================================================//
    const _renderMissionCondition = (item, index) => {
        return (
            <a className="flex justify-between items-center p-3 mt-2 mb-2 rounded-md border bg-white" key={`mission-conditions-${index}`} onClick={() => onClickMissionConditionItem(item)}>
                <div className="mr-1">
                    {getIconCompleted(item.is_complete)}
                </div>
                <div className="flex-1 ml-1 mr-1">
                    <h5 className="font-bold text-sm text-blackbase">{item.title}</h5>
                    {(item.flag === 'TRANSAKSI' || item.flag === 'TRANSAKSI_SYARIAH' || item.flag === 'SPECIAL_AZ' || item.flag === 'SPECIAL_BERKAH') &&
                        <p className="text-sm text-blackroot">{item.description}</p>
                    }
                </div>
                <div className="ml-1">
                    <img className="block w-5 h-5" src={`/images/mobiles/ic_chevron_right.png`} />
                </div>
            </a>
        );
    }

    const _renderMissionConditionSpecial = (item, index) => {
        return (
            <a className="flex justify-between items-center p-3 mt-2 mb-2 rounded-md border bg-white" key={`mission-${index}`} onClick={() => _handleClickMissionSpecial(item)}>
                <div className="mr-1">
                    {getIconLocked(item.is_complete)}
                </div>
                <div className="flex-1 ml-1 mr-1">
                    <h5 className="font-bold text-sm text-blackbase">{item.title}</h5>
                    <p className='text-sm text-blackbase'>{item.description}</p>
                    <div className="flex flex-row py-2">
                        <div className="flex flex-row items-center py-0.5 px-3 mr-2 rounded-2xl bg-reddark">
                            <img className="w-3 h-3 mr-2" src="/images/mobiles/ic_point.png" alt={``} />
                            <span className="text-2xs text-white">{`+ ${item.point} Poin`}</span>
                        </div>
                        <div className="flex flex-row items-center py-0.5 px-3 rounded-2xl bg-reddark">
                            <img className="w-3 h-3 mr-2" src="/icons/xp.png" alt={``} />
                            <span className="text-2xs text-white">{`+ ${item.experience} Xp`}</span>
                        </div>
                    </div>
                </div>
                <div className="ml-1">
                    <img className="block w-5 h-5" src={`/images/mobiles/ic_chevron_right.png`} />
                </div>
            </a>
        )
    }

    const _renderMissionItem = (item, index) => {
        let missionBackground = '';

        if (item.flag == 'SPECIAL_BERKAH' || item.flag == 'JADI_BERKAH') {
            missionBackground = `bg-m-medals-syariah`;
        } else {
            missionBackground = `bg-m-medals`;
        }

        return (
            <div className={`w-full p-4 mb-4 rounded-xl border border-pearlsoft bg-no-repeat bg-cover bg-right-top ${missionBackground}`} key={`mission-${index}`}>
                <div className="flex flex-row mb-2">
                    <img className="w-12 h-12" src={getIconPath(item.flag)} alt={item.description} />
                    <div className="ml-3">
                        <h3 className="font-extrabold text-lg text-reddark">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                </div>
                {(item.flag !== 'SPECIAL_AZ' && item.flag !== 'SPECIAL_BERKAH') &&
                    <div className="flex flex-row">
                        <div className="flex flex-row items-center py-0.5 px-3 mr-2 rounded-2xl bg-reddark">
                            <img className="w-3 h-3 mr-2" src="/images/mobiles/ic_point.png" alt={``} />
                            <span className="text-2xs text-white">{`+ ${item.point} Poin`}</span>
                        </div>
                        <div className="flex flex-row items-center py-0.5 px-3 rounded-2xl bg-reddark">
                            <img className="w-3 h-3 mr-2" src="/icons/xp.png" alt={``} />
                            <span className="text-2xs text-white">{`+ ${item.experience} Xp`}</span>
                        </div>
                    </div>
                }
                <div className="mt-5">
                    {item.MissionConditions.length > 0 && item.MissionConditions.map(_renderMissionCondition)}
                </div>
            </div>
        );
    }

    const _renderMissionConvensional = () => {
        return (
            <div>
                <div className="flex flex-row mb-2">
                    <img className="w-12 h-12" src={`/images/mobiles/ic_mission_transaction.png`} alt='Transaksi A-Z' />
                    <div className="ml-3">
                        <h3 className="font-extrabold text-lg text-reddark">Transaksi A-Z</h3>
                        <p className="text-sm text-gray-500">Pakai LinkAja yang #APA2BISA untuk dapat poin. Transaksi di tiap kategori maksimal 2X /minggu. 
                            <Link href='/mobiles/mission/sk-special-transaction' as='/missions/transaksi-special-sk'>
                                <a className='underline text-ruby-base font-bold active:underline active:text-ruby-base'>S&K Berlaku.</a>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    const _renderMissionSyariah = () => {
        return (
            <div>
                <div className="flex flex-row mb-2">
                    <img className="w-12 h-12" src={`/images/mobiles/ic_mission_berkah.png`} alt='Transaksi Jadi Berkah' />
                    <div className="ml-3">
                        <h3 className="font-extrabold text-lg text-reddark">Transaksi Jadi Berkah</h3>
                        <p className="text-sm text-gray-500">Pakai Layanan Syariah LinkAja #APA2BISA #BerkahUntukSemua untuk dapat poin. Transaksi di tiap kategori misi maksimal 2X /minggu.
                            <Link href='/mobiles/mission/sk-special-transaction-syariah' as='/missions/syariah-transaksi-special-sk'>
                                <a className='underline text-ruby-base font-bold active:underline active:text-ruby-base'>S&K Berlaku.</a>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    const _renderMissionCompleted = () => {
        const completedMissionDailys = missionDailys.filter((item) => item.is_complete == true);
        const completedMissionSpecials = missionSpecials.filter((item) => item.is_complete == true);
        const completedMissionConvensionals = missionConvensionals.filter((item) => item.is_complete == true);
        const completedMissionSyariahs = missionSyariahs.filter((item) => item.is_complete == true);

        return (
            <div className="">
                {completedMissionDailys != '' &&
                    <div className="pt-4 pb-1 px-4 mb-4 bg-white">
                        {completedMissionDailys.map(_renderMissionItem)}
                    </div>
                }
                {(completedMissionConvensionals != '' || completedMissionSyariahs != '') &&
                    <div className="pt-4 pb-1 px-4 mb-4 bg-white">
                        {completedMissionConvensionals != '' &&
                            <div className={`w-full p-4 mb-4 rounded-xl border border-pearlsoft bg-no-repeat bg-cover bg-right-top bg-m-medals`}>
                                {_renderMissionConvensional()}
                                <div className="mt-5">
                                    {completedMissionConvensionals.length > 0 && completedMissionConvensionals.map(_renderMissionConditionSpecial)}
                                </div>
                            </div>
                        }

                        {completedMissionSyariahs != '' &&
                            <div className={`w-full p-4 mb-4 rounded-xl border border-pearlsoft bg-no-repeat bg-cover bg-right-top bg-m-medals-syariah`}>
                                {_renderMissionSyariah()}
                                <div className="mt-5">
                                    {completedMissionSyariahs.length > 0 && completedMissionSyariahs.map(_renderMissionConditionSpecial)}
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }

    const _renderMissionAll = () => {
        const readyMissionDailys = missionDailys.filter((item) => item.is_complete == false);
        const readyMissionSpecials = missionSpecials.filter((item) => item.is_complete == false);
        const readyMissionConvensionals = missionConvensionals.filter((item) => item.is_complete == false);
        const readyMissionSyariahs = missionSyariahs.filter((item) => item.is_complete == false);

        return (
            <div className="">
                {readyMissionDailys != '' &&
                    <div className="pt-4 pb-1 px-4 mb-4 bg-white">
                        {readyMissionDailys.map(_renderMissionItem)}
                    </div>
                }

                <div className="pt-4 pb-1 px-4 mb-4 bg-white">
                    {readyMissionConvensionals != '' &&
                        <div className={`w-full p-4 mb-4 rounded-xl border border-pearlsoft bg-no-repeat bg-cover bg-right-top bg-m-medals`}>
                            {_renderMissionConvensional()}
                            <div className="mt-5">
                                {readyMissionConvensionals.length > 0 && readyMissionConvensionals.map(_renderMissionConditionSpecial)}
                            </div>
                        </div>
                    }

                    {readyMissionSyariahs != '' &&
                        <div className={`w-full p-4 mb-4 rounded-xl border border-pearlsoft bg-no-repeat bg-cover bg-right-top bg-m-medals-syariah`}>
                            {_renderMissionSyariah()}
                            <div className="mt-5">
                                {readyMissionSyariahs.length > 0 && readyMissionSyariahs.map(_renderMissionConditionSpecial)}
                            </div>
                        </div>
                    }

                </div>
            </div>
        );
    }

    const _renderTabCustom = (props, DefaultTabBar) => {
        return (
            <DefaultTabBar {...props} className="text-blackroot bg-white" />
        );
    }

    const _renderTabLayout = () => {
        return (
            <Tabs defaultActiveKey="1" renderTabBar={_renderTabCustom}>
                <Tabs.TabPane tab="Semua" key="1">
                    {(missionDailys != null && missionSpecials != null) && _renderMissionAll()}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Selesai" key="2">
                    {(missionDailys != null && missionSpecials != null) && _renderMissionCompleted()}
                </Tabs.TabPane>
            </Tabs>
        );
    }

    const _renderHeaderMissionDialy = () => {
        const totalMission = missionAll.length;
        const completedMissions = missionAll.filter((item) => item.is_complete == true);
        const completedMissionLength = completedMissions == '' ? 0 : completedMissions.length;

        return (
            <div className="py-5 px-4 bg-linkajared">
                <h1 className="font-bold text-lg text-white">Misi Harian</h1>
                <div className="flex justify-between items-center mb-2">
                    <div className="w-5/12 mr-1">
                        <ProgressMission data={missionAll} />
                    </div>
                    <p className="flex-grow ml-1 text-white">
                        <strong className="mr-1 text-md">{completedMissionLength}</strong>
                        <span className="mr-1 text-xs">dari</span>
                        <strong className="mr-1 text-md">{totalMission}</strong>
                        <span className="text-xs">Misi Terselesaikan</span>
                    </p>
                </div>
                <p className="text-xs text-white">Selesaikan misi harian dan dapatkan poin untuk kamu tukar dengan hadiah</p>
            </div>
        );
    }

    const _renderShare = () => {
        const urlShareRef = `${datafrontUrl}/auth?ref=${myDetail.unique_code}`;
        return (
            <div id="post_share" className='pt-4'>
                <ul className="flex flex-row items-center justify-center space-x-4">
                    <li className="w-8 h-8">
                        <FacebookShareButton url={urlShareRef}>
                            <FacebookIcon size={35} round={true} />
                        </FacebookShareButton>
                    </li>
                    <li className="w-8 h-8">
                        <TwitterShareButton url={urlShareRef}>
                            <TwitterIcon size={35} round={true} />
                        </TwitterShareButton>
                    </li>
                    <li className="w-8 h-8">
                        <WhatsappShareButton url={urlShareRef}>
                            <WhatsappIcon size={35} round={true} />
                        </WhatsappShareButton>
                    </li>
                    <li className="w-8 h-8">
                        <LinkedinShareButton url={urlShareRef}>
                            <LinkedinIcon size={35} round={true} />
                        </LinkedinShareButton>
                    </li>
                </ul>
            </div>
        )
    }

    const _renderBottomSheet = () => {
        const urlShareRef = `${datafrontUrl}/auth?ref=${myDetail.unique_code}`;

        return (
            <BottomSheet
                open={open}
                onDismiss={() => setOpen(false)}
            >
                <div className='flex items-center justify-center'>
                    <div className='flex flex-col p-6'>
                        {myDetail ? <QRCode value={urlShareRef} className='h-full w-full' /> : ''}
                        {process.env.SHARES_ENABLED ? _renderShare() : ''}
                    </div>
                </div>
            </BottomSheet>
        );
    }

    const _renderLayout = () => {
        return (
            <Layout
                title={`ApaBisa - Misi Harian | LinkAja`}
                headerBack={`/dashboard`}
                backgroundColor={'bg-pearlsoft'}>
                {_renderHeaderMissionDialy()}
                {_renderTabLayout()}
            </Layout>
        );
    }

    if (missionDailys != null) {
        return (
            <>
                {_renderLayout()}
                {open && _renderBottomSheet()}
            </>
        );
    } else {
        return (null);
    }
}

export async function getServerSideProps(ctx) {
    const session = ctx.req.session;
    const myMissionUrl = `${process.env.NEXT_API_URL}/v1/home/my-mission`;
    const myMissions = await apiMyMissions(session, myMissionUrl);
    const frontUrl = `${process.env.NEXT_FRONT_URL}`

    return {
        props: {
            dataMissions: myMissions,
            datafrontUrl: frontUrl
        }
    }
}