import { useState, useEffect } from 'react'


export default function ProgressMission({ data }) {
    const [missionInfo, setMedalInfo] = useState(null);

    //==========================================================//
    //=================== COMPONENT - HOOKS ====================//
    //==========================================================//
    useEffect(() => {
        onInitData();
    }, [missionInfo])

    //=============================================================//
    //=================== COMPONENT - LISTENER ====================//
    //=============================================================//
    const onInitData = () => {
        if (typeof data !== 'undefined' && data != null && data != '') {
            setMedalInfo(data);
        }
    }

    //=============================================================//
    //=================== COMPONENT - FUNCTION ====================//
    //=============================================================//
    const handleCountMissionProgress = () => {
        if (missionInfo != null) {
            const totalMission              = missionInfo.length;
            const completedMission          = missionInfo.filter((item) => item.is_complete === true);
            const completedMissionLength    = completedMission.length;
            
            return ((completedMissionLength / totalMission) * 100).toFixed(0);
        }
    }

    //==========================================================//
    //=================== COMPONENT - RENDER ===================//
    //==========================================================//
    const _renderComponent = () => {
        return (
            <div className="w-full h-3 p-0.5 rounded-xl bg-white">
                <div className="h-full rounded-xl bg-reddark" style={{ width: `${handleCountMissionProgress()}%`, content: `` }} />
            </div>
        );
    }

    if (missionInfo != null) return _renderComponent();
    else return null;
}