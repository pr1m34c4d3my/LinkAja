import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { ChevronRight as IconChevronRight } from '@material-ui/icons'
import Router from 'next/router'
import UserProfile from '@/components/mobiles/profile/UserProfile'
import LinkProfile from '@/components/mobiles/profile/LinkProfile'
import ProgressProfile from '@/components/mobiles/profile/ProgressProfile'
import Layout from '@/components/mobiles/Layout'
import Skeleton from 'react-loading-skeleton'
import * as HelperComponents from '@/helpers/components'

export default function Profile({
	showNavbar,
	deepLink
}) {

	const [myDetail, setMyDetail] = useState(null)
	const [myAlphabets, setMyAlphabets] = useState(null)

	//==========================================================//
	//=================== COMPONENT - HOOKS ====================//
	//==========================================================//
	useEffect(() => {
		onInitData();
	}, []);

	//=============================================================//
	//=================== COMPONENT - LISTENER ====================//
	//=============================================================//
	const onInitData = () => {
		Promise.all([
			apiMyDetail(),
			apiMyAlphabets(),
		])
			.then(([
				myDetail,
				myAlphabets
			]) => {
				if (!myDetail._error) setMyDetail(myDetail);
				if (!myAlphabets._error) setMyAlphabets(myAlphabets);
			})
			.catch(err => {
				setMyDetail(null);
				setMyAlphabets(null);
			});
	}


	//=============================================================//
	//=================== COMPONENT - FUNCTION ====================//
	//=============================================================//
	const apiMyDetail = async () => {
		return axios.post('/dashboard/my-detail',
			{
				headers: {
					'Content-Type': 'application/json',
				}
			})
			.then(res => {
				if (res.status === 200) {
					return res.data.payload;
				} else {
					return null;
				}
			})
			.catch(err => {
				return null;
			});
	}

	const apiAuthLogout = async () => {
		return axios.post('/logout',
			{
				headers: {
					'Content-Type': 'application/json',
				}
			})
			.then(res => {
				if (res.status === 200 && !res.data._error) {
					Router.replace(`/mobiles/auth/email-auth`, `/auth/email-auth`, { shallow: true });
				}
			})
			.catch(err => {
				return console.log(`apiAuthLogout:.error: ${JSON.stringify(err)}`);
			});
	}

	const apiMyAlphabets = async () => {
		return axios.post('/missions/my-alphabet',
			{
				headers: {
					'Content-Type': 'application/json',
				}
			})
			.then(res => {
				if (res.status === 200) {
					return res.data.payload;
				} else {
					return null;
				}
			})
			.catch(err => {
				return null;
			});
	}

	const links = [
		{
			title: 'Hubungkan dengan LinkAja',
			path: deepLink,
			as: deepLink
		}, {
			title: 'Syarat dan Ketentuan',
			path: '/mobiles/support/toc',
			as: '/syarat-ketentuan'
		}, {
			title: 'FAQ',
			path: '/mobiles/support/faq',
			as: '/faq'
		}, {
			title: 'Contact Support',
			path: '/mobiles/profile/contact',
			as: '/contact'
		}
	]

	//=============================================================//
	//=================== COMPONENT - LISTENER ====================//
	//=============================================================//
	const onClickLogout = () => {
		apiAuthLogout();
	}

	//=============================================================//
	//=================== COMPONENT - FUNCTION ====================//
	//=============================================================//
	const handleCountAlphabetCompleted = () => {
		if (myAlphabets != null && myAlphabets.length > 0) {
			const arrAlphabetCompleted = myAlphabets.filter((item) => item.UserAlphabet != null);
			return arrAlphabetCompleted.length;
		}
	}

	//==========================================================//
	//=================== COMPONENT - RENDER ===================//
	//==========================================================//
	return (
		<Layout title='Profile' showNavbar={showNavbar}>
			<div className='bg-carbon-light'>
				<div className="mb-3">
					{myDetail ? <UserProfile profile={myDetail} /> : <Skeleton height={170} />}
				</div>
				<div className="mb-3">
					{myDetail ? <ProgressProfile
						profile={myDetail}
						totalAlphabet={myAlphabets != null && myAlphabets.length}
						completedAlphabet={handleCountAlphabetCompleted()}
					/> : <Skeleton count={6} />}
				</div>
				<div className="mb-3">
					<div className='bg-white px-4'>
						{links.map((item, index) => {
							return (
								<div key={index}>
									<Link href={item.path} as={item.as}>
										<a className="block no-underline hover:text-inherit hover:no-underline">
											<div className='bg-white border-b border-gray-200 flex py-3 mb-2'>
												<div className="w-8/12">
													<div className="font-bold text-sm">{item.title}</div>
												</div>
												<div className="w-4/12">
													{myDetail != null && index == 0 &&
														<div className="text-2xs">{myDetail.linkaja_id ?
															<span className='bg-green-100 text-green-500 p-1 rounded-lg'>Sudah Terhubung</span> : <span className='bg-red-100 text-red-500 p-1 rounded-lg'>Belum Terhubung</span>
														}
														</div>
													}
												</div>
												<div className="w-1/12 flex items-center text-ruby-base">
													<IconChevronRight color="inherit" />
												</div>
											</div>
										</a>
									</Link>
								</div>
							)
						})}
					</div>
				</div>
				<div className="px-4 pb-6">
					<a
						className="block w-full py-2 px-4 my-5 rounded-3xl border border-pearlroot font-bold text-center text-rootblack"
						onClick={() => onClickLogout()}>
						Logout
					</a>
				</div>
			</div>
		</Layout >
	)
}


export async function getServerSideProps(context) {
	const showNavbar = HelperComponents.isNavbarShow(context);
	const deepLink = `${process.env.LINKAJA_DEEPLINK}`;

	return {
		props: {
			showNavbar,
			deepLink: deepLink
		}
	}
}