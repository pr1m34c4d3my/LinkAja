import Link from 'next/link'
import ProgressAchievement from '@/components/mobiles/profile/ProgressAchievement'
import { ChevronRight as IconChevronRight, HelpOutline as IconHelpOutline } from '@material-ui/icons'
import { getLevelLabel, numberWithCommas } from '@/helpers/index'

export default function ProgressProfile({ profile, totalAlphabet, completedAlphabet }) {
  const { experience, point } = profile
  return (
    <div className="bg-white p-4">
      <div className="flex justify-center items-center mb-5">
        <div className="text-gray-700 font-bold mr-2">
          {getLevelLabel(experience)} | {numberWithCommas(experience)} XP ({numberWithCommas(point)} Poin)
        </div>
        <div className="text-ruby-base">
          <Link href='/mobiles/medal' as='/medal'>
            <a>
              <IconHelpOutline color="inherit" size="small" />
            </a>
          </Link>
        </div>
      </div>
      <ProgressAchievement xp={experience} />
      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-700 text-xs font-semibold">
          {/* <span className="mr-2">Jumlah Alfabet Kamu</span>
          <span>{completedAlphabet}/{totalAlphabet}</span> */}
        </div>
        <Link href="/mobiles/mission" as='/missions'>
          <a className="text-ruby-base flex items-center text-xs font-semibold">
            <span>Selesaikan Misi</span>
            <IconChevronRight size="small" color="inherit" />
          </a>
        </Link>
      </div>
    </div>
  )

}