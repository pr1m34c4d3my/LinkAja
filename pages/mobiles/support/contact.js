import { useState } from 'react'
import { Breadcrumb, Input } from 'antd'
import Layout from '@/components/mobiles/Layout'

export default function Contact() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  return (
    <Layout
      title='Contact'
      headerTitle={`Contact`}
      headerBack={`/profile`}
    >
      <div className="bg-white p-4 min-h-screen">
        <div className="mb-3">
          <Breadcrumb separator=">">
            <Breadcrumb.Item>Profile</Breadcrumb.Item>
            <Breadcrumb.Item>Contact</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <h3 className="font-bold">Butuh Bantuan?</h3>
        <p>Hubungi kamu melalui formulir dibawah ini</p>
        <div className="my-3">
          <div className="mb-3">
            <label htmlFor="" className="font-bold block w-full mb-1">
              Nama
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
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="" className="font-bold block w-full mb-1">
              Alamat Email
            </label>
            <div>
              <Input
                value={formData.email}
                onChange={(e) =>
                  setFormData((state) => ({
                    ...state,
                    email: e.target.value,
                  }))
                }
                className="form-control"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="" className="font-bold block w-full mb-1">
              Subject
            </label>
            <div>
              <Input
                value={formData.subject}
                onChange={(e) =>
                  setFormData((state) => ({
                    ...state,
                    subject: e.target.value,
                  }))
                }
                className="form-control"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="" className="font-bold block w-full mb-1">
              Pesan
            </label>
            <div>
              <Input.TextArea
                value={formData.message}
                onChange={(e) =>
                  setFormData((state) => ({
                    ...state,
                    message: e.target.value,
                  }))
                }
                className="form-control"
              />
            </div>
          </div>
          <div className="py-4">
            <button
              type="button"
              className="block w-full bg-ruby-base rounded-full text-gray-100 text-center py-3 hover:bg-ruby-secondary"
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}