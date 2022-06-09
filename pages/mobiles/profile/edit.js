import { useEffect, useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import moment from 'moment'
import 'moment-timezone'
import DataProvinces from '@/data/provinces.json'

import { Formik, Form, Field } from 'formik'
import { Upload, DatePicker, message } from 'antd'
import Layout from '@/components/mobiles/Layout'
import _ from 'lodash'


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

export default function ProfileEdit({
    dataProfile
}) {
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
            }
        } else {
            message.error(`Gagal membuka halaman`);
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
        console.log(`__formProfile: ${JSON.stringify(values)}`)
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
        const profileFullname = profile.fullname == null ? '' : profile.fullname;
        const profilePhone = profile.phone == null ? '' : profile.phone;
        const profileAddress = profile.address == null ? '' : profile.address;
        const profileDob = profile.date_of_birth == null ? moment(new Date()).tz('Asia/Jakarta').format('YYYY-MM-DD') : profile.date_of_birth;

        return (
            <div className="py-2 border border-b-0 border-l-0 border-r-0 border-pearlsoft bg-white">
                <Formik
                    initialValues={{
                        fullname: profileFullname, address: profileAddress, phone: profilePhone, province_id: selectedProvince,
                        region_id: selectedRegion, date_of_birth: profileDob
                    }}
                    onSubmit={onSubmitFormProfile}>
                    {({ isSubmitting, values, setFieldValue }) => (
                        <Form>
                            <div className="py-2 px-4">
                                <label className="block mb-1 font-bold text-xs text-blackbase">Nama Lengkap</label>
                                <div className="rounded-md border border-pearlroot bg-pearlheavy">
                                    <Field name="fullname">
                                        {({ field, form, meta }) => (
                                            <input className="w-full py-2 px-3 rounded-md text-xs text-rootblack bg-pearlheavy" {...field} type="text" />
                                        )}
                                    </Field>
                                </div>
                            </div>
                            <div className="py-2 px-4">
                                <label className="block mb-1 font-bold text-xs text-blackbase">Alamat</label>
                                <div className="rounded-md border border-pearlroot bg-pearlsoft">
                                    <Field name="address">
                                        {({ field, form, meta }) => (
                                            <textarea className="block w-full h-full py-2 px-3 rounded-md text-xs text-rootblack bg-pearlheavy" {...field} />
                                        )}
                                    </Field>
                                </div>
                            </div>
                            <div className="py-2 px-4">
                                <label className="block mb-1 font-bold text-xs text-blackbase">Provinsi</label>
                                <div className="relative rounded-md border border-pearlroot bg-pearlsoft">
                                    <Field name="province_id" type="select">
                                        {({ field, form, meta }) => (
                                            <select
                                                className="z-10 appearance-none block w-full h-full py-2 pl-2 pr-6 rounded-md text-xs text-rootblack bg-pearlheavy"
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
                            <div className="py-2 px-4">
                                <label className="block mb-1 font-bold text-xs text-blackbase">Kota/Kabupaten</label>
                                <div className="relative rounded-md border border-pearlroot bg-pearlsoft">
                                    <Field name="region_id">
                                        {({ field, form, meta }) => (
                                            <select
                                                className="appearance-none block w-full h-full py-2 pl-2 pr-6 rounded-md text-xs text-rootblack bg-pearlheavy"
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
                            <div className="py-2 px-4">
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
                            <div className="py-2 px-4">
                                <label className="block mb-1 font-bold text-xs text-blackbase">Tanggal Lahir</label>
                                <div className="flex items-center">
                                    <DatePicker
                                        className="w-full rounded-md border border-pearlroot"
                                        defaultValue={moment(selectedBirthdate).tz('Asia/Jakarta')}
                                        onChange={(date) => onChangeBirthdate(setFieldValue, date)} />

                                </div>
                            </div>
                            <div className="w-full px-4 mt-5 mb-5">
                                <button className="w-full py-2 px-4 rounded-3xl text-center text-white bg-linkajared" type="submit">Simpan</button>
                            </div>
                            <div className="flex justify-center items-center mb-5">
                                <a className="py-2 px-4 text-center text-linkajared" onClick={() => Router.push('/mobiles/profile', '/profile')}>Batal</a>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }

    const _renderAvatarUpload = () => {
        const profileAvatar = avatar == null ? `/images/mobiles/ic-avatar-default.png` : `${avatar}`;
        const profileFullname = profile.fullname == null ? '' : profile.fullname;

        return (
            <Upload
                className="flex justify-center items-center p-4"
                showUploadList={false}
                action={`/profile/picture/update`}
                accept="image/*"
                onChange={onChangeAvatarUpload}>
                <div className="relative">
                    <div className="w-20 h-20 rounded-full border border-pearlsoft overflow-hidden">
                        <img className="block w-full h-full object-cover object-center" src={profileAvatar} alt={profileFullname} />
                    </div>
                    <img className=" absolute bottom-0 right-0 w-8 h-8" src={`/images/mobiles/ic_avatar_upload.png`} alt={`LinkAja - Icon Avatar Upload`} />
                </div>
            </Upload>
        );
    }

    const _renderHeader = () => {
        const profileLinkAjaId = profile.linkaja_id == null ? 'Belum Terhubung' : profile.linkaja_id;
        const profileEmail = profile.email == null ? '' : profile.email;

        return (
            <div className="w-full py-2 mb-4 border border-t-0 border-l-0 border-r-0 border-pearlsoft bg-white">
                {_renderAvatarUpload()}
                <div className="">
                    <div className="py-2 px-4">
                        <label className="block mb-1 font-bold text-xs text-blackbase">LinkAja ID</label>
                        {profileLinkAjaId === 'Belum Terhubung' && <span className="block font-bold text-xs text-linkajared">{profileLinkAjaId}</span>}
                        {profileLinkAjaId !== 'Belum Terhubung' && <span className="block font-bold text-xs text-rootblack">{profileLinkAjaId}</span>}
                    </div>
                    <div className="py-2 px-4">
                        <label className="block mb-1 font-bold text-xs text-blackbase">Email</label>
                        <span className="block font-bold text-xs text-rootblack">{profileEmail}</span>
                    </div>
                </div>
            </div>
        );
    }

    const _renderLayout = () => {
        return (
            <Layout
                title='Profile Edit'
                headerTitle={`Edit Profile`}
                headerBack={`/profile`}
                backgroundColor={`bg-pearlsoft`}>
                {_renderHeader()}
                {_renderFormProfile()}
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

    console.log(`myDetail: ${JSON.stringify(myDetail)}`)

    return {
        props: {
            dataProfile: myDetail,
        }
    }
}