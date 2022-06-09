import { Formik, Form, Field } from 'formik';
import LayoutAuth from '@/components/desktop/LayoutAuth'

export default function PasswordReset() {

  //==========================================================//
  //=================== COMPONENT - RENDER ===================//
  //==========================================================//
  const _renderResetForm = () => {
    return (
      <Formik
        initialValues={{ email: '' }}>
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div className="">
              <div className="px-4 mb-4">
                <label className="block mb-1 font-bold text-sm">Password</label>
                <Field name="password">
                  {({ field, form, meta }) => (
                    <div className="rounded-md border border-pearlsoft bg-pearlheavy overflow-hidden">
                      <input className="w-full py-2 px-3 rounded-md text-sm text-rootblack bg-pearlheavy" {...field} type="password" />
                    </div>
                  )}
                </Field>
              </div>
              <div className="px-4 mb-4">
                <label className="block mb-1 font-bold text-sm">Konfirmasi Password</label>
                <Field name="password">
                  {({ field, form, meta }) => (
                    <div className="rounded-md border border-pearlsoft bg-pearlheavy overflow-hidden">
                      <input className="w-full py-2 px-3 rounded-md text-sm text-rootblack bg-pearlheavy" {...field} type="password" />
                    </div>
                  )}
                </Field>
              </div>
            </div>
            <div className="pt-8 pb-4 px-4">
              <button className="w-full font-extrabold py-2.5 px-4 rounded-full text-lg text-center text-white bg-linkajared">Simpan</button>
            </div>
          </Form>
        )}
      </Formik>
    );
  }

  const _renderContent = () => {
    return (
      <div className="">
        <div className="pt-4 px-4">
          <h1 className="font-extrabold text-xl">Reset Password</h1>
          <span className="text-sm text-pearlroot">Masukan password baru kamu</span>
        </div>
        <div className="pt-8">
          {_renderResetForm()}
        </div>
      </div>
    );
  }

  return (
    <LayoutAuth
      title={`Apa2Bisa - Ganti Password | LinkAja`}
      backLink={`/auth/email-auth`}
      backAsLink={`/auth`}
    >
      {_renderContent()}
    </LayoutAuth>
  );

}