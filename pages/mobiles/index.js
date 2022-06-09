import Link from 'next/link'
import * as HelperComponents from '@/helpers/components'

import Layout from '@/components/mobiles/Layout'

export default function Home({
	showNavbar,
}) {
	return (
		<Layout
			contentFull
			title='Home'
			showNavbar={showNavbar}>
			<div className="flex flex-col w-full h-full justify-center items-center">
				<div className="flex-initial mb-24">
					<img
						className="w-full"
						src='/images/mobiles/landing-page-webview.gif'
						alt="LinkAja Apa2bisa" />
				</div>
				<div className="flex-initial">
					<Link href={`/mobiles/auth/email-auth`} as={`/auth`}>
						<a className="px-6 py-4 bg-ruby-base text-white font-base rounded-full font-black hover:text-white focus:outline-none focus:ring-2 focus:ring-ruby-base focus:ring-opacity-50">MAINKAN SEKARANG</a>
					</Link>
				</div>
			</div>
		</Layout >
	)
}

export async function getServerSideProps(context) {
	const showNavbar = HelperComponents.isNavbarShow(context);

	return {
		props: {
			showNavbar,
		},
	}
}