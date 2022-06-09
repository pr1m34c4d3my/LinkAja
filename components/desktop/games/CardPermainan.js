export default function CardPermainan({ item }) {
  return (
    <div className='bg-white rounded-lg overflow-hidden flex flex-col'>
      <div className="p-2 flex justify-center">
        <div
          style={{ height: '100px', width: '100px' }}
          className="mt-3"
        >
          <img
            src={item.imgPath}
            alt=""
            className="w-full h-full object-cover object-center rounded-full"
          />
        </div>
      </div>
      <div className="p-3 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-bold mb-3 text-gray-800 text-lg text-center">
            {item.title}
          </h3>
          <p className="text-gray-800 text-md text-center">
            {item.summary}
          </p>
        </div>
        <div className="flex justify-center py-2">
          <button
            type="button"
            className="bg-ruby-base px-10 py-2 text-gray-100 rounded-sm font-extrabold text-md rounded-full"
          >
            Mainkan
          </button>
        </div>
        <div>
          <p className="text-gray-500 text-xs text-center">Kesempatan Bermain 3x Lagi di Hari ini</p>
        </div>
      </div>
    </div>
  )
}