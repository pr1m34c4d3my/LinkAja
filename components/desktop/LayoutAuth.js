import Head from 'next/head'
import Link from 'next/link'

export default function LayoutAuth({
  title,
  keywords,
  description,
  children,
  backLink,
  backAsLink
}) {
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

      <div className="bg-white w-full flex flex-wrap">
        <div className="w-full flex flex-wrap">
          <div className="w-1/2 shadow-2xl">
            <img className="object-cover w-full h-screen hidden md:block" src="/images/desktop/auth-picture.jpg" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="flex justify-start md:justify-start pt-12 pl-4 md:pl-12 md:-mb-24">
              <Link href={backLink} as={backAsLink}>
                <a className="flex text-gray-400 font-base text-md p-4">
                  <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.86245 2.225L8.37912 0.75L0.137451 9L8.38745 17.25L9.86245 15.775L3.08745 9L9.86245 2.225Z" fill="#E82428" />
                  </svg>
                  <span className='px-2'>Back</span>
                </a>
              </Link>
            </div>
            <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}