import Link from 'next/link'
import Layout from '@/components/mobiles/Layout'


export default function AuthActivateSuccess() {

    const _renderContent = () => {
        return (
            <div className="">
                <h1 className="px-4 mt-4 mb-4 font-bold text-lg">Akun Anda telah aktif</h1>
                <p className="px-4 mb-8 text-xs">Selamat akun Anda telah aktif silahkan login menggunakan email dan password yang telah Anda buat</p>
                <div className="px-4">
                    <Link href={`/mobiles/auth/email-auth`} as={`/auth`}>
                        <a className="block w-full py-2.5 px-4 rounded-full text-center text-white bg-linkajared">Login</a>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <Layout
            contentFull
            title={`Apa2Bisa - Aktivasi Akun Berhasil | LinkAja`}
            headerBack={`/auth/email-auth`}
            headerBackAs={`/auth`}
            backgroundColor={'bg-white'}>
            { _renderContent() }
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    return {
        props: {}
    }
}