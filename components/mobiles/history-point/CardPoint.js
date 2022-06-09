import { numberWithCommas, getBadgeIcon } from '@/helpers/index'

export default function CardPoint({ profile }) {
  const { experience, point } = profile

  return (
    <div className="bg-blue-400 p-3 flex items-center rounded-lg text-gray-100">
      <div className="" style={{ width: '48px' }}>
        <img
          src={getBadgeIcon(experience)}
          alt=""
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="ml-3">
        <p>Total Point</p>
        <p className="font-bold text-lg">{numberWithCommas(point)}</p>
      </div>
    </div>
  )
}