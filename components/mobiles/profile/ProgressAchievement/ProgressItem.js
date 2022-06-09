import { useMemo } from 'react'
import Link from 'next/link'
import { numberWithCommas, convertDecimalTo } from '@/helpers/index'
import IconBadgeXp from '@/components/mobiles/icons/IconBadgeXp'

export default function ProgressItem({ level, isFinish, xp }) {
  const gap = useMemo(() => level.limit - level.start, [level])

  const localPoint = useMemo(() => {
    return xp - level.start
  }, [xp, level])

  const percentage = useMemo(() => {
    if (isFinish) {
      return 0
    }

    if (localPoint <= 0) {
      return 0
    }

    return (localPoint / gap) * 100
  }, [localPoint, gap, isFinish])

  return (
    <div className="w-full">
      <div
        aria-label="progress-item"
        className="flex w-full justify-start relative"
      >
        {isFinish === false && (
          <div
            className="rounded-full flex-1 absolute overflow-hidden w-full bg-gray-100"
            style={{
              height: '14px',
              marginTop: '3px',
              marginRight: '-12px',
              marginLeft: '10px',
            }}
          >
            <div
              className={`bg-yellow-500 h-full`}
              style={{ width: `${percentage >= 100 ? 100 : percentage}%` }}
            ></div>
          </div>
        )}
        <div
          className={`${xp >= level.start ? 'bg-ruby-base' : 'bg-gray-300'
            } rounded-full border border-white z-10 shadow`}
          style={{
            width: '22px',
            height: '22px',
            borderWidth: '4px',
            marginTop: '-1px',
          }}
        ></div>
      </div>
      <Link href={`/mobiles/medal/[flag]?flag=${level.medal}`} as={`/medal/${level.medal}`}>
        <a>
          <IconBadgeXp
            size="18px"
            className="my-2"
            style={{ width: '18px', marginLeft: '1px' }}
            xp={level.start}
          />
        </a>
      </Link>
      <div
        className="text-center text-xs text-gray-900 relative z-20"
        style={{ marginLeft: '-75%' }}
      >
        {/* {numberWithCommas(level.start)} */}
        {convertDecimalTo(level.start)}
      </div>
      <div
        className="text-center text-xs text-gray-900"
        style={{ marginLeft: '-75%' }}
      >
        XP
      </div>
    </div>
  )
}