import { useState, useEffect } from 'react'
import axios from 'axios'
import UserProfile from '@/components/mobiles/profile/UserProfile'
import LinkProfile from '@/components/mobiles/profile/LinkProfile'
import ProgressProfile from '@/components/mobiles/profile/ProgressProfile'
import Layout from '@/components/mobiles/Layout'
import Skeleton from 'react-loading-skeleton'
import * as HelperComponents from '@/helpers/components'

export default function Profile({
	showNavbar
}) {

	const [myDetail, setMyDetail] = useState(null);

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
		])
			.then(([
				myDetail,
			]) => {
				if (!myDetail._error) setMyDetail(myDetail);
			})
			.catch(err => {
				setMyDetail(null);
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

	const links = [
		{
			title: 'Hubungkan dengan LinkAja',
			path: '/',
			as: '/'
		}, {
			title: 'Syarat dan Ketentuan',
			path: '/mobiles/profile/toc',
			as: '/profile/toc'
		}, {
			title: 'FAQ',
			path: '/mobiles/profile/faq',
			as: '/profile/faq'
		}, {
			title: 'Contact Support',
			path: '/mobiles/profile/contact',
			as: '/profile/contact'
		}
	]

	return (
		<Layout title='Profile' showNavbar={showNavbar}>
			<div className='bg-carbon-light'>
				<div className="mb-3">
					{myDetail ? <UserProfile profile={myDetail} /> : <Skeleton height={170} />}
				</div>
				<div className="mb-3">
					{myDetail ? <ProgressProfile profile={myDetail} /> : <Skeleton count={6} />}
				</div>
				<div className="mb-3">
					<div className='bg-white px-4'>
						{links.map((item, index) => {
							return <LinkProfile key={index} data={item} />
						})}
					</div>
				</div>
				<div className="px-4 pb-6">
					<button
						type="button"
						className="block w-full rounded-full p-5 text-center border border-gray-500 font-semibold text-gray-500 hover:bg-ruby-base hover:text-white hover:border-ruby-base"
					>
						Logout
					</button>
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
		}
	}
}