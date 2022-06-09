import { Breadcrumb } from 'antd'
import Layout from '@/components/mobiles/Layout'

export default function Toc() {
  return (
    <Layout
      title='Syarat Ketentuan'
      headerTitle={`Syarat Ketentuan`}
      headerBack={`/profile`}
    >
      <div className="bg-white p-4 min-h-screen">
        <div className="mb-3">
          <Breadcrumb separator=">">
            <Breadcrumb.Item>Profile</Breadcrumb.Item>
            <Breadcrumb.Item>Syarat Ketentuan</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="article">
          <h3 className="font-bold">Syarat dan Ketentuan APA2BISA</h3>
          <p>
            Syarat ketentuan di bawah ini mengatur pemakaian yang di tawarkan
            oleh Microsite Apa2bisa.
          </p>
          <p>Selamat Datang di Microsite Apa2bisa</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non
            nunc in tellus accumsan accumsan at a mauris. Proin eu pharetra
            lectus, vitae tincidunt libero.
          </p>
        </div>
      </div>
    </Layout>
  )
}