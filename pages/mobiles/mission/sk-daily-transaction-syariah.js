import { useState, useEffect } from 'react'
import axios from 'axios'

import Router from 'next/router'
import Link from 'next/link'
import { message } from 'antd'
import Layout from "@/components/mobiles/Layout";

export default function MissonSyariahDailyTransactionSK({
    dataId
}) {

    //=============================================================//
    //=================== COMPONENT - LISTENER ====================//
    //=============================================================//
    const onClickFollowChallange = async () => {
        const missionConditionId = (typeof dataId === 'undefined' || dataId === '') ? null : dataId;
        
        if (missionConditionId !== null) {
            const apiChallangeJoin = await __apiChallangeJoin(missionConditionId);
            console.log(`apiChallangeJoin: ${JSON.stringify(apiChallangeJoin)}`);
            if (!apiChallangeJoin._error) {
                Router.push(`/mobiles/mission/upload-transaction?id=${missionConditionId}`, `/missions/upload-transaksi?id=${missionConditionId}`);
            } else {
                message.error(`Maaf anda gagal mengikuti misi ini`);
            }
        }
    }

    //=============================================================//
    //=================== COMPONENT - FUNCTION ====================//
    //=============================================================//
    const __apiChallangeJoin = async (challangeId) => {
        return axios.post(`/challenge/${challangeId}/join`,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                return { _error: true , status: err.response.status, data: err.response.data};
            });
    }
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
                            <li className="py-0.5">Periode misi transaksi Jadi Berkah: 1-30 November 2021.</li>
                            <li className="py-0.5">Ikuti misi mingguan ini, pastikan pengguna sudah Full Service dan memverifikasi email.</li>
                            <li className="py-0.5">Untuk mendapatkan poin yang dapat digunakan pengguna untuk melakukan redeem dan bisa mendapatkan hadiah berkah, pengguna harus melakukan transaksi di dalam layanan LinkAja dengan syarat dan ketentuan misi transaksi spesial berikut ini:
                            <ul className="py-1 px-2.5"style={{ listStyleType: 'lower-alpha' }}>
                                <li className="py-0.5">Misi transaksi ini dapat dilakukan setiap minggu (Jumat - Kamis).</li>
                                <li className="py-0.5">Melakukan 4 (empat) kali transaksi dalam satu minggu berjalan dengan minimal Rp20.000 (dua puluh ribu Rupiah) untuk setiap transaksi (dapat melakukan transaksi di kategori yang sama).</li>
                                <li className="py-0.5">Misi transaksi tidak berlaku untuk kegiatan kirim uang ke akun LinkAja lain, dan kegiatan Tarik tunai di ATM.</li>
                                <li className="py-0.5">Untuk memvalidasi keabsahan transaksi, pengguna harus upload bukti transaksi di dalam microsite.</li>
                            </ul>
                        </li>
                            <li className="py-0.5">Beragam hadiah berkah menanti untuk penukaran poin, yang dapat kamu lihat <Link href={``} as={``}><a>di sini</a></Link></li>
                            <li className="py-0.5">Poin akan ter-update setiap hari Senin atau Selasa untuk transaksi yang dilakukan pada Minggu sebelumnya, yaitu Jumat-Kamis dengan ketentuan atas misi transaksi yang dilaksanakan telah dinyatakan sesuai oleh LinkAja berdasarkan validasi atas bukti transaksi terhadap misi transaksi yang diupload oleh pengguna.</li>
                            <li className="py-0.5">Validasi transaksi akan dilakukan setiap hari Kamis jam 21.01 WIB. Jika pengguna mengunggah bukti transaksi melebih waktu yang telah ditentukan maka perhitungan transaksi akan diakumulasi di Minggu berikutnya.</li>
                            <li className="py-0.5">Transaksi hanya dihitung jika dilakukan sesuai dengan syarat dan ketentuan misi yang tertera serta dengan turut mengacu kepada kebijakan yang berlaku di LinkAja (Misi transaksi dapat berubah setiap minggunya).</li>
                            <li className="py-0.5">Proses redeem poin hanya akan dinyatakan berhasil setelah LinkAja menyatakan bahwa hasil validasi yang dilakukan LinkAja atas misi transaksi yang dilakukan pengguna dinyatakan sesuai oleh LinkAja.</li>
                            <li className="py-0.5">Pengguna memahami bahwa keputusan LinkAja atas pelaksanaan hasil validasi adalah bersifat final sehingga pengguna tidak akan mengganggu gugat hasil keputusan akhir dari LinkAja atas pelaksanaan validasi misi transaksi dan redeem poin yang dilakukan Pengguna.</li>
                            <li className="py-0.5">Misi dan koleksi poin berlaku di LinkAja &amp; Layanan Syariah LinkAja.</li>
                            <li className="py-0.5">Ketentuan Hadiah Berkah sudah disesuaikan dengan prinsip syariah. Hadiah Berkah ini berasal dari biaya Promosi LinkAja dan bukan dari saldo pelanggan dengan Skema Akad Jualah.</li>
                            <li className="py-0.5">Promo ini sudah sesuai dengan prinsip syariah dan mendapatkan persetujuan Dewan Pengawas Syariah</li>
                            <li className="py-0.5">Setiap pengguna bertanggung jawab atas transaksi yang dilakukan melalui aplikasi Layanan Syariah LinkAja dan hanya dipergunakan untuk transaksi yang sesuai prinsip syariah.</li>
                            <li className="py-0.5">Pengguna dengan ini menyetujui bahwa LinkAja dapat memperoleh, mengumpulkan, mengirimkan, menyimpan, menganalisis, dan/atau mengolah informasi sehubungan dengan informasi pengguna sesuai keberlakuan pada Kebijakan Privasi yang ada, baik yang diberikan sendiri, diperoleh dari pihak ketiga, dan/atau timbul akibat penggunaan LinkAja.</li>
                            <li className="py-0.5">Pengguna dengan ini memahami bahwa perihal ketentuan pelaksanaan misi transaksi, redeem poin yang dilakukan pengguna, serta penerimaan hadiah selain dari mengacu kepada ketentuan atas Syarat dan Ketentuan ini, akan turut mengacu kepada Syarat dan Ketentuan Layanan LinkAja serta kebijakan internal yang berlaku di LinkAja.</li>
                        </ol>
                    </div>
                    <a className="block w-full py-2 px-4 mt-4 rounded-full text-xs text-center text-white bg-linkajatosca" onClick={() => onClickFollowChallange()}>Setuju dan Ikuti Misi</a>
                </div>
            </div>
        );
    }

    const _renderBannerImage = () => {
        return (
            <div className="w-full">
                <div className="w-full pt-4 pb-2">
                    <img className="block w-full object-cover object-center" src={`/images/mobiles/mission-daily-sk-syariah.png`} alt={``} />
                </div>
            </div>
        );
    }
    return (
        <Layout
            title={`ApaBisa - Misi Syariah Transaksi Harian Syarat & Ketentuan | LinkAja`}
            headerBack={`/mission`}
            headerBackAs={`/missions`}
            backgroundColor={'bg-linkajatosca'}>
            { _renderBannerImage() }
            { _renderContent() }
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    const ctxQuery  = ctx.req.query;
    const queryId   = ctxQuery.id;
    
    return {
        props: {
            dataId: queryId,
        }
    }
}