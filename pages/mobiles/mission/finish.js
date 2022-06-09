import Layout from '@/components/mobiles/Layout'
import * as HelperComponents from '@/helpers/components'

export default function PageComponent({ showNavbar }) {
  return (
    <Layout title='Misi Harian'
      headerTitle={`Misi Harian`}
      headerBack={`/dashboard`}
      showNavbar={showNavbar}>
      <div className='mt-2'>
        <h2 className="text-gray-500 font-bold">Misi Harian</h2>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  // console.log(`session: ${JSON.stringify(sessionAccessToken)}`);
  const showNavbar = HelperComponents.isNavbarShow(context);

  return {
    props: {
      showNavbar,
    }
  }
}