import { Breadcrumb } from 'antd'
import Link from 'next/link'
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
          <ol className='p-4 text-justify' style={{ listStyleType: "upper-number" }}>
            <li>Dengan ini, pengguna menyatakan, menjamin penggunaan <Link href='https://apa2bisa.linkaja.id'><a className='text-ruby-base'>www.apa2bisa.linkaja.id</a></Link> dan hanya akan digunakan sesuai yang telah ditentukan dalam Syarat dan Ketentuan Layanan LinkAja ini, serta untuk tujuan yang sah dan tidak melanggar ketentuan hukum yang berlaku di Negara Republik Indonesia.</li>
            <li>Pengguna dianggap telah memahami segala risiko yang mungkin timbul atas penggunaan LinkAja. Atas hal tersebut, Kami kembali ingatkan kepada pengguna untuk memperhatikan hal-hal sebagai berikut:
              <ul className='pl-4 text-justify' style={{ listStyleType: "lower-alpha" }}>
                <li>Kami tidak pernah meminta detail akses terhadap Akun LinkAja, seperti kode verifikasi dalam bentuk OTP dan detail akses lainnya yang hanya diketahui oleh pengguna, atas alasan apapun kecuali terkait dengan dan untuk memenuhi permintaan langsung dari pengguna seperti untuk sebatas keperluan yang dibutuhkan dalam hal recovery Akun LinkAja.</li>
                <li>Kami tidak akan pernah menghubungi pengguna untuk meminta informasi detail akses maupun informasi pribadi lainnya yang dapat digunakan untuk memperoleh hak akses akun Pengguna, sehingga Kami menghimbau untuk tidak menanggapi pihak yang mengatasnamakan LinkAja yang meminta hal tersebut dan senantiasa menjaga kerahasiaan informasi pribadi.</li>
                <li>Kami mengimbau pengguna hanya untuk menghubungi layanan informasi resmi yang tertera dalam Syarat dan Ketentuan Layanan LinkAja atau rekanan yang ditunjuk resmi untuk menghubungi pengguna dan tidak menanggapi setiap pihak yang mengaku sebagai perwakilan resmi dari Finarya yang menghubungi di luar dari layanan informasi resmi tersebut. </li>
              </ul>
            </li>
            <li>Pengguna sepenuhnya bertanggungjawab atas kerahasiaan OTP yang diberikan kepada layanan LinkAja dan membebaskan Finarya dari segala kelalaian, kesalahan, dan/atau tindakan yang menyebabkan kebocoran atas kerahasiaan OTP yang pengguna terima, serta menyebabkan kerugian dalam bentuk apapun.</li>
            <li>Perlu Kami informasikan bahwa setiap informasi mengenai promo, hadiah, atau undian disampaikan melalui aplikasi LinkAja, media sosial resmi LinkAja, website resmi LinkAja. - <Link href='https://linkaja.id'><a>www.linkaja.id</a></Link>, (<Link href='https://apa2bisa.linkaja.id'><a className='text-ruby-base'>www.apa2bisa.linkaja.id</a></Link>), dan/atau layanan pelanggan LinkAja. Kami tidak pernah meminta untuk melakukan transfer uang ke rekening manapun dengan menjanjikan adanya promo, hadiah, atau undian.</li>
            <li>Dalam menggunakan layanan <Link href='https://apa2bisa.linkaja.id'><a className='text-ruby-base'>www.apa2bisa.linkaja.id</a></Link>, pengguna menyadari bahwa atas penggunaan fitur yang ada pada layanan LinkAja, maka pengguna turut terikat dengan Syarat dan Ketentuan masing-masing fitur yang digunakan.</li>
            <li>Dengan ini, pengguna dianggap telah memahami bahwa apabila terdapat ketentuan dalam ketentuan Fitur tersebut yang bertentangan secara langsung dengan ketentuan yang tertuang pada Syarat dan Ketentuan Layanan LinkAja, maka ketentuan yang berlaku atas penggunaan fitur/layanan khusus tersebut adalah Syarat dan Ketentuan Fitur yang bersangkutan dan Syarat dan Ketentuan Layanan LinkAja ini akan tetap berlaku kepada pengguna terhadap hal-hal yang tidak diatur dalam Fitur. Pengguna diimbau untuk membaca dengan seksama Syarat dan Ketentuan Fitur yang bersangkutan. </li>
            <li>Pengguna setuju bahwa <Link href='https://apa2bisa.linkaja.id'><a className='text-ruby-base'>www.apa2bisa.linkaja.id</a></Link> dapat memperoleh, mengumpulkan, mengirimkan, menyimpan, menganalisis, dan/atau mengolah informasi sehubungan dengan informasi pengguna sesuai keberlakuan pada Kebijakan Privasi yang ada pada Finarya, baik yang diberikan sendiri oleh pengguna, diperoleh dari pihak ketiga atau rekanan resmi LinkAja, dan/atau timbul akibat penggunaan LinkAja.</li>
            <li>Pengguna wajib tunduk pada ketentuan-ketentuan dan peraturan-peraturan yang berlaku, serta syarat-syarat dan ketentuan-ketentuan yang mengatur semua jasa fasilitas dan fitur yang ada pada <Link href='https://apa2bisa.linkaja.id'><a className='text-ruby-base'>www.apa2bisa.linkaja.id</a></Link>.</li>
            <li>Syarat dan Ketentuan <Link href='https://apa2bisa.linkaja.id'><a className='text-ruby-base'>www.apa2bisa.linkaja.id</a></Link> ini berlaku hingga adanya perubahan atas isi Syarat dan Ketentuan ini yang akan diumumkan kepada Pengguna.</li>
            <li>Terkait penukaran hadiah yang ada, pihak LinkAja melalui layanan pelanggan dan/atau pihak ketiga yang ditunjuk akan mengkonfirmasi ke pelanggan. Dengan sebelumnya, menginformasikan bahwa kontak terkait adalah resmi melalui media sosial resmi LinkAja atau website resmi kami www.linkaja.id dan microsite <Link href='https://apa2bisa.linkaja.id'><a className='text-ruby-base'>www.apa2bisa.linkaja.id</a></Link>.</li>
          </ol>
        </div>
      </div>
    </Layout>
  )
}