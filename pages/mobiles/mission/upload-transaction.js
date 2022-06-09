import { useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import 'moment-timezone'
import Link from 'next/link'
import Router from 'next/router'
import { Formik, Form, Field } from 'formik'
import { Upload, DatePicker, message } from 'antd'
import Layout from "@/components/mobiles/Layout";

export default function MissonUploadTransaction({ dataId }) {

    const [dateTransaction, setDateTransaction] = useState(null)
    const [fileUrl, setFileUrl] = useState(null)
    const [agree, setAgree] = useState(false)

    //=============================================================//
    //=================== COMPONENT - LISTENER ====================//
    //=============================================================//
    const onSubmitFormBukti = async (values) => {
        const apiSubmitBukti = await __apiSubmitBukti(values);

        if (!apiSubmitBukti._error) {
            message.success(`Anda berhasil mengirim data transaksi`);
            setFileUrl(null)
            Router.replace('/mobiles/mission', '/missions')
        } else {
            message.error(`Anda gagal mengerim data transaksi`);
        }
    }

    //================================================+=============//
    //=================== COMPONENT - FUNCTIONS ====================//
    //=====================================================+========//
    const __apiSubmitBukti = async (data) => {
        return axios.post(`/missions/${dataId}/submit-bukti`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                if (res.status === 200) {
                    return res.data.payload;
                } else {
                    return { _error: true };
                }
            })
            .catch(err => {
                return { _error: true };
            });
    }

    const onChangeTrasactionDate = (setFieldValue, date) => {
        const transaction = moment(date).tz('Asia/Jakarta').format('YYYY-MM-DD');
        setFieldValue('referensi', transaction);
        setDateTransaction(transaction);
    }

    const onChangeFileUpload = (info) => {
        if (info.fileList[0].status === 'done') {
            if (!info.fileList[0].response._error) {
                setFileUrl(info.fileList[0].response.payload);
                message.success(`Anda berhasil upload file`);

            } else if (info.file.status === 'error') {
                message.error(`Anda gagal upload file`);
            }
        }
    }

    //==========================================================//
    //=================== COMPONENT - RENDER ===================//
    //==========================================================//
    const _renderFormUpload = () => {
        return (
            <Upload
                className="transaction-upload rounded-md border border-pearlroot bg-pearlsoft"
                action={`/missions/${dataId}/upload-bukti`}
                onChange={onChangeFileUpload}>
                <div className="flex justify-center items-center py-2 px-4">
                    <span className="mr-1 text-xs text-blackroot">Upload Bukti Transaksi</span>
                    <img className="w-5 h-5 object-cover object-center" src={`/images/mobiles/ic_upload.png`} alt={``} />
                </div>
            </Upload>
        )
    }

    const _renderFormSubmit = () => {
        const date = dateTransaction == null ? moment(new Date()).tz('Asia/Jakarta').format('YYYY-MM-DD') : dateTransaction
        const file_url = fileUrl == null ? '' : fileUrl
        return (
            <Formik
                initialValues={{ phone: '', referensi: date, file: file_url }}
                onSubmit={onSubmitFormBukti}>
                {({ isSubmitting, values, setFieldValue }) => (
                    <Form className="flex flex-col justify-between h-full pt-2 pb-4">
                        <div className="flex-1">
                            <div className="px-4 mb-4">
                                <label className="block mb-1 font-bold text-xs">Nomor Handphone</label>
                                <Field name="phone">
                                    {({ field, form, meta }) => (
                                        <div className="rounded-md border border-pearlsoft bg-pearlheavy overflow-hidden">
                                            <input className="w-full py-2 px-3 rounded-md text-xs text-rootblack bg-pearlheavy" {...field} type="number" placeholder="ex: +6280001112222" />
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="px-4 mb-8">
                                <label className="block mb-1 font-bold text-xs">Tanggal transaksi</label>
                                {/* <Field name="referensi">
                                    {({ field, form, meta }) => (
                                        <div className="rounded-md border border-pearlsoft bg-pearlheavy overflow-hidden">
                                            <input className="w-full py-2 px-3 rounded-md text-xs text-rootblack bg-pearlheavy" {...field} type="number" placeholder="ex: +6280001112222" />
                                        </div>
                                    )}
                                </Field> */}
                                <DatePicker
                                    className="w-full rounded-md border border-pearlroot"
                                    defaultValue={moment(new Date()).tz('Asia/Jakarta')}
                                    onChange={(date) => onChangeTrasactionDate(setFieldValue, date)} />
                            </div>
                            <div className="w-full px-4">
                                {_renderFormUpload()}
                            </div>

                        </div>
                        <div className="">
                            <div className="px-4 mb-4">
                                <Field name="aggreement">
                                    {({ field, form, meta }) => (
                                        <div className="flex">
                                            <input className="mt-0.5 mr-2" type="checkbox" {...field} onChange={(event) => setAgree(event.target.checked)} />
                                            <div className="text-xs">
                                                Saya setuju dengan Syarat &amp; Ketentuan di LinkAjA!
                                            </div>
                                        </div>
                                    )}
                                </Field>
                                <Field name="file">
                                    {({ field, form, meta }) => (
                                        <input className="hidden" type="hidden" {...field} />
                                    )}
                                </Field>
                            </div>
                            <div className="px-4">
                                <button
                                    className={`w-full py-2 px-4 rounded-full text-xs text-center ${agree ? 'text-white bg-linkajared' : 'text-gray-600 bg-gray-200'}`}
                                    onClick={() => { setFieldValue('file', file_url) }}
                                    type="submit" disabled={!agree}>Kirim</button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        );
    }

    const _renderContent = () => {
        return (
            <div className="flex flex-col h-full bg-white">
                <h1 className="flex-initial py-4 px-4 font-extrabold text-sm text-linkajablack">Upload Bukti Transaksi</h1>
                <div className="flex-1">
                    {_renderFormSubmit()}
                </div>
            </div>
        );
    }

    const _renderBreadcrumb = () => { }

    return (
        <Layout
            contentFull
            title={`ApaBisa - Misi Transaksi Upload Bukti | LinkAja`}
            headerBack={`/mission`}
            headerBackAs={`/missions`}
            backgroundColor={'bg-pearlsoft'}>
            {_renderContent()}
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    const ctxQuery = ctx.req.query;
    const queryId = ctxQuery.id;

    return {
        props: {
            dataId: queryId,
        }
    }
}