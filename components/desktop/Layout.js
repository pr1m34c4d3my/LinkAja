import Head from 'next/head'
import Header from '@/components/desktop/Header'
import Menu from '@/components/desktop/Menu'

export default function Layout({
  title,
  keywords,
  description,
  children
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
        <meta name="linkaja_partner" content='Trad3mark' />
        <meta name="linkaja_title" content={title} />
        <meta name="linkaja_description" content={description} />
      </Head>
      <div className='bg-carbon-light min-h-screen'>
        <Header />
        <div className="container mx-auto flex pt-4">
          <div className="w-2/12 lg:w-3/12 xl:w-2/12 px-2">
            <Menu />
          </div>
          <div className="w-10/12 lg:w-9/12 xl:w-10/12 px-2">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}