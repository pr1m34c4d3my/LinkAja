import axios from 'axios'
import * as HelperComponents from '@/helpers/components'
import Layout from '@/components/mobiles/Layout'

export default function Permainan({
	showNavbar,
}) {

	const data = [
		{
			title: 'Bisa Buka',
			summary: 'Tebak dimana pintu yang terdapat poin paling banyak?',
			chances: 1,
			isEnable: true,
			imgPath: '/images/games/thumbnail/bisa-aja.png',
			path: '/mobiles/permainan/bisa-buka',
			url: '/permainan/bisa-buka',
		},
		{
			title: 'Bisa Tangkep',
			summary: 'Lihat hadiahmu dan pancing sekarang',
			chances: 0,
			isEnable: process.env.BISA_TANGKAP_ENABLED,
			imgPath: '/images/games/thumbnail/lomba-aja.png',
			path: '/mobiles/permainan/bisa-tangkep',
			url: '/permainan/bisa-tangkep',
		},
		{
			title: 'Bisa Jawab',
			summary: 'Asah kemampuanmu dalam kuis A-Z',
			chances: 0,
			isEnable: process.env.BISA_JAWAB_ENABLED,
			imgPath: '/images/games/thumbnail/kuis-a-z.png',
			path: '/mobiles/permainan/bisa-jawab',
			url: '/permainan/bisa-jawab',
		}
	]


	function renderChancesText(game) {
		const { chances } = game
		if (chances >= 1) {
			return <p className="text-gray-700 text-xs">Kesempatan Bermain {chances}x Lagi di Hari ini</p>
		} else {
			return (
				<p className="text-gray-300 text-xs">
					Kesempatan Bermain Telah Habis, Coba Kembali Hari Berikutnya
				</p>
			)
		}
	}

	//=============================================================//
	//=================== COMPONENT - LISTENER ====================//
	//=============================================================//
	const onClickGameNav = (e, game) => {
		e.preventDefault();

		if (game === 'Bisa Tangkep') {
			apiInitGameBisaTangkep();
		} else if (game === 'Bisa Buka') {
			apiInitGameBisaBuka();
		} else if (game === 'Bisa Jawab') {
			apiInitGameBisaJawab();
		} else {

		}
	}

	//=============================================================//
	//=================== COMPONENT - FUNCTION ====================//
	//=============================================================//
	const apiInitGameBisaTangkep = async () => {
		return axios.post('/permainan/bisa-tangkep',
			{
				headers: {
					'Content-Type': 'application/json',
				}
			})
			.then(res => {
				console.log(`redirect: ${JSON.stringify(res.data)}`);
				if (!res.data._error) {
					window.location = res.data.payload;
				}
			})
			.catch(err => {
				// setGameUrl(null);
			});
	}

	const apiInitGameBisaBuka = async () => {
		return axios.post('/permainan/bisa-buka',
			{
				headers: {
					'Content-Type': 'application/json',
				}
			})
			.then(res => {
				console.log(`redirect: ${JSON.stringify(res.data)}`);
				if (!res.data._error) {
					window.location = res.data.payload;
				}
			})
			.catch(err => {
				// setGameUrl(null);
			});
	}

	const apiInitGameBisaJawab = async () => {
		return axios.post('/permainan/bisa-jawab',
			{
				headers: {
					'Content-Type': 'application/json',
				}
			})
			.then(res => {
				if (!res.data._error) {
					window.location = res.data.payload;
				}
			})
			.catch(err => {
				// setGameUrl(null);
			});
	}

	//==========================================================//
	//=================== COMPONENT - RENDER ===================//
	//==========================================================//
	return (
		<Layout title='Permainan' showNavbar={showNavbar}>
			<div className="p-4 bg-white">
				<h3 className="font-bold text-base mb-3">Permainan</h3>
				<div>
					{data.map((item, index) => {
						return (
							<div key={index} className={`${item.isEnable ? 'bg-white' : 'bg-gray-100'} shadow-md rounded-lg border border-gray-200 p-3 mb-4`}>
								<div className="flex mb-2">
									<div className="w-8/12 font-title">
										<div className={`${item.isEnable ? 'text-ruby-base' : 'text-gray-400'} text-lg font-bold mb-1`}>{item.title}</div>
										<p className={`${item.isEnable ? 'txt-gray-500' : 'txt-gray-100'} text-xs py-2`}>{item.summary}</p>
										{item.isEnable ?
											<a className={`${item.isEnable ? 'bg-ruby-base' : 'bg-gray-500'} text-gray-100 hover:text-gray-100 px-6 py-2 rounded-full cursor-pointer mb-1 inline-block`}
												onClick={(e) => onClickGameNav(e, item.title)}
											>
												Mainkan
											</a>
											:
											<div className='bg-gray-500 text-gray-100 hover:text-gray-100 px-6 py-2 rounded-full cursor-pointer mb-1 inline-block'>
												Coming Soon
											</div>
										}
									</div>
									<div className="w-4/12 flex justify-end">
										<div className="m-2" style={{ height: '88px', width: '88px' }}>
											<img
												src={item.imgPath}
												alt="thumbnail"
												className="w-full h-full object-center object-cover rounded-lg shadow-xl"
											/>
										</div>
									</div>
								</div>
								{/* {renderChancesText(item)} */}
							</div>
						)
					})}
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