import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Layout({ title, keywords, description, children }) {
	const router = useRouter()

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta charSet='UTF-8' />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
			</Head>
			<Header />
			<div className="bg-white h-full" aria-label="layout">
				<main className='flex-auto' aria-label="content">
					{children}
				</main>
				<Footer />
			</div>
		</>
	)
}