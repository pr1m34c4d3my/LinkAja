import { useEffect, useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import moment from 'moment'
import 'moment-timezone'
import { Formik, Form, Field } from 'formik'
import { Upload, DatePicker, message } from 'antd'
import Layout from '@/components/desktop/Layout'
import _ from 'lodash'
import DataProvinces from '@/data/provinces.json'


const apiMyDetail = async (session, url) => {
  return axios.get(url,
    {
      responseType: 'json',
      crossdomain: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`,
      }
    })
    .then((response) => {
      // console.log('apiMyDetail.response: ' + JSON.stringify(response.data.data));
      if (response.status === 200) {
        const resData = response.data.data;

        const _error = 0;
        const payload = resData;

        return { _error, payload };
      } else {
        return { _error: 1, message: response.data.message };
      }
    })
    .catch(error => {
      // console.log('apiMyDetail.error: ' + JSON.stringify(error));
      if (error.response !== undefined && error.response.data !== null) {
        return { _error: 1, message: error.message };
      } else {
        return { _error: 1, message: error.message };
      }
    });
}

export default function EditProfilePage({ dataProfile }) {

  const [profile, setProfile] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [provinces, setProvinces] = useState(null);
  const [regions, setRegions] = useState(null);

  const [selectedProvince, setSelectedProvince] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState(0);
  const [selectedBirthdate, setSelectedBirthdate] = useState(null);

  //==========================================================//
  //=================== COMPONENT - HOOKS ====================//
  //==========================================================//
  useEffect(() => {
    onInitData();
  }, []);

  //=============================================================//
  //=================== COMPONENT - LISTENER ====================//
  //=============================================================//
  const onInitData = () => {
    if (typeof dataProfile !== 'undefined' && dataProfile != null && !dataProfile._error) {
      setProfile(dataProfile.payload);
      setAvatar(dataProfile.payload.profile_picture);

      if (typeof DataProvinces !== 'undefined' && DataProvinces != null) {
        const provinceId = dataProfile.payload.province_id;
        const regionId = dataProfile.payload.region_id;
        const birthdate = dataProfile.payload.date_of_birth;

        setProvinces(DataProvinces.payload);
        setSelectedProvince(provinceId);
        __initSelectCity(DataProvinces, provinceId, regionId);
        setSelectedBirthdate(birthdate)
      } else {
        message.error(`Gagal membuka halaman`);
      }
    }
  }

  const onChangeAvatarUpload = (info) => {
    if (info.file.status === 'done') {
      if (!info.file.response._error) {
        __handleGetBase64File(info.file.originFileObj, (imageUrl) => {
          setAvatar(imageUrl);
        })

        message.success(`Anda berhasil mengganti foto profil`);
      } else if (info.file.status === 'error') {
        message.error(`Anda gagal mengganti foto profil`);
      }
    }
  }

  const onChangeProvince = (e, field) => {
    const provinceId = parseInt(e.target.value);

    field.onChange(e);
    setSelectedProvince(provinceId);
    setSelectedRegion(0);

    if (provinceId === 0) {
      setRegions(null);
    } else {
      provinces.map((item) => {
        if (item.id === provinceId) {
          setRegions(item.Regions);
        }
      });
    }
  }

  const onChangeBirthdate = (setFieldValue, date) => {
    const birthdate = moment(date).tz('Asia/Jakarta').format('YYYY-MM-DD');

    setFieldValue('date_of_birth', birthdate);
    setSelectedBirthdate(birthdate);
  }

  const onSubmitFormProfile = async (values) => {
    const apiProfileUpdate = await __apiProfileUpdate(values);

    if (!apiProfileUpdate._error) {
      message.success(`Anda berhasil merubah data profil`);
    } else {
      message.error(`Anda gagal merubah data profil`);
    }
  }


  //================================================+=============//
  //=================== COMPONENT - FUNCTIONS ====================//
  //=====================================================+========//
  const __handleGetBase64File = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const __initSelectCity = (data, provinceId, regionId) => {
    if (provinceId !== 0) {
      data.payload.map((province) => {
        if (province.id === provinceId) {
          setRegions(province.Regions);
          setSelectedRegion(regionId);
        }
      });
    }
  }

  const __apiProfileUpdate = async (data) => {
    return axios.post('/profile/update',
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
  //==========================================================//
  //=================== COMPONENT - RENDER ===================//
  //==========================================================//
  const _renderFormProfile = () => {
    const profileEmail = profile.email == null ? '' : profile.email;
    const profileFullname = profile.fullname == null ? '' : profile.fullname;
    const profilePhone = profile.phone == null ? '' : profile.phone;
    const profileAddress = profile.address == null ? '' : profile.address;

    return (
      <Formik
        initialValues={{
          fullname: profileFullname, address: profileAddress, phone: profilePhone, province_id: selectedProvince,
          region_id: selectedRegion, date_of_birth: moment(selectedBirthdate).tz('Asia/Jakarta').format('YYYY-MM-DD')
        }}
        onSubmit={onSubmitFormProfile}>
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div className="mb-2">
              <div className="flex">
                <div className='w-6/12 p-2'>
                  <div className="mb-2">
                    <label className="font-bold block w-full">Nama Lengkap</label>
                    <div className="rounded-md border border-pearlroot bg-pearlheavy">
                      <Field name="fullname">
                        {({ field, form, meta }) => (
                          <input className="w-full py-2 px-3 rounded-md text-sm text-rootblack bg-pearlheavy" {...field} type="text" />
                        )}
                      </Field>
                    </div>
                  </div>
                </div>
                <div className='w-6/12 p-2'>
                  <div className="mb-2">
                    <label className="font-bold block w-full">Email</label>
                    <div className="rounded-md border border-pearlroot bg-pearlsoft">
                      <div className="w-full py-2 px-3 rounded-md text-sm text-rootblack bg-pearlheavy">{profileEmail}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className='w-6/12 p-2'>
                  <div className='mb-2'>
                    <label className="font-bold block w-full">Provinsi</label>
                    <div className="relative rounded-md border border-pearlroot bg-pearlsoft">
                      <Field name="province_id" type="select">
                        {({ field, form, meta }) => (
                          <select
                            className="z-10 appearance-none block w-full h-full py-2 pl-2 pr-6 rounded-md text-md text-rootblack bg-pearlheavy"
                            {...field}
                            onChange={(e) => onChangeProvince(e, field)}>
                            <option value="0">{`Pilih Provinsi`}</option>
                            {provinces != null &&
                              provinces.map((item, index) => {
                                return (<option value={item.id} key={`province-${index}`}>{item.title}</option>)
                              })
                            }
                          </select>
                        )}
                      </Field>
                      <div className="absolute top-0 right-0 flex flex-col justify-center h-full mx-1">
                        <img className="block w-5 h-5" src={`/images/mobiles/ic_chevron_down.png`} alt={`LinkAja - Icon Chevron`} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='w-6/12 p-2'>
                  <div className='mb-2'>
                    <label className="font-bold block w-full">Kota/Kabupaten</label>
                    <div className="relative rounded-md border border-pearlroot bg-pearlsoft">
                      <Field name="region_id">
                        {({ field, form, meta }) => (
                          <select
                            className="appearance-none block w-full h-full py-2 pl-2 pr-6 rounded-md text-md text-rootblack bg-pearlheavy"
                            {...field}>
                            <option value="0">{`Pilih Kota/Kabupaten`}</option>
                            {regions !== null &&
                              regions.map((region, regionIndex) => {
                                return (<option value={region.id} key={`region-${regionIndex}`}>{region.title}</option>);
                              })
                            }
                          </select>
                        )}
                      </Field>
                      <div className="absolute top-0 right-0 flex flex-col justify-center h-full mx-1">
                        <img className="block w-5 h-5" src={`/images/mobiles/ic_chevron_down.png`} alt={`LinkAja - Icon Chevron`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className='w-full p-2'>
                  <label className="font-bold block w-full">Alamat</label>
                  <div className="rounded-md border border-pearlroot bg-pearlsoft">
                    <Field name="address">
                      {({ field, form, meta }) => (
                        <textarea className="block w-full h-full py-2 px-3 rounded-md text-sm text-rootblack bg-pearlheavy" {...field} />
                      )}
                    </Field>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className='w-6/12 p-2'>
                  <div className='mb-2'>
                    <label className="font-bold block w-full">Nomor Handphone</label>
                    <div className="flex items-center rounded-md border border-pearlroot bg-pearlsoft">
                      <span className="block px-2 rounded-l-md text-sm text-rootblack">+62</span>
                      <Field name="phone">
                        {({ field, form, meta }) => (
                          <input className="w-full py-2 px-3 rounded-r-md text-sm text-rootblack bg-pearlheavy" {...field} type="number" />
                        )}
                      </Field>
                    </div>
                  </div>
                </div>
                <div className='w-6/12 p-2'>
                  <div className="mb-2">
                    <label htmlFor="" className="font-bold block w-full">
                      Tanggal Lahir
                    </label>
                    <div className="flex items-center">
                      <DatePicker
                        className="w-full rounded-md border border-pearlroot py-2 px-3 "
                        defaultValue={moment(selectedBirthdate).tz('Asia/Jakarta')}
                        onChange={(date) => onChangeBirthdate(setFieldValue, date)} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex mt-4">
                <div className='w-6/12'>
                  <div className="flex">
                    <button
                      type="button"
                      className="bg-ruby-base text-white font-semibold block w-full text-center p-3 rounded-full"
                      type="submit"
                    >
                      Simpan
                    </button>
                    <button
                      type="button"
                      className="bg-white text-ruby-base font-semibold block w-full text-center rounded-full"
                      onClick={() => Router.push('/mobiles/profile', '/profile')}
                    >
                      Batal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    )
  }

  const _renderAvatarUpload = () => {
    const profileAvatar = avatar == null ? `/images/mobiles/ic-avatar-default.png` : `${avatar}`;
    const profileFullname = profile.fullname == null ? '' : profile.fullname;

    return (
      <Upload
        className="flex justify-center items-center p-4"
        showUploadList={false}
        action={`/profile/picture/update`}
        onChange={onChangeAvatarUpload}>
        <div className="relative">
          <div className="w-28 h-28 rounded-full border border-pearlsoft overflow-hidden">
            <img className="block w-full h-full object-cover object-center" src={profileAvatar} alt={profileFullname} />
          </div>
          <img className=" absolute bottom-0 right-0 w-8 h-8" src={`/images/mobiles/ic_avatar_upload.png`} alt={`LinkAja - Icon Avatar Upload`} />
        </div>
      </Upload>
    )
  }

  const _renderLayout = () => {
    return (
      <Layout
        title='Profile Edit'>
        <div className="bg-white rounded-lg p-3 xl:p-6 w-full mb-4">
          <div className='flex'>
            <div className='w-2/12'>
              {_renderAvatarUpload()}
            </div>
            <div className='w-10/12'>
              {_renderFormProfile()}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (profile != null && provinces != null) {
    return (_renderLayout());
  } else {
    return (null);
  }

}

export async function getServerSideProps(ctx) {
  const session = ctx.req.session;
  const myDetailUrl = `${process.env.NEXT_API_URL}/v1/home/my-detail`;
  const myDetail = await apiMyDetail(session, myDetailUrl);

  return {
    props: {
      dataProfile: myDetail,
    }
  }
}