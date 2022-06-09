import { useState, useEffect } from 'react'
import Router from 'next/router'
import axios from 'axios'
import { Breadcrumb, Modal } from 'antd'
import { numberWithCommas } from '@/helpers/index'
import { message } from 'antd'
import Layout from "@/components/mobiles/Layout"

const apiRedeems = async (session, url) => {
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
      if (error.response !== undefined && error.response.data !== null) {
        return { _error: 1, message: error.message };
      } else {
        return { _error: 1, message: error.message };
      }
    });
}

export default function Detail({
  dataParamId,
  dataRedeem,
}) {

  const [myDetail, setMyDetail] = useState(null);
  const [paramId, setParamId] = useState(null);
  const [redeemInfo, setRedeemInfo] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);

  //==========================================================//
  //=================== COMPONENT - HOOKS ====================//
  //==========================================================//
  useEffect(() => {
    onInitData();
  }, [paramId, redeemInfo])

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

    if (typeof dataParamId !== 'undefined' && dataParamId != null) {
      setParamId(dataParamId);
    }

    if (typeof dataRedeem !== 'undefined' && dataRedeem != null && !dataRedeem._error) {
      handleRedeemInfo(dataRedeem.payload);
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


  const handleRedeemInfo = (redeems) => {
    let info = null;

    redeems.map((item) => {
      if (item.id == dataParamId) {
        info = item;
      }
    });

    setRedeemInfo(info);
  }

  const PopupSuccess = ({ onCancel }) => {
    return (
      <Modal visible title="" centered footer={null}>
        <>
          <div className="p-2 max-w-sm mx-auto bg-white flex items-center space-x-4">
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
            <button onClick={() => onCancel()} className='w-full inline-flex justify-center rounded-full border border-ruby-base shadow-sm px-4 py-2 bg-white text-base font-medium text-ruby-base hover:bg-ruby-base hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ruby-base'>Tutup</button>
          </div>
        </>
      </Modal>
    )
  }

  const onSubmitRedeem = async () => {
    Router.replace(`/mobiles/hadiah/form-redeem?id=${dataParamId}`, `/hadiah/form-redeem?id=${dataParamId}`)
    // const apiSubmitRedeem = await __apiSubmitRedeem();
    // if (!apiSubmitRedeem._error) {
    //   message.success(`Point anda cukup, silakan isi formulir`);
    // } else {
    //   message.error(apiSubmitRedeem._err);
    // }
  }

  return (
    <Layout
      title={redeemInfo ? redeemInfo.title : ''}
      headerTitle={redeemInfo ? redeemInfo.title : ''}
      headerBack={`/hadiah`}
    >
      <div className="bg-white p-4 min-h-screen">
        <div className="mb-3">
          <Breadcrumb separator=">">
            <Breadcrumb.Item><span className='text-ruby-base'>Hadiah</span></Breadcrumb.Item>
            <Breadcrumb.Item>{redeemInfo ? redeemInfo.title : ''}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="my-3">
          <h3 className="font-bold text-base mb-3">
            {redeemInfo ? redeemInfo.title : ''}
          </h3>
          <div className="mb-5 border border-gray-200 border-solid rounded-lg overflow-hidden">
            <img
              src={redeemInfo ? redeemInfo.picture : ''}
              alt={redeemInfo ? redeemInfo.title : ''}
              className="object-contain h-48 w-full "
            />
          </div>
          <div className="article">
            <h3 className="font-bold">Tukarkan point {redeemInfo ? numberWithCommas(redeemInfo.point) : ''} anda dengan {redeemInfo ? redeemInfo.title : ''}</h3>
            <div className='text-justify'>
              <h3 className='font-bold text-md pt-3'>Syarat dan Ketentuan</h3>
              <ol className='px-4 pt-1 text-justify' style={{ listStyleType: "upper-number" }}>
                <li>Pastikan alamat yang Anda cantumkan di profile sudah benar</li>
                <li>Hadiah akan dikirimkan ke alamat yang tercantum di profile</li>
                <li>Point yang sudah diredeem tidak dapat di ubah ke nominal uang</li>
                <li>Pengguna tidak dapat menukarkan poin untuk jenis hadiah yang sebelumnya sudah pernah di redeem oleh Pengguna tersebut</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="py-4">
          {myDetail != null && redeemInfo != null &&
            <button
              onClick={() => { onSubmitRedeem() }}
              type="button"
              className={`${myDetail.point >= redeemInfo.point ? 'bg-ruby-base text-white' : 'bg-gray-200 text-gray-500'} block w-full rounded-full text-center py-3`}
              disabled={myDetail.point >= redeemInfo.point ? '' : 'true'}
            >
              {myDetail.point >= redeemInfo.point ? `Tukar ${numberWithCommas(redeemInfo.point)} Poin` : 'Poin anda belum cukup'}
            </button>
          }
        </div>
      </div>
      {isShowModal && (
        <PopupSuccess
          onCancel={() => setIsShowModal(false)}
        />
      )}
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const params = context.params;
  const paramId = params.id;
  const session = context.req.session;
  const myRedeemUrl = `${process.env.NEXT_API_URL}/v1/redeem`;
  const myRedeem = await apiRedeems(session, myRedeemUrl);

  return {
    props: {
      dataParamId: paramId,
      dataRedeem: myRedeem,
    }
  }
}