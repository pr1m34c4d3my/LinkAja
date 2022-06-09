import Link from 'next/link'
import Layout from '@/components/Layout'

export default function HomePage() {
	return (
		<Layout title='Apa2Bisa'>
			<div className='flex flex-col w-full h-full justify-center items-center space-y-6'>
				<div className='py-2'>
					<img
						className="w-full"
						src='/images/mobiles/landing-page-desktop.gif'
						alt="LinkAja Apa2bisa" />
				</div>
				<div className='pb-10'>
					<Link href={`/auth/email-auth`} as={`/auth`}>
						<a className="px-6 py-4 bg-ruby-base text-white text-center font-base rounded-full font-black hover:text-white focus:outline-none focus:ring-2 focus:ring-ruby-base focus:ring-opacity-50">MAINKAN SEKARANG</a>
					</Link>
				</div>
			</div>
		</Layout >
	)
}

export async function getServerSideProps({ req }) {

	return {
		props: {}
	}
}
