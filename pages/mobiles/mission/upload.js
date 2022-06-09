import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Breadcrumb, Input, Modal, Upload, Checkbox } from 'antd'
import { CameraAlt as IconCameraAlt } from '@material-ui/icons'
import { AddCircle as IconAddCircle } from '@material-ui/icons'
import Layout from '@/components/mobiles/Layout'

import * as HelperComponents from '@/helpers/components'

export default function Transaction() {

  const PopupUploadFile = ({ onCancel, onSuccessUpload }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState('')

    function getBase64(img, callback) {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
    }

    function beforeUpload() { }

    function handleChange(info) {
      if (info.file.status === 'uploading') {
        setIsLoading(true)
        return
      }

      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, (imageUrl) => {
          setIsLoading(false)
          setImageUrl(imageUrl)
        })
      }
    }

    const renderUploadButton = () => {
      return (
        <div className="text-gray-700">
          {isLoading ? (
            'uploading...'
          ) : (
            <>
              <IconAddCircle color="inherit" fontSize="small" />
              <div style={{ marginTop: 8 }}>pilih file</div>
            </>
          )}
        </div>
      )
    }

    function handleUpload(data) {
      console.log('handleUpload', data)
      // logic untuk upload file disini
    }

    return (
      <Modal visible title="" onCancel={onCancel} footer={null}>
        <>
          <div className="flex justify-center">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
              customRequest={handleUpload}
            >
              {!!imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                renderUploadButton()
              )}
            </Upload>
          </div>
        </>
      </Modal>
    )
  }

  const [isShowModalUpload, setIsShowModalUpload] = useState(false)
  const [formData, setFormData] = useState({
    phone: '',
    reff: '',
    aggree: false,
  })
  const [errors, setErrors] = useState({})

  function handleShowUploadFile() {
    setIsShowModalUpload(true)
    console.log('handleShowUploadAvatar')
  }

  function handleSubmit() {
    console.log('handleSubmit')
  }

  return (
    <Layout
      title='Upload Bukti Transaksi'
      headerTitle={`Upload Bukti Transaksi`}
      headerBack={`/misi-harian/all`}
    >
      <div className="p-4 bg-white">
        <div className="mb-3">
          <Breadcrumb separator=">">
            <Breadcrumb.Item>Misi Harian</Breadcrumb.Item>
            <Breadcrumb.Item>Upload Bukti Transaksi</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className='mb-4'>
          <h3 className='text-gray-800 text-lg font-bold text-left'>Upload Bukti Transaksi</h3>
        </div>
        <div className="mt-4">
          <div className="mb-2">
            <label htmlFor="" className="font-bold block w-full mb-1">
              Nomor Handphone
            </label>
            <div>
              <Input
                value={formData.phone}
                onChange={(e) =>
                  setFormData((state) => ({
                    ...state,
                    phone: e.target.value,
                  }))
                }
                className="form-control"
                placeholder="ex: +6280001112222"
              />
              {errors.phone && (
                <p className="text-ruby-base text-xs p-1">{errors.phone}</p>
              )}
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="" className="font-bold block w-full mb-1">
              Nomor Referensi
            </label>
            <div>
              <Input
                value={formData.reff}
                onChange={(e) =>
                  setFormData((state) => ({
                    ...state,
                    reff: e.target.value,
                  }))
                }
                className="form-control"
                placeholder="ex: 8IM6U000"
              />
              {errors.reff && (
                <p className="text-ruby-base text-xs p-1">{errors.reff}</p>
              )}
            </div>
          </div>
          <div className='my-4'>
            <button onClick={() => { handleShowUploadFile() }} className='bg-gray-300 w-full p-3 rounded-lg flex flex-row justify-center'>
              <span className='px-2'>Upload Bukti Transaksi</span>
              <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 13H10V7H14L7 0L0 7H4V13ZM0 15H14V17H0V15Z" fill="#656D86" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="fixed flex flex-col bottom-0 left-0 right-0 bg-white items-center justify-center mx-auto border-t border-gray-150 z-30 py-2 px-3">
        <div className='py-2'>
          <Checkbox defaultChecked={false} value={formData.aggree}>
            Saya setuju dengan Syarat & Ketentuan di LinkAjA!
          </Checkbox>
        </div>
        <button
          type="button"
          className="bg-ruby-base text-white font-semibold block w-full text-center p-4 rounded-full"
          onClick={handleSubmit}
        >
          Simpan
        </button>
      </div>
      {isShowModalUpload && (
        <PopupUploadFile
          onCancel={() => setIsShowModalUpload(false)}
          onSuccessUpload={(e) => {
            console.log('onSuccessUpload', e)
          }}
        />
      )}
    </Layout>
  )
}