import Router from 'next/router'
import Link from 'next/link'

import { ArrowBack as IconArrowBack } from '@material-ui/icons'

export default function Header({
	headerBack,
	headerBackAs,
	headerTitle,
}) {
	//=============================================================//
	//=================== COMPONENT - LISTENER ====================//
	//=============================================================//
	const onClickBackNav = (headerBack, headerBackAs) => {
		const windowHistory = (typeof window.history === 'object' && typeof window.history.keys !== 'undefined') ? window.history : null;

		if (windowHistory !== null) {
			Router.back();
		} else {
			const pathname = `/mobiles${headerBack}`;
			const urlname = (typeof headerBackAs === 'undefined' || headerBackAs === null || headerBackAs === '') ? headerBack : headerBackAs;

			Router.replace(pathname, urlname, { shallow: true });
		}
	}

	//==========================================================//
	//=================== COMPONENT - RENDER ===================//
	//==========================================================//
	return (
		<header id="header" className="fixed top-0 left-0 w-full h-14 z-30 bg-white shadow">
			{(typeof headerBack === 'undefined' || headerBack === null || headerBack === '') &&
				<div className="flex flex-row justify-center items-center h-full">
					<div className="">
						{/* <a href="">
							<img
								className="h-6"
								src={`/images/mobiles/navbar-logo.png`}
								alt="Logo LinkAja Apa2bisa"
							/>
						</a> */}
						<h1 className="font-bold text-sm text-center">#APA2BISA</h1>
					</div>
				</div>
			}

			{(typeof headerBack !== 'undefined' && headerBack !== null && headerBack !== '') &&
				<div className="flex flex-row justify-between items-center h-full">
					<div className="w-12 h-full">
						<a
							className="flex justify-center items-center w-full h-full"
							onClick={() => onClickBackNav(headerBack, headerBackAs)}>
							<IconArrowBack />
						</a>
					</div>
					<div className="flex-1">
						<h1 className="font-bold text-sm text-center">#APA2BISA</h1>
					</div>
					<div className="w-12 h-full"></div>
				</div>
			}
		</header>
	)
}