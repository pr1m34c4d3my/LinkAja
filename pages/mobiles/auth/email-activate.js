import Link from 'next/link'
import Layout from '@/components/mobiles/Layout'


export default function AuthEmailActivate({
    dataEmail,
    dataRef
}) {

    const _renderContent = () => {
        const mailTo = (typeof dataEmail === 'undefined' || dataEmail === null || dataEmail === '') ? `emailuser@mail.com` : dataEmail;
        const codeRef = (typeof dataRef === 'undefined' || dataRef === null || dataRef === '') ? `` : dataRef;
        return (
            <div className="">
                <h1 className="px-4 mt-4 mb-4 font-bold text-lg">Aktivasi Akun Anda</h1>
                <p className="px-4 mb-4 text-xs">Kami telah mengirimkan pesan ke <Link href={`mailto: ${mailTo}`}><a className="text-blueheavy">{mailTo}</a></Link></p>
                <p className="px-4 text-xs">
                    Silahkan cek email Anda dan klik link aktivasi pada email. Jika Anda tidak menerima verifikasi email,
                    silahkan cek di folder “Spam”.
                </p>
                {codeRef ? `<p id="gtmReferral" className="px-4 text-sm text-gray-500">Kode referral : ${codeRef}</p>` : ''}
            </div>
        );
    }

    return (
        <Layout
            contentFull
            title={`Apa2Bisa - Aktivasi Akun Pendaftaran | LinkAja`}
            headerBack={`/auth/email-auth`}
            headerBackAs={`/auth`}
            backgroundColor={'bg-white'}>
            {_renderContent()}
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    const ctxQuery = ctx.req.query;
    const queryEmail = ctxQuery.email;
    const queryRefCode = ctxQuery.ref;

    return {
        props: {
            dataEmail: queryEmail,
            dataRef: queryRefCode
        }
    }
}