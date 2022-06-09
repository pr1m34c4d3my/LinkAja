import Link from 'next/link'
import LayoutAuth from '@/components/desktop/LayoutAuth'

export default function ActivateSuccess() {

  const _renderContent = () => {
    return (
      <div className="">
        <h1 className="px-4 mt-4 mb-4 font-bold text-lg">Akun Anda telah aktif</h1>
        <p className="px-4 mb-8 text-sm">Selamat akun Anda telah aktif silahkan login menggunakan email dan password yang telah Anda buat</p>
        <div className="px-4">
          <Link href={`/auth/email-auth`} as={`/auth`}>
            <a className="block w-full font-extrabold py-2.5 px-4 rounded-full text-center text-white bg-linkajared">Login</a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <LayoutAuth
      title={`Apa2Bisa - Aktivasi Akun Berhasil | LinkAja`}
      backLink={`/auth/email-auth`}
      backAsLink={`/auth`}
    >
      {_renderContent()}
    </LayoutAuth>
  )
}
