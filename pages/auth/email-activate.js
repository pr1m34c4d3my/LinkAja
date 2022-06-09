import Link from 'next/link'
import LayoutAuth from '@/components/desktop/LayoutAuth'

export default function EmailActivate({ dataEmail, dataRef }) {

  const _renderContent = () => {
    const mailTo = (typeof dataEmail === 'undefined' || dataEmail === null || dataEmail === '') ? `emailuser@mail.com` : dataEmail;
    const codeRef = (typeof dataRef === 'undefined' || dataRef === null || dataRef === '') ? `` : dataRef;

    return (
      <div className="">
        <h1 className="px-4 mt-4 mb-4 font-black text-2xl">Aktivasi Akun Anda</h1>
        <p className="px-4 mb-4 text-sm text-gray-500">Kami telah mengirimkan pesan ke <Link href={`mailto: ${mailTo}`}><a className="text-blueheavy">{mailTo}</a></Link></p>
        <p className="px-4 text-sm text-gray-500">
          Silahkan cek email Anda dan klik link aktivasi pada email. Jika Anda tidak menerima verifikasi email,
          silahkan cek di folder “Spam” atau dapat mengirim ulang verifikasi email dengan menekan tombol di bawah ini.
        </p>
        {codeRef ? `<p id="gtmReferral" className="px-4 text-sm text-gray-500">Kode referral : ${codeRef}</p>` : ''}
      </div>
    );
  }

  return (
    <LayoutAuth
      title={`Apa2Bisa - Aktivasi Akun Pendaftaran | LinkAja`}
      backLink={`/auth/email-auth`}
      backAsLink={`/auth`}
    >
      {_renderContent()}
    </LayoutAuth>
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