import { useRouter } from 'next/router'
import { ChevronRight as IconChevronRight } from '@material-ui/icons'
import { getLevelLabel } from '@/helpers/index'

import Link from 'next/link'

export default function CardMedal({ medals }) {
    const router = useRouter()

    function renderChecklistByMission(mission) {
        return mission.is_complete ? (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
            fill="#C7ECC1"
            />
            <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 18.6004C15.6451 18.6004 18.6 15.6455 18.6 12.0004C18.6 8.35531 15.6451 5.40039 12 5.40039C8.35495 5.40039 5.40002 8.35531 5.40002 12.0004C5.40002 15.6455 8.35495 18.6004 12 18.6004Z"
            fill="#64CA51"
            />
            <path
            d="M9.1001 12.1828L10.9205 14.0126C10.9594 14.0517 11.0225 14.0519 11.0617 14.0132L14.8667 10.25"
            stroke="white"
            strokeWidth="1.4"
            strokeLinecap="round"
            />
        </svg>
        ) : (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
            fill="#E7E7F0"
            />
            <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 18.6004C15.6451 18.6004 18.6 15.6455 18.6 12.0004C18.6 8.35531 15.6451 5.40039 12 5.40039C8.35495 5.40039 5.40002 8.35531 5.40002 12.0004C5.40002 15.6455 8.35495 18.6004 12 18.6004Z"
            fill="#9CA4AC"
            />
        </svg>
        )
    }

    function renderBackground() {
        return (
        <div className="bg-ruby-light rounded-lg absolute inset-0 w-full h-full z-0">
            <svg
            width="98"
            height="147"
            viewBox="0 0 98 147"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ zIndex: 0 }}
            className="absolute right-0 top-0"
            >
            <path
                opacity="0.6"
                d="M128.05 106.768L74.4815 86.7369L61.2234 81.7792C56.4505 79.9944 54.3961 74.4466 56.8742 70.036L64.8591 55.8276L121.265 -44.5482C122.772 -47.2292 121.523 -50.6008 118.622 -51.6857L80.5272 -65.9308C78.1383 -66.8241 75.4462 -65.8322 74.2305 -63.6116L5.3222 62.362C4.71872 63.4399 4.18975 64.5331 3.72418 65.6375C3.36334 66.4101 3.02445 67.1992 2.71329 68.0067C-4.61865 87.0351 5.05767 108.302 24.3263 115.507C24.9227 115.73 25.5213 115.936 26.1212 116.127L26.1204 116.129L47.7 124.198L47.7068 124.18L106.267 146.078C108.12 146.771 110.208 146.018 111.175 144.309L129.772 111.437C130.763 109.686 129.948 107.478 128.05 106.768Z"
                fill="#FFE0E0"
                fillOpacity="0.9"
            />
            </svg>
        </div>
        )
    }

    function showDetail(dataMedal) {
        localStorage.setItem('medal', JSON.stringify(dataMedal))
        router.push(`/mobiles/medal/${dataMedal.flag}`)
    }

    //=============================================================//
    //=================== COMPONENT - FUNCTION ====================//
    //=============================================================//
    

    //==========================================================//
    //=================== COMPONENT - RENDER ===================//
    //==========================================================//
    const _renderMissionItem = (item, index) => {
        return (
            <div className="flex items-center p-2 mt-3 mb-3 rounded-md border bg-white" key={`medal-conditions-${index}`}>
                <div className="mr-2">
                    { item.is_complete && <img className="block w-7 h-7" src={`/images/mobiles/ic-bullet-true.png`} alt={`LinkAja - Icon Bullet True`} /> }
                    { !item.is_complete && <img className="block w-7 h-7" src={`/images/mobiles/ic-bullet-false.png`} alt={`LinkAja - Icon Bullet False`} /> }
                </div>
                <h5 className="ml-2 text-md text-blackbase">{item.title}</h5>
            </div>
        );
    }

    const _renderMyMedalItem = (item, index) => {
        return (
            <Link href={`/mobiles/medal/[flag]?flag=${item.flag}`} as={`/medal/${item.flag}`} key={`medal-${index}`}>
                <a className="block p-4 mb-4 rounded-md bg-m-medals bg-no-repeat bg-cover bg-right-top">
                    <div className="flex mb-2">
                        <div className="mr-2">
                            <img src={item.icon} alt={`LinkAja Medal - ${item.title}`} />
                        </div>
                        <div className="ml-2">
                            <h4 className="font-extrabold text-md text-redbase">{item.title}</h4>
                            <span className="font-thin text-xs">Misi yang harus diselesaikan</span>
                        </div>
                    </div>
                    <div className="mt-2">
                        { item.MedalConditions.length > 0 && item.MedalConditions.map(_renderMissionItem) }
                    </div>
                </a>
            </Link>
        );
    }

    return (
        <div>
            { typeof medals !== 'undefined' && medals != null && medals.length > 0 && medals.map(_renderMyMedalItem) }
        </div>
    )
}