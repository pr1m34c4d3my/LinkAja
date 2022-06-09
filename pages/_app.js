// import { AuthProvider } from '@/context/AuthContext'
// import { ToastContainer } from 'react-toastify'

import 'antd/dist/antd.css'
import '@/styles/scss/tailwind.scss'
import '@/styles/scss/global.scss'
import '@/styles/font.css'
import '@/styles/scss/custom/swiper.scss'
import '@/styles/scss/custom/antd.scss'

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />
}

export default MyApp