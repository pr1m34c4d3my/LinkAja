import { numberWithCommas, getBadgeIcon } from '@/helpers/index'

export default function CardPoint({ profile }) {
  const { experience, point } = profile

  return (
    <div className="bg-blue-400 p-3 flex justify-between items-center rounded-lg text-gray-100">
      <div className="flex items-center" >
        <img
          src={getBadgeIcon(experience)}
          alt=""
          className="w-full h-full object-center object-cover"
          style={{ width: '48px' }}
        />
        <p className='text-white px-2'>Total Point</p>
      </div>
      <div className="flex items-center">
        <h3 className="font-extrabold text-2xl text-white px-5">{numberWithCommas(point)}</h3>
      </div>
    </div>
  )
}