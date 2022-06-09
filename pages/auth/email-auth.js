import { useState } from 'react';
import axios from 'axios'

import { Formik, Form, Field } from 'formik';
import { Tabs, Spin, message } from 'antd'
import Link from 'next/link'
import Router from 'next/router'
import LayoutAuth from '@/components/desktop/LayoutAuth'

export default function EmailAuth({ dataRef }) {
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  //=============================================================//
  //=================== COMPONENT - LISTENER ====================//
  //=============================================================//
  const onSubmitFormRegister = async (values) => {
    const fullname = values.fullname;
    const email = values.email;
    const password = values.password;
    const password_confirmation = values.repassword;
    const ref = (typeof dataRef === 'undefined' || dataRef === '') ? null : dataRef;

    if (fullname === null || fullname === '') {
      message.error(`Nama tidak boleh kosong`);
    } else if (email === null || email === '') {
      message.error(`Email tidak boleh kosong`);
    } else if (password === null || password === '') {
      message.error(`Password tidak boleh kosong`);
    } else if (password !== password_confirmation) {
      message.error(`Konfirmasi password tidak cocok`);
    } else {

      const apiDoRegister = await __apiDoRegister({ fullname, email, password, password_confirmation, ref: ref });

      if (!apiDoRegister._error) {
        setIsRegisterLoading(false);
        Router.replace(`/auth/email-activate?email=${email}&ref=${ref}`, `/auth/activation?email=${email}&ref=${ref}`);
      } else {
        setIsRegisterLoading(false);

        if (apiDoRegister.data[0].param == 'email') message.error(`Maaf email sudah digunakan`);
        else message.error(`Anda gagal melakukan pendaftaran`);
      }
    }
  }

  const onSubmitFormLogin = async (values) => {
    const email = values.email;
    const password = values.password;
    const remember = values.remember;
    const ref = (typeof dataRef === 'undefined' || dataRef === '') ? null : dataRef;

    if (email === null || email === '') {
      message.error(`Email tidak boleh kosong`);
    } else if (password === null || password === '') {
      message.error(`Password tidak boleh kosong`);
    } else {
      const apiDoLogin = await __apiDoLogin({ email, password, provider: 'email', ref: ref });

      if (!apiDoLogin._error) {
        setIsLoginLoading(false);
        Router.replace(`/dashboard`, `/dashboard`);
      } else {
        message.error(`Periksa kembali email & password anda`);
        setIsLoginLoading(false);
      }
    }
  }

  //=============================================================//
  //=================== COMPONENT - FUNCTION ====================//
  //=============================================================//
  const __apiDoRegister = async (data) => {
    setIsRegisterLoading(true);

    return axios.post('/register',
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
        return err.response.data;
      });
  }

  const __apiDoLogin = async (data) => {
    setIsLoginLoading(true);

    return axios.post('/login',
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
        return err.response.data;
      });
  }

  //==========================================================//
  //=================== COMPONENT - RENDER ===================//
  //==========================================================//
  const _renderRegisterForm = () => {
    return (
      <Formik
        initialValues={{ fullname: '', email: '', password: '', repassword: '' }}
        onSubmit={onSubmitFormRegister}>
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="flex flex-col justify-between h-full pt-2 pb-6">
            <div className="flex-1">
              <div className="px-4 mb-4">
                <label className="block mb-1 font-bold text-sm">Nama Lengkap</label>
                <Field name="fullname">
                  {({ field, form, meta }) => (
                    <div className="rounded-md border border-pearlsoft bg-pearlheavy overflow-hidden">
                      <input className="w-full py-2 px-3 rounded-md text-sm text-rootblack bg-pearlheavy" {...field} type="text" placeholder="Min 5 karakter" />
                    </div>
                  )}
                </Field>
              </div>
              <div className="px-4 mb-4">
                <label className="block mb-1 font-bold text-sm">Email</label>
                <Field name="email">
                  {({ field, form, meta }) => (
                    <div className="rounded-md border border-pearlsoft bg-pearlheavy overflow-hidden">
                      <input className="w-full py-2 px-3 rounded-md text-sm text-rootblack bg-pearlheavy" {...field} type="email" placeholder="ex: linkajadid@mail.com" />
                    </div>
                  )}
                </Field>
              </div>
              <div className="px-4 mb-4">
                <label className="block mb-1 font-bold text-sm">Password</label>
                <Field name="password">
                  {({ field, form, meta }) => (
                    <div className="rounded-md border border-pearlsoft bg-pearlheavy overflow-hidden">
                      <input className="w-full py-2 px-3 rounded-md text-sm text-rootblack bg-pearlheavy" {...field} type="password" placeholder="Min 8 karakter" />
                    </div>
                  )}
                </Field>
              </div>
              <div className="px-4 mb-2">
                <label className="block mb-1 font-bold text-sm">Konfirmasi Password</label>
                <Field name="repassword">
                  {({ field, form, meta }) => (
                    <div className="rounded-md border border-pearlsoft bg-pearlheavy overflow-hidden">
                      <input className="w-full py-2 px-3 rounded-md text-sm text-rootblack bg-pearlheavy" {...field} type="password" placeholder="Min 8 karakter" />
                    </div>
                  )}
                </Field>
              </div>
            </div>
            <div className="px-4">
              {!isRegisterLoading && <button className="w-full font-extrabold py-2.5 px-4 rounded-full text-md text-center text-white bg-linkajared" type="submit">Daftar Sekarang</button>}
              {isRegisterLoading && <div className="flex justify-center items-center"><Spin size="default" /></div>}
            </div>
          </Form>
        )}
      </Formik >
    )
  }

  const _renderLoginForm = () => {
    return (
      <Formik
        initialValues={{ email: '', password: '', remember: '' }}
        onSubmit={onSubmitFormLogin}>
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="flex flex-col justify-between h-full pt-2 pb-6">
            <div className="flex-1">
              <div className="px-4 mb-4">
                <label className="block mb-1 font-bold text-sm">Email</label>
                <Field name="email">
                  {({ field, form, meta }) => (
                    <div className="rounded-md border border-pearlsoft bg-pearlheavy overflow-hidden">
                      <input className="w-full py-2 px-3 rounded-md text-sm text-rootblack bg-pearlheavy" {...field} type="email" placeholder="ex: linkajadid@mail.com" />
                    </div>
                  )}
                </Field>
              </div>
              <div className="px-4 mb-4">
                <label className="block mb-1 font-bold text-sm">Password</label>
                <Field name="password">
                  {({ field, form, meta }) => (
                    <div className="rounded-md border border-pearlsoft bg-pearlheavy overflow-hidden">
                      <input className="w-full py-2 px-3 rounded-md text-sm text-rootblack bg-pearlheavy" {...field} type="password" placeholder="Min 8 karakter" />
                    </div>
                  )}
                </Field>
              </div>
              <div className="flex justify-between items-center px-4">
                <div className="flex-1">
                  <Field name="remember">
                    {({ field, form, meta }) => (
                      <div className="flex items-center">
                        <input className="mt-0.5 mr-2 form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-ruby-base checked:border-transparent focus:outline-none" type="checkbox" {...field} />
                        <span className="text-sm">Ingat Saya</span>
                      </div>
                    )}
                  </Field>
                </div>
                <div className="flex-1 flex justify-end">
                  <Link href={`/auth/email-forgot`} as={`/auth/forgot`}>
                    <a className="text-sm text-linkajared">Lupa Password?</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="px-4">
              {!isLoginLoading && <button className="w-full font-extrabold py-2.5 px-4 rounded-full text-md text-center text-white bg-linkajared" type="submit">Login</button>}
              {isLoginLoading && <div className="flex justify-center items-center"><Spin size="default" /></div>}
            </div>
          </Form>
        )}
      </Formik>
    )
  }

  const _renderRegisterContent = () => {
    return (
      <div className="h-full pt-4">
        <h1 className="px-4 font-black text-2xl">Daftar ke Apa2Bisa LinkAja</h1>
        <div className="h-full pt-6 pb-4">
          {_renderRegisterForm()}
        </div>
      </div>
    );
  }

  const _renderLoginContent = () => {
    return (
      <div className="h-full pt-4">
        <h1 className="px-4 font-black text-2xl">Login ke Apa2Bisa LinkAja</h1>
        <div className="h-full pt-6 pb-4">
          {_renderLoginForm()}
        </div>
      </div>
    );
  }



  const _renderTabLayout = () => {
    return (
      <div className="tabs-login-desktop h-full pt-2">
        <Tabs defaultActiveKey="1" animated={{ inkBar: false, tabPane: false }}>
          <Tabs.TabPane tab="Login" key="1">
            {_renderLoginContent()}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Daftar" key="2">
            {_renderRegisterContent()}
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }

  return (
    <LayoutAuth
      title={`Apa2Bisa - Login & Register | LinkAja`}
      backLink={`/`}
      backAsLink={`/`}
    >
      {_renderTabLayout()}
    </LayoutAuth>
  );
}

export async function getServerSideProps(ctx) {
  const ctxQuery = ctx.req.query;
  const queryRef = (typeof ctxQuery.ref === 'undefined' || ctxQuery.ref === '') ? null : ctxQuery.ref;

  return {
    props: {
      dataRef: queryRef
    }
  }
}