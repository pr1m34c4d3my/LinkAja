import { useEffect, useMemo } from 'react'

export default function IconBadgeXp({ size, xp, className, style }) {

  const iconPath = useMemo(() => {
    let path = '/icons/achieve-badge/'
    switch (true) {
      case xp >= 0 && xp < 95000:
        path += '0.png'
        break

      case xp >= 95000 && xp < 150000:
        path += '5.png'
        break

      case xp >= 150000 && xp < 300000:
        path += '10.png'
        break

      case xp >= 300000 && xp < 400000:
        path += '20.png'
        break

      case xp >= 400000:
        path += '50.png'
        break
    }
    return path
  }, [xp])

  return (
    <>
      <div
        aria-label={`icon-badge-${xp}`}
        className={`${className} `}
        style={{ width: size, ...style }}
      >
        <img src={iconPath} alt="icon-badge" className="w-full h-auto" />
      </div>
    </>
  )
}