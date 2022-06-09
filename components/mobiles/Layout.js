import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '@/components/mobiles/Header'
import Navbar from '@/components/mobiles/Navbar'

export default function Layout({
	title,
	keywords,
	description,
	children,
	showNavbar,
	backgroundColor,
	headerBack,
	headerBackAs,
	headerTitle,
	contentFull,
}) {

	const bgColor = (typeof backgroundColor === 'undefined') ? 'bg-white' : backgroundColor;

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta charSet='UTF-8' />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
				<meta name="linkaja_partner" content='Trad3mark' />
				<meta name="linkaja_title" content={title} />
				<meta name="linkaja_description" content={description} />
			</Head>

			<div className={`flex flex-col min-h-screen overflow-hidden ${bgColor}`} aria-label="layout">
				<Header headerBack={headerBack} headerBackAs={headerBackAs} headerTitle={headerTitle} />

				{contentFull && <div className={`w-full h-full pt-14 absolute top-0 left-0 z-0 ${bgColor}`} aria-label="content">{children}</div>}
				{!contentFull && showNavbar && <div className={`w-full min-h-full pt-14 pb-14 absolute top-0 left-0 z-0 ${bgColor}`} aria-label="content">{children}</div>}
				{!contentFull && !showNavbar && <div className={`w-full min-h-full pt-14 absolute top-0 left-0 z-0 ${bgColor}`} aria-label="content">{children}</div>}

				{showNavbar && <Navbar />}
			</div>
		</>
	)
}