import { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from "@/components/desktop/Layout"
import ProgressMedal from '@/components/desktop/medal/ProgressMedal'

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

const apiMyMedals = async (session, url) => {
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
            // console.log('apiMyMedals.response: ' + JSON.stringify(response.data.data));
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
            // console.log('apiMyMedals.error: ' + JSON.stringify(error));
            if (error.response !== undefined && error.response.data !== null) {
                return { _error: 1, message: error.message };
            } else {
                return { _error: 1, message: error.message };
            }
        });
}

export default function MedalDetail({
    dataParamFlag,
    dataMyDetail,
    dataMyMedal,
}) {

    const [paramFlag, setParamFlag] = useState(null);
    const [myDetail, setMyDetail] = useState(null);
    const [medalInfo, setMedalInfo] = useState(null);

    //==========================================================//
    //=================== COMPONENT - HOOKS ====================//
    //==========================================================//
    useEffect(() => {
        onInitData();
    }, [paramFlag, myDetail, medalInfo])

    //=============================================================//
    //=================== COMPONENT - LISTENER ====================//
    //=============================================================//
    const onInitData = () => {
        if (typeof dataParamFlag !== 'undefined' && dataParamFlag != null) {
            setParamFlag(dataParamFlag);
        }

        if (typeof dataMyDetail !== 'undefined' && dataMyDetail != null && !dataMyDetail._error) {
            setMyDetail(dataMyDetail.payload);
        }

        if (typeof dataMyMedal !== 'undefined' && dataMyMedal != null && !dataMyMedal._error) {
            handleMedalInfo(dataMyMedal.payload);
        }
    }

    //=============================================================//
    //=================== COMPONENT - FUNCTION ====================//
    //=============================================================//
    const handleMedalInfo = (medals) => {
        let medalInfo = null;

        medals.map((item) => {
            if (item.flag === dataParamFlag) {
                medalInfo = item;
            }
        });

        setMedalInfo(medalInfo);
    }


    const handleMedalCover = () => {
        switch (dataParamFlag) {
            case 'priority':
                return `bg-d-medal-cover-priority`;
            case 'platinum':
                return `bg-d-medal-cover-platinum`;
            case 'gold':
                return `bg-d-medal-cover-gold`;
            case 'silver':
                return `bg-d-medal-cover-silver`;
            case 'bronze':
                return `bg-d-medal-cover-bronze`;
            default:
                return `bg-d-medal-cover-bronze`;
        }
    }

    const handleMedalProgress = () => {
        if (paramFlag != null && myDetail != null) {
            if (myDetail.Medal.flag === 'bronze') {
                if (paramFlag === 'silver') return true;
                else return false;
            } else if (myDetail.Medal.flag === 'silver') {
                if (paramFlag === 'gold') return true;
                else return false;
            } else if (myDetail.Medal.flag === 'gold') {
                if (paramFlag === 'platinum') return true;
                else return false;
            } else if (myDetail.Medal.flag === 'platinum') {
                if (paramFlag === 'priority') return true;
                else return false;
            } else {
                return false;
            }
        }
    }

    const handleCountMissionCompleted = () => {
        if (medalInfo != null && medalInfo.MedalConditions.length > 0) {
            const arrMissionCompleted = medalInfo.MedalConditions.filter((item) => item.is_complete === true);

            return arrMissionCompleted.length;
        }
    }

    const handleBenefitAction = (item) => {
        if (item.is_used) {
            return (<div className="w-full py-1 px-4 rounded-xl font-bold text-md text-white text-center bg-pearlsoft">Sudah Digunakan</div>);
        } else {
            if (!medalInfo.is_complete) {
                return (<div className="w-full py-1 px-4 rounded-xl font-bold text-md text-white text-center bg-pearlsoft">Gunakan</div>);
            } else {
                return (<a className="block w-full py-1 px-4 rounded-xl font-bold text-md text-white text-center bg-reddark" onClick={() => apiMedalBenefitUsed(item)}>Gunakan</a>);
            }
        }
    }

    const apiMedalBenefitUsed = async (benefit) => {
        if (medalInfo != null && (typeof benefit !== 'undefined' && benefit != null)) {
            if (!benefit.is_used) {
                return axios.post(`/medal/benefit/${medalInfo.id}/${benefit.flag}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    .then(res => {
                        if (res.status === 200) {
                            onInitData();
                        }
                    })
                    .catch(err => {
                        return console.log(`apiMedalBenefitUsed.error: ${JSON.stringify(err)}`);
                    });
            }
        }
    }


    //==========================================================//
    //=================== COMPONENT - RENDER ===================//
    //==========================================================//
    const _renderMedalConditionItem = (item, index) => {
        return (
            <div className="p-2 rounded-xl bg-white" key={`medal-condition-${index}`}>
                <div className="flex justify-center items-center mt-2 mb-2">
                    <img className="block w-20 h-20 mr-1" src={item.picture} alt={``} />
                </div>
                <div className="w-full h-24">
                    <h4 className="px-2 mb-1 font-extrabold text-md text-center text-reddark">{item.title}</h4>
                    <p className="px-2 text-md text-center text-carbon-base overflow-hidden">{item.description}</p>
                </div>
                <div className="w-full p-2">
                    {item.is_complete &&
                        <a className="flex py-1 px-4 rounded-xl font-bold text-2xs text-white text-center">
                            <img className="block w-5 h-5 mr-1" src={`/images/mobiles/ic-bullet-true.png`} alt={`LinkAja Icon Bullet True`} />
                            <span className="">Selesai</span>
                        </a>
                    }

                    {!item.is_complete &&
                        <a className="flex py-1 px-2 rounded-xl bg-heavy">
                            <img className="block w-4 h-4 mr-2" src={`/images/mobiles/ic-bullet-false.png`} alt={`LinkAja Icon Bullet False`} />
                            <span className="font-ligth text-sm">Belum Selesai</span>
                        </a>
                    }
                </div>
            </div>
        );
    }

    const _renderMedalBenefitItem = (item, index) => {
        return (
            <div className="rounded-xl bg-white" key={`medal-benefit-${index}`}>
                <div className="flex items-center p-2 bg-ruby-base rounded-t-xl">
                    <img className="block w-20 h-20 mx-2" src={item.picture} alt={``} />
                    <div className="ml-2">
                        <span className="block font-black text-xl text-white">Tambah</span>
                        <strong className="mr-1 font-black text-3xl text-white">+{item.point}</strong>
                        <span className="font-extrabold text-xl text-white">Poin</span>
                    </div>
                </div>
                <div className="p-4 h-28">
                    <h4 className="mb-1 font-extrabold text-xl">{item.sub_title}</h4>
                    <p className="text-md text-carbon-base">{item.description}</p>
                </div>
                <div className="w-full p-4 mb-2">
                    {handleBenefitAction(item)}
                </div>
            </div>
        );
    }

    const _renderMedalInfoLocked = () => {
        return (
            <div className="py-1 px-4 rounded-xl bg-white">
                <img className="inline-block mr-1 w-3 h-3" src={`/images/mobiles/ic-locked.png`} alt={`LinkAja Icon Bullet True`} />
                <span className="font-bold text-md">Masih Terkunci</span>
            </div>
        );
    }

    const _renderMedalInfoProgressed = () => {
        return (
            <div className="mt-1">
                <div className='flex items-center'>
                    <div className="grid grid-cols-2 gap-2">
                        <ProgressMedal data={medalInfo} />
                        <div className="text-white" style={{ marginTop: '-3px' }}>
                            <span className="font-semibold mr-1">{handleCountMissionCompleted()}</span>
                            <span className="mr-1">dari</span>
                            <span className="font-semibold mr-1">{medalInfo.MedalConditions.length}</span>
                            <span className="">Misi Terselesaikan</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const _renderMedalInfoCompleted = () => {
        return (
            <div className="py-1 px-4 rounded-xl bg-white">
                <img className="inline-block mr-1 w-6 h-6" src={`/images/mobiles/ic-bullet-true.png`} alt={`LinkAja Icon Bullet True`} />
                <span className="font-bold text-md text-gray-900">Sudah Dilewati</span>
            </div>
        );
    }

    const _renderLayout = () => {
        return (
            <Layout
                title={`Apa2bisa - Medal ${paramFlag.toUpperCase()} | LinkAja`}>
                <div className={`w-full h-36 py-6 px-8 ${handleMedalCover()} bg-cover bg-no-repeat rounded-xl`}>
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center">
                            <img className="block w-10 h-10 mr-1" src={medalInfo.icon} alt={`Icon Medal ${paramFlag.toUpperCase()}`} />
                            <h1 className="ml-1 font-black text-2xl text-white">{medalInfo.title}</h1>
                            <div className="px-5">
                                {medalInfo.is_complete && _renderMedalInfoCompleted()}
                                {!medalInfo.is_complete && handleMedalProgress() && _renderMedalInfoProgressed()}
                                {!medalInfo.is_complete && !handleMedalProgress() && _renderMedalInfoLocked()}
                            </div>
                        </div>
                        {!medalInfo.is_complete && handleMedalProgress() && <div className="block mt-5 font-normal text-md text-white">Membership saat ini</div>}
                    </div>
                </div>
                <div className="w-full p-4">
                    <h2 className="mb-4 font-extrabold text-xl text-blackbase">{`Keuntungan member ${paramFlag}`}</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {medalInfo.MedalBenefits.length > 0 && medalInfo.MedalBenefits.map(_renderMedalBenefitItem)}
                    </div>
                </div>
                <div className="w-full p-4">
                    <h2 className="mb-4 font-extrabold text-xl text-blackbase">Misi yang harus di selesaikan</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {medalInfo.MedalConditions.length > 0 && medalInfo.MedalConditions.map(_renderMedalConditionItem)}
                    </div>
                </div>
            </Layout>
        );
    }

    if (paramFlag != null && myDetail != null && medalInfo != null) return _renderLayout();
    else return null;
}

export async function getServerSideProps(context) {
    const params = context.params;
    const paramFlag = params.flag;
    const session = context.req.session;
    const myMedalUrl = `${process.env.NEXT_API_URL}/v1/medal/my-medals`;
    const myMedal = await apiMyMedals(session, myMedalUrl);
    const myDetailUrl = `${process.env.NEXT_API_URL}/v1/home/my-detail`;
    const myDetail = await apiMyDetail(session, myDetailUrl);

    return {
        props: {
            dataParamFlag: paramFlag,
            dataMyDetail: myDetail,
            dataMyMedal: myMedal,
        }
    }
}