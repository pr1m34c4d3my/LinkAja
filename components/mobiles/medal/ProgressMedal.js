import { useState, useEffect } from 'react'


export default function ProgressMedal({ data }) {
    const [medalInfo, setMedalInfo] = useState(null);

    //==========================================================//
    //=================== COMPONENT - HOOKS ====================//
    //==========================================================//
    useEffect(() => {
        onInitData();
    }, [medalInfo])

    //=============================================================//
    //=================== COMPONENT - LISTENER ====================//
    //=============================================================//
    const onInitData = () => {
        if (typeof data !== 'undefined' && data != null) {
            setMedalInfo(data);
        }
    }

    //=============================================================//
    //=================== COMPONENT - FUNCTION ====================//
    //=============================================================//
    const handleCountMissionProgress = () => {
        if (medalInfo != null) {
            const totalMission      = medalInfo.MedalConditions.length;
            const completedMission  = medalInfo.MedalConditions.filter((item) => item.is_complete === true);
            
            return ((completedMission / totalMission) * 100).toFixed(0);
        }
    }

    //==========================================================//
    //=================== COMPONENT - RENDER ===================//
    //==========================================================//
    const _renderComponent = () => {
        return (
            <div className="w-full h-2.5 p-0.5 rounded-xl bg-white">
                <div className="h-full rounded-xl bg-reddark" style={{ width: `${handleCountMissionProgress()}%`, content: `` }} />
            </div>
        );
    }

    if (medalInfo != null) return _renderComponent();
    else return null;
}