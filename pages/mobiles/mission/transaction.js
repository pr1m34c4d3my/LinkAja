import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Breadcrumb, Input, Modal, Upload } from 'antd'
import Layout from '@/components/mobiles/Layout'

import * as HelperComponents from '@/helpers/components'

export default function Transaction() {

  const PopupUploadAvatar = ({ onCancel, onSuccessUpload }) => {
    const [isLoading, setIsLoading] = useState(false)
  }

  const [isShowModalUpload, setIsShowModalUpload] = useState(false)
  const [formData, setFormData] = useState({
    phone: '',
    reff: '',
    aggree: '',
  })
  const [errors, setErrors] = useState({})

  function handleShowUploadFile() {
    setIsShowModalUploadAvatar(true)
    console.log('handleShowUploadAvatar')
  }

  function handleSubmit() {
    console.log('handleSubmit')
  }

  return (
    <Layout
      title='Upload bukti transaksi'
      headerTitle={`Upload bukti transaksi`}
      headerBack={`/misi-harian/all`}
    >
      <div className="p-4 bg-white">
        <div className="mb-3">
          <Breadcrumb separator=">">
            <Breadcrumb.Item>Misi Harian</Breadcrumb.Item>
            <Breadcrumb.Item>Upload Bukti Transaksi</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="mt-4">
          <div className="mb-2">
            <label htmlFor="" className="font-bold block w-full mb-1">
              Nama Lengkap
            </label>
            <div>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData((state) => ({
                    ...state,
                    name: e.target.value,
                  }))
                }
                className="form-control"
              />
              {errors.name && (
                <p className="text-ruby-base text-xs p-1">{errors.name}</p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="bg-ruby-base text-white font-semibold block w-full text-center p-4 rounded-full"
              onClick={handleSubmit}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>

    </Layout>
  )
}