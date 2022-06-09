import { useState } from 'react';
import axios from 'axios'

import { Formik, Form, Field } from 'formik';
import { Spin, message } from 'antd'
import LayoutAuth from '@/components/desktop/LayoutAuth'

export default function EmailForgot() {
  const [isForgotLoading, setIsForgotLoading] = useState(false);

  //=============================================================//
  //=================== COMPONENT - LISTENER ====================//
  //=============================================================//
  const onSubmitFormForgot = async (values) => {
    const email = values.email;

    if (email === null || email === '') {
      message.error(`Email tidak boleh kosong`);
    } else {
      const apiDoForgot = await __apiDoForgot({ email });

      if (!apiDoForgot._error) {
        setIsForgotLoading(false);
        message.success(`Silahkan cek email anda`);
      } else {
        const payload = apiDoForgot.payload;

        setIsForgotLoading(false);

        if (payload.status === 500) message.error(`Maaf email belum terdaftar`);
        else message.error(`Anda gagal melakukan lupa password`);
      }
    }
  }

  //=============================================================//
  //=================== COMPONENT - FUNCTION ====================//
  //=============================================================//
  const __apiDoForgot = async (data) => {
    setIsForgotLoading(true);

    return axios.post('/forgot-password',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        return { _error: true, payload: err.response };
      });
  }

  //==========================================================//
  //=================== COMPONENT - RENDER ===================//
  //==========================================================//
  const _renderForgotForm = () => {
    return (
      <Formik
        initialValues={{ email: '' }}
        onSubmit={onSubmitFormForgot}>
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div className="px-4 mb-4">
              <label className="block mb-1 font-bold text-sm">Alamat Email</label>
              <Field name="email">
                {({ field, form, meta }) => (
                  <div className="rounded-md border border-pearlsoft bg-pearlheavy overflow-hidden">
                    <input className="w-full py-2 px-3 rounded-md text-sm text-rootblack bg-pearlheavy" {...field} type="email" placeholder="ex: linkajadid@mail.com" />
                  </div>
                )}
              </Field>
            </div>
            <div className="pt-8 pb-4 px-4">
              {!isForgotLoading && <button className="w-full font-extrabold py-2.5 px-4 rounded-full text-md text-center text-white bg-linkajared" type="submit">Kirim Reset Password</button>}
              {isForgotLoading && <div className="flex justify-center items-center"><Spin size="default" /></div>}
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
          <h1 className="font-black text-2xl">Lupa Password</h1>
          <span className="text-left text-gray-400">Masukkan email yang terdaftar di Apa2Bisa</span>
        </div>
        <div className="pt-8">
          {_renderForgotForm()}
        </div>
      </div>
    );
  }

  return (
    <LayoutAuth
      title={`Apa2Bisa - Lupa Password | LinkAja`}
      backLink={`/auth/email-auth`}
      backAsLink={`/auth`}
    >
      {_renderContent()}
    </LayoutAuth>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {}
  }
}
