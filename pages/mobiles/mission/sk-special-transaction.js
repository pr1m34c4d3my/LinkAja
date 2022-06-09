import axios from 'axios'
import Link from 'next/link'
import Router from 'next/router'
import { message } from 'antd'
import Layout from "@/components/mobiles/Layout";

export default function MissonSpecialTransactionSK({ dataId }) {

    //=============================================================//
    //=================== COMPONENT - LISTENER ====================//
    //=============================================================//

    //=============================================================//
    //=================== COMPONENT - FUNCTION ====================//
    //=============================================================//

    //==========================================================//
    //=================== COMPONENT - RENDER ===================//
    //==========================================================//
    const _renderContent = () => {
        return (
            <div className="pb-4">
                <div className="p-4 mx-4 rounded-lg bg-white">
                    <h1 className="font-extrabold text-xs">Syarat dan Ketentuan</h1>
                    <div className="py-2 pl-4 pr-1 text-xs">
                        <ol className="list-decimal">
                            <li className="py-0.5">Pengguna LinkAja dapat mengikuti Misi Transaksi A-Z melalui microsite apa2bisa.linkaja.id</li>
                            <li className="py-0.5">Setiap misi, pengguna dapat melakukan transaksi maksimal 2x /minggu / kategori misi</li>
                            <li className="py-0.5">Poin yang didapat pengguna tidak berlaku kelipatan, Contoh: Jika transaksi isi saldo LinkAja di atas nominal yang ditentukan, poin yang didapat tetap 150 walau nominal transaksi di atas Rp100.000 sesuai syarat.</li>
                            <li className="py-0.5">Nominal minimal transaksi & jumlah poin yang didapat berdasarkan kategori misi yang dipilih</li>
                            <li className="py-0.5">Misi Transaksi A-Z mencakup kategori, sebagai berikut
                                <ul className="py-1 px-2.5" style={{ listStyleType: 'lower-alpha' }}>
                                    <li className="py-0.5">Isi Saldo di Bank & Transfer uang minimal transaksi Rp50,000 mendapatkan 150 poin per transaksi</li>
                                    {/* <li className="py-0.5">Telekomunikasi minimal transaksi Rp50,000 mendapatkan 150 poin per transaksi.</li> */}
                                    <li className="py-0.5">Tagihan; PLN, PDAM, TV Kabel, Internet, Pajak, Pendidikan minimal transaksi Rp50,000 mendapatkan 150 poin per transaksi</li>
                                    <li className="py-0.5">Games & Hiburan minimal transaksi Rp30,000 mendapatkan 150 poin per transaksi</li>
                                    <li className="py-0.5">Layanan Keuangan; BPJS, asuransi, Investasi, Pinjaman, pay later, tagihan multifinance minimal transaksi Rp50,000 mendapatkan 150 poin per transaksi</li>
                                    <li className="py-0.5">Merchant & Swalayan; Restoran, Kafe, Toko, Minimarket, Supermarket lokal dan nasional minimal transaksi Rp50,000 mendapatkan 150 poin per transaksi</li>
                                    <li className="py-0.5">Jalan-jalan & Delivery Makanan minimal transaksi Rp50,000 mendapatkan 150 poin per transaksi</li>
                                    <li className="py-0.5">E-commerce, Layanan Rumah, Kesehatan; Marketplace, Toko Online, jasa servis rumah, kesehatan minimal transaksi Rp50,000 mendapatkan 150 poin per transaksi</li>
                                    <li className="py-0.5">Transportasi & Parkir; Transjakarta, MRT, LRT, KCI, KAI, Parkir minimal transaksi Rp15,000 mendapatkan 100 poin per transaksi</li>
                                    <li className="py-0.5">Investasi untuk masa depan di Reksadana, Emas, Crypto minimal transaksi Rp50,000 mendapatkan 150 poin per transaksi</li>
                                    <li className="py-0.5">Telekomunikasi minimal transaksi Rp50.000 mendapatkan poin 100 per transaksi</li>
                                </ul>
                            </li>
                            <li className="py-0.5">Poin yang dikumpulkan dapat digunakan untuk <Link href='/mobiles/hadiah' as='/hadiah'><a className='underline text-ruby-base'>redeem poin</a></Link> hadiah melalui microsite apa2bisa.linkaja.id</li>
                            <li className="py-0.5">Proses <Link href='/mobiles/hadiah' as='/hadiah'><a className='underline text-ruby-base'>redeem poin</a></Link> hanya akan dinyatakan berhasil setelah LinkAja menyatakan bahwa hasil validasi yang dilakukan LinkAja atas misi transaksi yang dilakukan pengguna dinyatakan sesuai oleh LinkAja.</li>
                            <li className="py-0.5">Pengguna memahami bahwa keputusan LinkAja atas pelaksanaan hasil validasi adalah bersifat final sehingga pengguna tidak akan mengganggu gugat hasil keputusan akhir dari LinkAja atas pelaksanaan validasi misi transaksi dan redeem poin yang dilakukan Pengguna.</li>
                            <li className="py-0.5">Misi dan pengumpulan poin berlaku di LinkAja & Layanan Syariah LinkAja</li>
                            <li className="py-0.5">Periode Program: 6 - 31 Januari 2022</li>
                        </ol>
                    </div>
                </div>
            </div>
        );
    }

    const _renderHeader = () => {
        return (
            <div className="w-full">
                <div className="w-full pt-4 pb-2">
                    <img className="block w-full object-cover object-center" src={`/images/mobiles/mission-daily-sk.png`} alt={``} />
                </div>
            </div>
        );
    }

    return (
        <Layout
            title={`Apa2Bisa - Misi Transaksi Harian Syarat & Ketentuan | LinkAja`}
            headerBack={`/mission`}
            headerBackAs={`/missions`}
            backgroundColor={'bg-linkajared'}>
            {_renderHeader()}
            {_renderContent()}
        </Layout>
    );
}

export async function getServerSideProps(ctx) {

    return {
        props: {

        }
    }
}