import { useState, useEffect } from 'react'
import axios from 'axios'
import Router from 'next/router'
import { Formik, Form, Field } from 'formik'
import { Upload, Spin, message, Modal } from 'antd'
import Layout from '@/components/mobiles/Layout'

export default function FormRedeem({ dataId }) {

  const [myDetail, setMyDetail] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  //==========================================================//
  //=================== COMPONENT - HOOKS ====================//
  //==========================================================//
  useEffect(() => {
    onInitData();
  }, [])

  //=============================================================//
  //=================== COMPONENT - LISTENER ====================//
  //=============================================================//
  const onInitData = () => {
    Promise.all([
      apiMyDetail(),
    ])
      .then(([
        myDetail,
      ]) => {
        if (!myDetail._error) setMyDetail(myDetail);
      })
      .catch(err => {
        setMyDetail(null);
      });
  }

  const onSubmitFormRedeem = async (values) => {
    const apiSubmitRedeem = await __apiSubmitRedeem(values);
    const name = values.name;
    const phone = values.phone;
    const address = values.address;
    const ktp = values.ktp;

    if (name === null || name === '') {
      message.error(`Name tidak boleh kosong`);
      setIsSubmitLoading(false);
    } else if (phone === null || phone === '') {
      message.error(`Nomor handphone tidak boleh kosong`);
      setIsSubmitLoading(false);
    } else if (address === null || address === '') {
      message.error(`Alamat tidak boleh kosong`);
      setIsSubmitLoading(false);
    } else if (ktp === null || ktp === '') {
      message.error(`KTP tidak boleh kosong`);
      setIsSubmitLoading(false);
    } else {
      if (!apiSubmitRedeem._error) {
        message.success(`Anda berhasil mengirim data redeem, silakan periksa email anda`);
        setIsShowModal(true);
        setFileUrl(null);
        setIsSubmitLoading(false);
      } else {
        message.error(apiSubmitRedeem.data.error);
        setIsSubmitLoading(false);
      }
    }
  }

  //=============================================================//
  //=================== COMPONENT - FUNCTION ====================//
  //=============================================================//
  const apiMyDetail = async () => {
    return axios.post('/dashboard/my-detail',
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        if (res.status === 200) {
          return res.data.payload;
        } else {
          return null;
        }
      })
      .catch(err => {
        return null;
      });
  }

  const __apiSubmitRedeem = async (data) => {
    setIsSubmitLoading(true);

    return axios.post(`/redeem/${dataId}/redeem`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          return res.data.payload;
        } else {
          return { _error: true };
        }
      })
      .catch(err => {
        return err.response.data;
      });
  }

  const onChangeFileUpload = (info) => {
    if (info) {
      if (info.fileList.length > 0) {
        if (info.fileList[0].status === 'done') {
          if (!info.fileList[0].response._error) {
            setFileUrl(info.fileList[0].response.payload);
            message.success(`Anda berhasil upload file`);
          } else if (info.file.status === 'error') {
            message.error(`Anda gagal upload file`);
          }
        }
      }
    }
  }

  //==========================================================//
  //=================== COMPONENT - RENDER ===================//
  //==========================================================//
  const PopupSuccess = ({ onCancel }) => {

    const handleCloseModal = () => {
      Router.replace(`/mobiles/dashboard`, `/dashboard`);
    }

    return (
      <Modal visible title="" centered footer={null}>
        <>
          <div id="redeemSuccess" className="p-2 max-w-sm mx-auto bg-white flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0.333008C5.56004 0.333008 0.333374 5.55967 0.333374 11.9997C0.333374 18.4397 5.56004 23.6663 12 23.6663C18.44 23.6663 23.6667 18.4397 23.6667 11.9997C23.6667 5.55967 18.44 0.333008 12 0.333008ZM9.66671 17.833L3.83337 11.9997L5.47837 10.3547L9.66671 14.5313L18.5217 5.67634L20.1667 7.33301L9.66671 17.833Z" fill="#50BF3B" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className='text-xl font-medium text-black'>Point berhasil ditukar</h3>
              <p className='text-gray-500'>Bukti penukaran point telah dikirim kan ke email anda</p>
            </div>
          </div>
          <div className='p-2'>
            <button onClick={() => handleCloseModal()} className='w-full inline-flex justify-center rounded-full border border-ruby-base shadow-sm px-4 py-2 bg-white text-base font-medium text-ruby-base hover:bg-ruby-base hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ruby-base'>Tutup</button>
          </div>
        </>
      </Modal>
    )
  }

  const _renderFormUpload = () => {
    return (
      <div>
        <Upload
          className="transaction-upload rounded-md border border-pearlroot bg-pearlsoft"
          action={`/redeem/${dataId}/upload-ktp`}
          accept="image/*"
          onChange={onChangeFileUpload}>
          <div className="flex justify-center items-center py-2 px-4">
            <span className="mr-1 text-xs text-blackroot">UPLOAD KTP</span>
            <img className="w-5 h-5 object-cover object-center" src={`/images/mobiles/ic_upload.png`} alt={``} />
          </div>
        </Upload>
        <span className='text-left text-sm'>max. 5Mb</span>
      </div>

    )
  }

  const _renderFormRedeem = () => {
    const fullname = myDetail != null ? myDetail.fullname : '';
    const phone = myDetail != null ? myDetail.phone : '';
    const address = myDetail != null ? myDetail.address : '';
    const file_url = fileUrl == null ? '' : fileUrl

    return (
      <Formik
        initialValues={{ fullname: fullname, phone: phone, address: address, ktp: file_url }}
        enableReinitialize={true}
        onSubmit={onSubmitFormRedeem}>
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="flex flex-col justify-between h-full pt-2 pb-4">
            <div className="flex-1">
              <div className="px-4 mb-4">
                <label className="block mb-1 font-bold text-xs">Nama Lengkap</label>
                <Field name="fullname">
                  {({ field, form, meta }) => (
                    <div className="rounded-md border border-pearlsoft bg-pearlheavy overflow-hidden">
                      <input className="w-full py-2 px-3 rounded-md text-xs text-rootblack bg-pearlheavy" {...field} type="text" />
                    </div>
                  )}
                </Field>
              </div>
              <div className="px-4 mb-4">
                <label className="block mb-1 font-bold text-xs text-blackbase">Nomor Handphone</label>
                <div className="flex items-center rounded-md border border-pearlroot bg-pearlsoft">
                  <span className="block px-2 rounded-l-md text-xs text-rootblack">+62</span>
                  <Field name="phone">
                    {({ field, form, meta }) => (
                      <input className="w-full py-2 px-3 rounded-r-md text-xs text-rootblack bg-pearlheavy" {...field} type="number" />
                    )}
                  </Field>
                </div>
              </div>
              <div className="px-4 mb-4">
                <label className="block mb-1 font-bold text-xs">Alamat lengkap</label>
                <Field name="address">
                  {({ field, form, meta }) => (
                    <div className="rounded-md border border-pearlsoft bg-pearlheavy overflow-hidden">
                      <textarea className="w-full py-2 px-3 rounded-md text-xs text-rootblack bg-pearlheavy" {...field}></textarea>
                    </div>
                  )}
                </Field>
              </div>
              <div className="w-full px-4">
                {_renderFormUpload()}
              </div>
            </div>
            <div className="">
              <div className="px-4 mb-4">
                <Field name="ktp">
                  {({ field, form, meta }) => (
                    <input className="hidden" type="hidden" {...field} />
                  )}
                </Field>
              </div>
              <div className="px-4">
                {!isSubmitLoading && <button
                  className={`block w-full rounded-full text-center py-3 bg-ruby-base text-white text-md`}
                  type="submit">Kirim</button>}
                {isSubmitLoading && <div className="flex justify-center items-center"><Spin size="default" /></div>}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    )
  }

  const _renderContent = () => {
    return (
      <div className="flex flex-col h-full bg-white">
        <h1 className="flex-initial py-4 px-4 font-extrabold text-sm text-linkajablack">Masukan data lengkap untuk penukaran poin</h1>
        <div className="flex-1">
          {_renderFormRedeem()}
        </div>
        {isShowModal && (
          <PopupSuccess
            onCancel={() => setIsShowModal(false)}
          />
        )}
      </div>
    )
  }



  return (
    <Layout
      contentFull
      title={`ApaBisa - Redeem | LinkAja`}
      headerBack={`/hadiah`}
      headerBackAs={`/hadiah`}
      backgroundColor={'bg-pearlsoft'}>
      {_renderContent()}
    </Layout>
  )
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