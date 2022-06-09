import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Layout from '@/components/mobiles/Layout'
import Skeleton from 'react-loading-skeleton'
import * as HelperComponents from '@/helpers/components'

export default function PageComponent({ showNavbar }) {

  return (
    <Layout title='Transaksi A-Z'
      headerTitle={`Transaksi A-Z`}
      headerBack={`/misi-harian/all`}>
      <div className="h-screen bg-gradient-to-b from-ruby-base to-white">
        <div>
          <img src='/images/missions/special-condition-transaksi-A-Z.png' alt='' className='w-full object-cover object-center' />
          <div className="relative px-4 -mt-2">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold truncate">Syarat dan Ketentuan</h3>
              <div className='text-gray-900 text-md mt-3'>
                Melakukan pembayaran menggunakan aplikasi LinkAja! min. 3x transaksi senilai Rp50.000 dalam satu minggu. (Senin - Jum’at)
                Transaksi hanya dihitung jika dilakukan sesuai dengan syarat dan ketentuan misi  yang tertera.(Misi transaksi dapat berubah setiap minggunya)
                Misi transaksi akan dihitung jika dilakukan setiap hari Senin - Jum’at.
                Poin kamu akan diperbarui setiap hari Senin pagi selanjutnya jika syarat terpenuhi.
                Menyetujui bahwa kami dapat memperoleh, mengumpulkan, mengirimkan, menyimpan, menganalisis, dan/atau mengolah informasi sehubungan dengan informasi Anda sesuai keberlakuan pada Kebijakan Privasi yang ada, baik yang diberikan sendiri, diperoleh dari pihak ketiga, dan/atau timbul akibat penggunaan LinkAja.
              </div>
            </div>
          </div>
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