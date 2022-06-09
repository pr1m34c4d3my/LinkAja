import Link from 'next/link'

export default function VerticalSliderAds({ promotions }) {

  return (
    <div className="overflow-y-scroll overflow-hidden h-80 min-h-full">
      {promotions.map((item, index) => {
        return (
          <Link href={item.url} key={index}>
            <a className="block w-full rounded-md overflow-hidden mb-3" style={{ height: '110px' }}>
              <img src={item.picture} alt={item.title} className="w-full h-full object-center object-cover" />
            </a>
          </Link>
        )
      })}
    </div>
  )
}