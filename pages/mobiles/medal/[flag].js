import { useState, useEffect } from 'react'
import axios from 'axios'

import Layout from "@/components/mobiles/Layout"
import ProgressMedal from "@/components/mobiles/medal/ProgressMedal"


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
                return `bg-m-medal-cover-priority`;
            case 'platinum':
                return `bg-m-medal-cover-platinum`;
            case 'gold':
                return `bg-m-medal-cover-gold`;
            case 'silver':
                return `bg-m-medal-cover-silver`;
            case 'bronze':
                return `bg-m-medal-cover-bronze`;
            default:
                return `bg-m-medal-cover-bronze`;
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
            return (<div className="w-full py-1 px-4 rounded-xl font-bold text-2xs text-white text-center bg-pearlsoft">Sudah Digunakan</div>);
        } else {
            if (!medalInfo.is_complete) {
                return (<div className="w-full py-1 px-4 rounded-xl font-bold text-2xs text-white text-center bg-pearlsoft">Gunakan</div>);
            } else {
                return (<a className="block w-full py-1 px-4 rounded-xl font-bold text-2xs text-white text-center bg-reddark" onClick={() => apiMedalBenefitUsed(item)}>Gunakan</a>);
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
            <div className="p-2 rounded-md bg-white" key={`medal-condition-${index}`}>
                <div className="flex justify-center items-center mt-2 mb-2">
                    <img className="block w-10 h-10 mr-1" src={item.picture} alt={``} />
                </div>
                <div className="w-full h-24">
                    <h4 className="px-2 mb-1 font-extrabold text-xs text-center text-reddark">{item.title}</h4>
                    <p className="px-2 text-2xs text-center text-carbon-base overflow-hidden">{item.description}</p>
                </div>
                <div className="w-full p-2">
                    {item.is_complete &&
                        <a className="flex py-1 px-4 rounded-xl font-bold text-2xs text-white text-center">
                            <img className="block w-5 h-5 mr-1" src={`/images/mobiles/ic-bullet-true.png`} alt={`LinkAja Icon Bullet True`} />
                            <span className="">Selesai</span>
                        </a>
                    }

                    {!item.is_complete &&
                        <a className="flex py-1 px-2 rounded-xl bg-pearlheavy">
                            <img className="block w-4 h-4 mr-2" src={`/images/mobiles/ic-bullet-false.png`} alt={`LinkAja Icon Bullet False`} />
                            <span className="font-ligth text-2xs">Belum Selesai</span>
                        </a>
                    }
                </div>
            </div>
        );
    }

    const _renderMedalBenefitItem = (item, index) => {
        return (
            <div className="rounded-md bg-white" key={`medal-benefit-${index}`}>
                <div className="flex items-center p-2 bg-m-medal-benefit bg-norepeat bg-cover bg-top-right">
                    <img className="block w-10 h-10 mr-1" src={item.picture} alt={``} />
                    <div className="ml-1">
                        <span className="block font-bold text-xs text-white">Tambah</span>
                        <strong className="mr-1 font-extrabold text-lg text-white">+{item.point}</strong>
                        <span className="font-light text-xs text-white">Point</span>
                    </div>
                </div>
                <div className="p-2 h-28">
                    <h4 className="mb-1 font-extrabold text-xs">{item.sub_title}</h4>
                    <p className="text-2xs text-carbon-base">{item.description}</p>
                </div>
                <div className="w-full p-2 mb-2">
                    {handleBenefitAction(item)}
                </div>
            </div>
        );
    }

    const _renderMedalInfoLocked = () => {
        return (
            <div className="mt-3 px-2 rounded-xl bg-white">
                <img className="inline-block mr-1 w-3 h-3" src={`/images/mobiles/ic-locked.png`} alt={`LinkAja Icon Bullet True`} />
                <span className="font-bold text-4xs">Masih Terkunci</span>
            </div>
        );
    }

    const _renderMedalInfoProgressed = () => {
        return (
            <div className="mt-1 w-3/6">
                <span className="block mb-1 font-bold text-xs text-white">Membership saat ini</span>
                <ProgressMedal data={medalInfo} />
                <p className="text-white">
                    <b className="text-2xs mr-1 font-extrabold">{handleCountMissionCompleted()}</b>
                    <span className="text-2xs">dari {medalInfo.MedalConditions.length} misi terselesaikan</span>
                </p>
            </div>
        );
    }

    const _renderMedalInfoCompleted = () => {
        return (
            <div className="mt-3 px-2 rounded-xl bg-white">
                <img className="inline-block mr-1 w-6 h-6" src={`/images/mobiles/ic-bullet-true.png`} alt={`LinkAja Icon Bullet True`} />
                <span className="font-bold text-4xs">Sudah Dilewati</span>
            </div>
        );
    }

    const _renderLayout = () => {
        return (
            <Layout
                contentFull
                title={`Apa2bisa - Medal ${paramFlag.toUpperCase()} | LinkAja`}
                headerTitle={`Medal ${paramFlag.toUpperCase()}`}
                headerBack={`/dashboard`}
                backgroundColor={`bg-fair`}>
                <div className={`w-full h-32 py-6 px-8 ${handleMedalCover()} bg-cover bg-norepeat bg-top-right`}>
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center">
                            <img className="block w-8 h-8 mr-1" src={medalInfo.icon} alt={`Icon Medal ${paramFlag.toUpperCase()}`} />
                            <h1 className="ml-1 font-extrabold text-xl text-white">{medalInfo.title}</h1>
                        </div>
                        <div className="flex">
                            {medalInfo.is_complete && _renderMedalInfoCompleted()}
                            {!medalInfo.is_complete && handleMedalProgress() && _renderMedalInfoProgressed()}
                            {!medalInfo.is_complete && !handleMedalProgress() && _renderMedalInfoLocked()}
                        </div>
                    </div>
                </div>
                <div className="w-full p-4 bg-fair">
                    <h2 className="mb-4 font-extrabold text-sm text-blackbase">{`Keuntungan member ${paramFlag}`}</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {medalInfo.MedalBenefits.length > 0 && medalInfo.MedalBenefits.map(_renderMedalBenefitItem)}
                    </div>
                </div>
                <div className="w-full p-4 bg-fair">
                    <h2 className="mb-4 font-extrabold text-sm text-blackbase">Misi yang harus di selesaikan</h2>
                    <div className="grid grid-cols-2 gap-4">
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