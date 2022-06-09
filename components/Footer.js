import Link from 'next/link'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'

export default function Footer() {
	return (
		<footer className='bg-ruby-base'>
			<div className='bg-no-repeat bg-right-top' style={{ backgroundImage: "url('/images/desktop/rectangle-L.png')" }}>
				<div className='container mx-auto px-6 lg:px-20 py-12' >
					<div className="flex flex-wrap">
						<div className='w-full md:w-1/3 mb-3'>
							<div className='flex justify-center md:justify-start'>
								<img src='/images/desktop/link-aja-white.png' className='h-18' />
								<img src='/images/apa2bisa.png' className='h-12' />
							</div>
						</div>
						<div className="w-full md:w-1/3 text-center md:text-left mb-3">
							<h5 className="mb-6 font-black text-white text-2xl">Sudah siapkah anda?</h5>
							<Link href={`/auth/email-auth`} as={`/auth`}>
								<a className='uppercase text-white font-black text-lg hover:text-white bg-red-600 py-3 px-10 rounded-full shadow-lg border border-ruby-base'>Mainkan Sekarang</a>
							</Link>
						</div>
						<div className="w-full md:w-1/3 text-center md:text-left">
							<h5 className="mb-6 font-extrabold text-lg text-white">Ikuti kami</h5>
							<ul className='flex justify-center md:justify-start'>
								<li className='mr-5 mb-5'>
									<Link href='/'>
										<a><FaFacebook color='white' size={20} /></a>
									</Link>
								</li>
								<li className='mr-5 mb-5'>
									<Link href='/'>
										<a><FaTwitter color='white' size={20} /></a>
									</Link>
								</li>
								<li className='mr-5 mb-5'>
									<Link href='/'>
										<a><FaLinkedin color='white' size={20} /></a>
									</Link>
								</li>
								<li className='mr-5 mb-5'>
									<Link href='/'>
										<a><FaInstagram color='white' size={20} /></a>
									</Link>
								</li>
								<li className='mr-5 mb-5'>
									<Link href='/'>
										<a><FaYoutube color='white' size={20} /></a>
									</Link>
								</li>
							</ul>
							<div className='flex justify-center md:justify-start'>
								<img src='/images/desktop/google-play.png' className='h-10' />
								<img src='/images/desktop/app-store.png' className='h-10 mx-2' />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-white rounded-t-2xl'>
				<div className='container mx-auto px-6'>
					<div className='flex justify-center md:items-center md:justify-between p-4 md:p-8'>
						<ul className='flex mb-4 md:order-1 md:ml-4 md:mb-0'>
							<li>
								<Link href='/'>
									<a className='flex justify-center items-center text-gray-600 font-bold hover:text-gray-900 bg-white hover:bg-white-100'>FAQ</a>
								</Link>
							</li>
							<li className='ml-4'>
								<Link href='/'>
									<a className='flex justify-center items-center text-gray-600 font-bold hover:text-gray-900 bg-white hover:bg-white-100'>Hubungi Kami</a>
								</Link>
							</li>
							<li className='ml-4'>
								<Link href='/'>
									<a className='flex justify-center items-center text-gray-600 font-bold hover:text-gray-900 bg-white hover:bg-white-100'>Syarat dan Ketentuan</a>
								</Link>
							</li>
						</ul>
						<div className='text-center text-sm text-gray-600 mr-4'>
							© 2021 <span className="font-bold">Fintek Karya Nusantara</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}