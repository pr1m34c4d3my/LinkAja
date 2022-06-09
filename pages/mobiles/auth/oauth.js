import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { useGoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Layout from '@/components/mobiles/Layout'

import * as HelperComponents from '@/helpers/components'

export default function Login({
	showNavbar,
}) {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [message, setMessage] = useState('')

	let clientId = process.env.GOOGLE_ID
	const router = useRouter()

	useEffect(() => {
		if (isLoggedIn) {
			router.replace('/mobiles/dashboard', '/dashboard', { shallow: true });
		}
	}, [isLoggedIn])

	//=============================================================//
	//=================== COMPONENT - LISTENER ====================//
	//=============================================================//
	const onSuccessGoogle = async (res) => {
		const googleData = {
			email: res.profileObj.email,
			fullname: res.profileObj.name,
			profile_picture: res.profileObj.imageUrl,
			provider: res.tokenObj.idpId,
			token: res.accessToken
		};

		const doLogin = await apiDoLogin(googleData);

		if (!doLogin._error) {
			setIsLoggedIn(true)
			setMessage(doLogin.payload)
		} else {
			setIsLoggedIn(false)
			setMessage(doLogin.payload)
		}
	}

	const onFailureGoogle = (res) => {
		setIsLoggedIn(false)
	}

	const onCallbackFacebook = async (res) => {
		const facebookData = {
			email: res.email,
			fullname: res.name,
			profile_picture: res.picture.data.url,
			provider: res.graphDomain,
			token: res.accessToken
		};

		const doLogin = await apiDoLogin(facebookData);

		if (!doLogin._error) {
			setIsLoggedIn(true)
			setMessage(doLogin.payload)
		} else {
			setIsLoggedIn(false)
			setMessage(doLogin.payload)
		}
	}

	//=============================================================//
	//=================== COMPONENT - FUNCTION ====================//
	//=============================================================//
	const apiDoLogin = async (data) => {
		return axios.post('/login', data,
			{
				headers: {
					'Content-Type': 'application/json',
				}
			})
			.then(res => {
				// console.log('apiDoLogin.response: ' + JSON.stringify(res.data));
				if (res.status === 200) {
					return res.data;
				} else {
					return { _error: 1, message: res.data.message };
				}
			})
			.catch(err => {
				// console.log('apiDoLogin.error: ' + JSON.stringify(err));
				if (err.response !== undefined && err.response.data !== null) {
					return { _error: 1, message: err.message };
				} else {
					return { _error: 1, message: err.message };
				}
			});
	}

	const { signIn } = useGoogleLogin({
		clientId,
		onSuccess: onSuccessGoogle,
		onFailure: onFailureGoogle,
		cookiePolicy: 'none',
		isSignedIn: false,
		accessType: 'offline'
	})

	//==========================================================//
	//=================== COMPONENT - RENDER ===================//
	//==========================================================//

	return (
		<Layout
			contentFull
			title='Login'
			headerTitle={`Daftar`}
			headerBack={`/`}
			showNavbar={showNavbar}>
			<div className='bg-white'>
				<div className="flex flex-col">
					<div className="flex-1">
						<div className="px-5 mt-7 mb-7">
							<h3 className="mb-2 font-black text-gray-900 text-lg">Daftar Sekarang</h3>
							<p className="text-gray-400 font-base text-md">
								Daftar dengan Google atau Facebook untuk menikmati berbagai
								permainan dan reward dari LinkAja
							</p>
						</div>
						<div className="px-5 mt-7">
							{/* BUTTON GOOGLE */}
							<button
								onClick={() => signIn()}
								className="flex flex-row justify-center w-full px-10 py-3 mb-5 rounded-full border border-ruby-base">
								<svg className="w-5 h-5 mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107" />
									<path d="M3.15283 7.3455L6.43833 9.755C7.32733 7.554 9.48033 6 11.9998 6C13.5293 6 14.9208 6.577 15.9803 7.5195L18.8088 4.691C17.0228 3.0265 14.6338 2 11.9998 2C8.15883 2 4.82783 4.1685 3.15283 7.3455Z" fill="#FF3D00" />
									<path d="M12.0002 21.9999C14.5832 21.9999 16.9302 21.0114 18.7047 19.4039L15.6097 16.7849C14.5719 17.574 13.3039 18.0009 12.0002 17.9999C9.39916 17.9999 7.19066 16.3414 6.35866 14.0269L3.09766 16.5394C4.75266 19.7779 8.11366 21.9999 12.0002 21.9999Z" fill="#4CAF50" />
									<path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2" />
								</svg>
								<span>Daftar dengan Google</span>
							</button>

							{/* BUTTON FACEBOOK */}
							<FacebookLogin
								appId={process.env.FACEBOOK_ID}
								callback={onCallbackFacebook}
								fields="name,email,picture"
								render={renderProps => (
									<button
										onClick={() => renderProps.onClick()}
										className='flex flex-row justify-center w-full px-8 py-3 mt-3 rounded-full border border-ruby-base'>
										<svg className="w-5 h-5 mr-2" width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
											<circle cx="15" cy="15" r="15" fill="#3B5999" />
											<path d="M17.4998 9.97244H18.9375V7.59176C18.6895 7.55932 17.8364 7.48633 16.8429 7.48633C12.2942 7.48633 13.5318 12.3837 13.3507 13.1011H11.0625V15.7625H13.35V22.4591H16.1546V15.7632H18.3495L18.698 13.1018H16.1539C16.2773 11.34 15.6546 9.97244 17.4998 9.97244Z" fill="white" />
										</svg>
										<span>Daftar dengan Facebook</span>
									</button>
								)}
							/>
						</div>
					</div>
				</div>
			</div>
		</Layout>
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