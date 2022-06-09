import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import Layout from '@/components/mobiles/Layout'
import Router from 'next/router';
import { message } from 'antd';

export default function AuthPasswordReset({
    dataToken
}) {

    //=============================================================//
    //=================== COMPONENT - LISTENER ====================//
    //=============================================================//
    const onSubmitFormReset = async (values) => {
        const password = values.password;
        const password_confirmation = values.repassword;

        if (password === null || password === '') {
            message.error(`Password tidak boleh kosong`);
        } else if (password.length < 8) {
            message.error(`Password kurang dari 8 karakter`);
        } else if (password !== password_confirmation) {
            message.error(`Konfirmasi password tidak cocok`);
        } else {
            const token = (typeof dataToken === 'undefined' || dataToken === '') ? null : dataToken;
            const apiDoResetPassword = await __apiDoResetPassword({ password, password_confirmation, token: token });

            if (!apiDoResetPassword._error) {
                message.success(`Password anda berhasil diubah`);
                Router.replace(`/mobiles/auth`, `/auth`);
            } else {
                message.error(`Anda gagal melakukan reset password`);
            }
        }
    }

    //=============================================================//
    //=================== COMPONENT - FUNCTION ====================//
    //=============================================================//
    const __apiDoResetPassword = async (data) => {
        console.log(data);
        // setIsRegisterLoading(true);
        return axios.post('/reset-password/submit',
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
    const _renderResetForm = () => {
        return (
            <Formik
                initialValues={{ password: '', repassword: '' }}
                onSubmit={onSubmitFormReset}>
                {({ isSubmitting, values, setFieldValue }) => (
                    <Form>
                        <div className="">
                            <div className="px-4 mb-4">
                                <label className="block mb-1 font-bold text-xs">Password</label>
                                <Field name="password">
                                    {({ field, form, meta }) => (
                                        <div className="rounded-md border border-pearlsoft bg-pearlheavy overflow-hidden">
                                            <input className="w-full py-2 px-3 rounded-md text-xs text-rootblack bg-pearlheavy" {...field} type="password" />
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="px-4 mb-4">
                                <label className="block mb-1 font-bold text-xs">Konfirmasi Password</label>
                                <Field name="repassword">
                                    {({ field, form, meta }) => (
                                        <div className="rounded-md border border-pearlsoft bg-pearlheavy overflow-hidden">
                                            <input className="w-full py-2 px-3 rounded-md text-xs text-rootblack bg-pearlheavy" {...field} type="password" />
                                        </div>
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="pt-8 pb-4 px-4">
                            <button className="w-full py-2.5 px-4 rounded-full text-xs text-center text-white bg-linkajared">Simpan</button>
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
                    <h1 className="font-bold text-lg">Reset Password</h1>
                    <span className="text-2xs text-pearlroot">Masukan password baru kamu</span>
                </div>
                <div className="pt-8">
                    {_renderResetForm()}
                </div>
            </div>
        );
    }

    return (
        <Layout
            contentFull
            title={`Apa2Bisa - Ganti Password | LinkAja`}
            headerBack={`/auth/email-auth`}
            headerBackAs={`/auth`}
            backgroundColor={'bg-white'}>
            {_renderContent()}
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    const ctxQuery = ctx.req.query;
    const queryToken = (typeof ctxQuery.token === 'undefined' || ctxQuery.token === '') ? null : ctxQuery.token;

    return {
        props: {
            dataToken: queryToken,
        }
    }
}