import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  IconHome,
  IconMission,
  IconPermainan,
  IconMedal,
  IconForum,
  IconGift
} from '@/components/desktop/svg/Icon'

export default function Menu() {
  const router = useRouter()

  const menus = [
    {
      id: 1,
      path: '/dashboard',
      title: 'Beranda',
      IconComponent: IconHome,
    },
    {
      id: 2,
      path: '/mission',
      title: 'Misi Harian',
      IconComponent: IconMission,
    },
    {
      id: 3,
      path: '/permainan',
      title: 'Permainan',
      IconComponent: IconPermainan,
    },
    {
      id: 4,
      path: '/medal',
      title: 'Medali',
      IconComponent: IconMedal,
    },
    {
      id: 5,
      path: '/forum',
      title: 'Forum & Group',
      IconComponent: IconForum,
    },
    {
      id: 6,
      path: '/hadiah',
      title: 'Tukar Hadiah',
      IconComponent: IconGift,
    },
  ]

  const [activeMenu, setActiveMenu] = useState(null)

  const isCurrentRoute = (path) => {
    return String(router.pathname).toLowerCase().startsWith(path)
  }

  return (
    <div className="bg-white rounded-lg h-auto nav-desktop font-bold text-md transition-none p-2 xl:p-3">
      <ul>
        {menus.map(({ id, path, title, IconComponent }, index) => {
          return (
            <li key={index}>
              <Link href={path}>
                <a
                  className={`flex items-center w-full px-2 xl:px-6 py-4 mb-4 hover:bg-ruby-base hover:text-gray-100 rounded-lg transition-none ${isCurrentRoute(path) && 'bg-ruby-base text-gray-100'
                    }`}
                  onMouseOver={() => setActiveMenu(id)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <div className="mr-3" style={{ width: '24px' }}>
                    <IconComponent
                      isActive={activeMenu === id || isCurrentRoute(path)}
                    />
                  </div>
                  <span className="flex-1 text-xs xl:text-md hidden md:block lg:block">{title}</span>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}