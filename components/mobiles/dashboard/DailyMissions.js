import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DailyMissions({ missions }) {
    const [missionLong, setMissionLong] = useState(null);
    const [missionSquares, setMissionSquares] = useState(null);

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
        if (typeof missions !== 'undefined' && missions != null && missions != '') {
            let arrayMissionSquare = [];

            missions.map((item, index) => {
                if (item.flag === 'CEK_AJA') setMissionLong(item);
                else if (item.flag === 'BERGAUL_AJA') arrayMissionSquare.push(item);
                else if (item.flag === 'MAIN_AJA') arrayMissionSquare.push(item);
            });

            setMissionSquares(arrayMissionSquare);
        }
    }

    //=============================================================//
    //=================== COMPONENT - FUNCTION ====================//
    //=============================================================//
    const getIconPath = (flag) => {
        if (flag == 'CEK_AJA') return `/icons/daily-mission/cek-aja.png`;
        else if (flag == 'BERGAUL_AJA') return `/icons/daily-mission/bergaul-aja.png`;
        else if (flag == 'MAIN_AJA') return `/icons/daily-mission/main-aja.png`;
    }

    //==========================================================//
    //=================== COMPONENT - RENDER ===================//
    //==========================================================//
    const renderMissionSquareItem = (item, index) => {
        return (
            <div className="flex-1 mx-2" key={`missions-${index}`}>
                <Link href='/mobiles/mission' as="/missions">
                    <a className="block p-4 rounded-xl bg-m-dashboard-mission-square bg-no-repeat bg-cover bg-right-top">
                        <div className="mb-2">
                            <img className="block w-12 h-12 mr-2" src={getIconPath(item.flag)} alt={item.description} />
                        </div>
                        <div className="mb-2">
                            <h3 className="font-bold text-sm text-reddark">{item.title}</h3>
                            <p className="text-2xs">{item.description}</p>
                        </div>
                        <div className="flex">
                            <div className="flex items-center py-0.5 px-3 mb-2 rounded-2xl bg-reddark">
                                <img className="block w-3 h-3 mr-2" src="/images/mobiles/ic_point.png" alt="icon mission point" />
                                <span className="text-2xs text-white">{`+ ${item.point} Poin`}</span>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex items-center py-0.5 px-3 rounded-2xl bg-reddark">
                                <img className="block w-3 h-3 mr-2" src="/images/mobiles/ic_point.png" alt="icon mission point" />
                                <span className="text-2xs text-white">{`+ ${item.experience} Xp`}</span>
                            </div>
                        </div>
                    </a>
                </Link>
            </div>
        );
    }

    const renderMissionSquares = () => {
        return (
            <div className="flex flex-row justify-between items-center mt-4">
                {missionSquares != null && missionSquares.length > 0 &&
                    missionSquares.map((item, index) => renderMissionSquareItem(item, index))
                }
            </div>
        );
    }

    const renderMissionLong = () => {
        return (
            <div className="w-full px-2">
                <Link href='/mobiles/mission' as="/missions">
                    <a className="block p-4 rounded-xl bg-m-dashboard-mission-long bg-no-repeat bg-cover bg-right-top">
                        <div className="flex flex-row items-center mb-2">
                            <img className="w-12 h-12" src={getIconPath(missionLong.flag)} alt={missionLong.description} />
                            <div className="ml-2">
                                <h3 className="font-extrabold text-lg text-reddark">{missionLong.title}</h3>
                                <p className="text-2xs">{missionLong.description}</p>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-row items-center py-0.5 px-3 mr-2 rounded-2xl bg-reddark">
                                <img className="w-3 h-3 mr-2" src="/images/mobiles/ic_point.png" alt="icon mission point" />
                                <span className="text-2xs text-white">{`+ ${missionLong.point} Poin`}</span>
                            </div>
                            <div className="flex flex-row items-center py-0.5 px-3 rounded-2xl bg-reddark">
                                <img className="w-3 h-3 mr-2" src="/images/mobiles/ic_point.png" alt="icon mission point" />
                                <span className="text-2xs text-white">{`+ ${missionLong.experience} Xp`}</span>
                            </div>
                        </div>
                    </a>
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="">
                {missionLong != null && renderMissionLong()}
                {missionSquares != null && renderMissionSquares()}
            </div>
            <div className="my-3">
                <Link href="/mobiles/mission" as="/missions">
                    <a className="text-ruby-base text-sm font-semibold block text-center">Lihat Lainnya</a>
                </Link>
            </div>
        </>
    )
}