import { useRouter } from 'next/router'
import Link from 'next/link'
import {
	IconHome,
	IconNotification,
	IconPermainan,
	IconForum,
	IconProfile
} from '@/components/mobiles/svg/Icon'

export default function Navbar() {
	const router = useRouter()

	const navigations = [
		{
			label: 'Home',
			url: '/dashboard',
			path: '/mobiles/dashboard',
			prefix: '/mobiles/dashboard',
			component: IconHome,
		},
		{
			label: 'Notifikasi',
			url: '/notification',
			path: '/mobiles/notification',
			prefix: '/mobiles/notification',
			component: IconNotification,
		},

		{
			label: 'Permainan',
			url: '/permainan',
			path: '/mobiles/permainan',
			prefix: '/mobiles/permainan',
			component: IconPermainan,
		},
		{
			label: 'Forum & Group',
			url: '/forum',
			path: '/mobiles/forum',
			prefix: '/mobiles/forum',
			component: IconForum,
		},
		{
			label: 'Profile',
			url: '/profile',
			path: '/mobiles/profile',
			prefix: '/mobiles/profile',
			component: IconProfile,
		},
	]

	//=============================================================//
	//=================== COMPONENT - LISTENER ====================//
	//=============================================================//
	function isActive(prefix) {
		return String(router.pathname).toLowerCase().startsWith(prefix)
	}

	const activeColorByPath = (path) => {
		return router.pathname === path ? '#E3292B' : '#828282'
	}

	//==========================================================//
	//=================== COMPONENT - RENDER ===================//
	//==========================================================//
	return (
		<>
			<nav
				className="fixed flex w-full bottom-0 left-0 right-0 bg-white items-center justify-center mx-auto border-t border-gray-150 z-30"
				style={{
					height: '72px'
				}}
			>
				{navigations.map(({ component: Component, label, url, path, prefix }) => {
					return (
						<Link href={path} as={url} key={path}>
							<a className="h-full flex-1">
								<div className="h-12 pt-1 flex items-center justify-center">
									<Component isActive={isActive(prefix)} />
								</div>
								<div
									className="text-center font-semibold"
									style={{
										color: isActive(prefix) ? '#001122' : '#656D86',
										fontSize: '8px',
									}}
								>
									{label}
								</div>
							</a>
						</Link>
					)
				})}
			</nav>
		</>
	)
}