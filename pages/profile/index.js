import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { ChevronRight as IconChevronRight } from '@material-ui/icons'
import Layout from '@/components/desktop/Layout'
import CardProfile from '@/components/desktop/profile/CardProfile'
import LinkProfile from '@/components/desktop/profile/LinkProfile'
import { Modal } from 'antd'
import {
  KeyboardArrowUp as IconKeyboardArrowUp,
  KeyboardArrowDown as IconKeyboardArrowDown,
} from '@material-ui/icons'
import { static_faqs } from '@/constant/index'
import Skeleton from 'react-loading-skeleton'

export default function Profile({ deepLink }) {

  const [myDetail, setMyDetail] = useState(null);
  const [faqs, setFaqs] = useState(null)
  const [tocs, setTocs] = useState(null)


  const [isShowModalFaq, setIsShowModalFaq] = useState(false)
  const [isShowModalToc, setIsShowModalToc] = useState(false)

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
    Promise.all([
      apiMyDetail(),
      apiSupportFAQ(),
      apiSupportTOC(),
    ])
      .then(([
        myDetail,
        faqs,
        tocs,
      ]) => {
        if (!myDetail._error) setMyDetail(myDetail);
        if (!faqs._error) setFaqs(faqs);
        if (!tocs._error) setTocs(tocs);
      })
      .catch(err => {
        setMyDetail(null);
        setFaqs(null)
        setTocs(null)
      });
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

  const apiSupportFAQ = async () => {
    return axios.post('/support/faqs',
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

  const apiSupportTOC = async () => {
    return axios.post('/support/syarat-ketentuan',
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

  const links = [
    {
      title: 'Hubungkan dengan LinkAja',
      path: deepLink,
      as: deepLink
    }, {
      title: 'Syarat dan Ketentuan',
      path: '/mobiles/profile/toc',
      as: 'toc'
    }, {
      title: 'FAQ',
      path: '/mobiles/profile/faq',
      as: 'faq'
    }, {
      title: 'Contact Support',
      path: '/mobiles/profile/contact',
      as: 'contact'
    }
  ]

  const PopupFAQ = ({ onCancel }) => {

    const [selectedIndex, setSelectedIndex] = useState([])

    const onClickItemFAQ = (index) => {
      if (selectedIndex.includes(index)) {
        setSelectedIndex([...selectedIndex].filter((item) => item !== index))
      } else {
        setSelectedIndex([...selectedIndex, index])
      }
    }

    function toggleItem(index) {
      console.log('toggleItem', index)
      if (selectedIndex.includes(index)) {
        setSelectedIndex([...selectedIndex].filter((item) => item !== index))
      } else {
        setSelectedIndex([...selectedIndex, index])
      }
    }

    return (
      <Modal visible centered title="FAQ" onCancel={onCancel} footer={null}>
        <>
          <div className="flex p-2">
            <div className="mb-3">
              <div className="">
                {static_faqs.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="mb-2 rounded-lg border border-gray-300 p-3 flex items-center cursor-pointer"
                      onClick={() => toggleItem(index)}
                    >
                      <div className='flex justify-between'>
                        <div className="w-full text-left">
                          <div className="font-bold mb-4">{item.q}</div>
                          <div
                            className={`${selectedIndex.includes(index)
                              ? 'h-full block'
                              : 'h-0 hidden'
                              }`}
                          >
                            {item.a}
                          </div>
                        </div>
                        <div>
                          {selectedIndex.includes(index) ? <IconKeyboardArrowUp fontSize="small" /> : <IconKeyboardArrowDown fontSize="small" />}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      </Modal>
    )
  }

  const PopupTOC = ({ onCancel }) => {
    return (
      <Modal visible centered title="Syarat dan Ketentuan" onCancel={onCancel} footer={null}>
        <>
          <div className="flex">
            <div className="mb-3">
              {/* {tocs.length > 0 && tocs.map((item, index) => {
                return (
                  <div className="mb-8" key={index}>
                    <h1 className="mb-3 font-bold text-xl">{item.title}</h1>
                    <p className='text-md'>{item.description}</p>
                  </div>
                )
              })} */}
              <div className="p-5">
                <h3 className="font-bold">Syarat dan Ketentuan APA2BISA</h3>
                <ol className='p-4 text-justify' style={{ listStyleType: "upper-number" }}>
                  <li>Dengan ini, pengguna menyatakan, menjamin penggunaan <Link href='https://apa2bisa.linkaja.id'><a className='text-ruby-base'>www.apa2bisa.linkaja.id</a></Link> dan hanya akan digunakan sesuai yang telah ditentukan dalam Syarat dan Ketentuan Layanan LinkAja ini, serta untuk tujuan yang sah dan tidak melanggar ketentuan hukum yang berlaku di Negara Republik Indonesia.</li>
                  <li>Pengguna dianggap telah memahami segala risiko yang mungkin timbul atas penggunaan LinkAja. Atas hal tersebut, Kami kembali ingatkan kepada pengguna untuk memperhatikan hal-hal sebagai berikut:
                    <ul className='pl-4 text-justify' style={{ listStyleType: "lower-alpha" }}>
                      <li>Kami tidak pernah meminta detail akses terhadap Akun LinkAja, seperti kode verifikasi dalam bentuk OTP dan detail akses lainnya yang hanya diketahui oleh pengguna, atas alasan apapun kecuali terkait dengan dan untuk memenuhi permintaan langsung dari pengguna seperti untuk sebatas keperluan yang dibutuhkan dalam hal recovery Akun LinkAja.</li>
                      <li>Kami tidak akan pernah menghubungi pengguna untuk meminta informasi detail akses maupun informasi pribadi lainnya yang dapat digunakan untuk memperoleh hak akses akun Pengguna, sehingga Kami menghimbau untuk tidak menanggapi pihak yang mengatasnamakan LinkAja yang meminta hal tersebut dan senantiasa menjaga kerahasiaan informasi pribadi.</li>
                      <li>Kami mengimbau pengguna hanya untuk menghubungi layanan informasi resmi yang tertera dalam Syarat dan Ketentuan Layanan LinkAja atau rekanan yang ditunjuk resmi untuk menghubungi pengguna dan tidak menanggapi setiap pihak yang mengaku sebagai perwakilan resmi dari Finarya yang menghubungi di luar dari layanan informasi resmi tersebut. </li>
                    </ul>
                  </li>
                  <li>Pengguna sepenuhnya bertanggungjawab atas kerahasiaan OTP yang diberikan kepada layanan LinkAja dan membebaskan Finarya dari segala kelalaian, kesalahan, dan/atau tindakan yang menyebabkan kebocoran atas kerahasiaan OTP yang pengguna terima, serta menyebabkan kerugian dalam bentuk apapun.</li>
                  <li>Perlu Kami informasikan bahwa setiap informasi mengenai promo, hadiah, atau undian disampaikan melalui aplikasi LinkAja, media sosial resmi LinkAja, website resmi LinkAja. - <Link href='https://linkaja.id'><a>www.linkaja.id</a></Link>, (<Link href='https://apa2bisa.linkaja.id'><a className='text-ruby-base'>www.apa2bisa.linkaja.id</a></Link>), dan/atau layanan pelanggan LinkAja. Kami tidak pernah meminta untuk melakukan transfer uang ke rekening manapun dengan menjanjikan adanya promo, hadiah, atau undian.</li>
                  <li>Dalam menggunakan layanan <Link href='https://apa2bisa.linkaja.id'><a className='text-ruby-base'>www.apa2bisa.linkaja.id</a></Link>, pengguna menyadari bahwa atas penggunaan fitur yang ada pada layanan LinkAja, maka pengguna turut terikat dengan Syarat dan Ketentuan masing-masing fitur yang digunakan.</li>
                  <li>Dengan ini, pengguna dianggap telah memahami bahwa apabila terdapat ketentuan dalam ketentuan Fitur tersebut yang bertentangan secara langsung dengan ketentuan yang tertuang pada Syarat dan Ketentuan Layanan LinkAja, maka ketentuan yang berlaku atas penggunaan fitur/layanan khusus tersebut adalah Syarat dan Ketentuan Fitur yang bersangkutan dan Syarat dan Ketentuan Layanan LinkAja ini akan tetap berlaku kepada pengguna terhadap hal-hal yang tidak diatur dalam Fitur. Pengguna diimbau untuk membaca dengan seksama Syarat dan Ketentuan Fitur yang bersangkutan. </li>
                  <li>Pengguna setuju bahwa <Link href='https://apa2bisa.linkaja.id'><a className='text-ruby-base'>www.apa2bisa.linkaja.id</a></Link> dapat memperoleh, mengumpulkan, mengirimkan, menyimpan, menganalisis, dan/atau mengolah informasi sehubungan dengan informasi pengguna sesuai keberlakuan pada Kebijakan Privasi yang ada pada Finarya, baik yang diberikan sendiri oleh pengguna, diperoleh dari pihak ketiga atau rekanan resmi LinkAja, dan/atau timbul akibat penggunaan LinkAja.</li>
                  <li>Pengguna wajib tunduk pada ketentuan-ketentuan dan peraturan-peraturan yang berlaku, serta syarat-syarat dan ketentuan-ketentuan yang mengatur semua jasa fasilitas dan fitur yang ada pada <Link href='https://apa2bisa.linkaja.id'><a className='text-ruby-base'>www.apa2bisa.linkaja.id</a></Link>.</li>
                  <li>Syarat dan Ketentuan <Link href='https://apa2bisa.linkaja.id'><a className='text-ruby-base'>www.apa2bisa.linkaja.id</a></Link> ini berlaku hingga adanya perubahan atas isi Syarat dan Ketentuan ini yang akan diumumkan kepada Pengguna.</li>
                  <li>Terkait penukaran hadiah yang ada, pihak LinkAja melalui layanan pelanggan dan/atau pihak ketiga yang ditunjuk akan mengkonfirmasi ke pelanggan. Dengan sebelumnya, menginformasikan bahwa kontak terkait adalah resmi melalui media sosial resmi LinkAja atau website resmi kami www.linkaja.id dan microsite <Link href='https://apa2bisa.linkaja.id'><a className='text-ruby-base'>www.apa2bisa.linkaja.id</a></Link>.</li>
                </ol>
              </div>
            </div>
          </div>
        </>
      </Modal>
    )
  }

  const handleClick = (e, item) => {
    e.preventDefault()

    if (item === 'toc') {
      setIsShowModalToc(true)
    } else if (item === 'faq') {
      setIsShowModalFaq(true)
    } else {
      //
    }
  }

  return (
    <Layout title='Profile'>
      {myDetail ? <CardProfile profile={myDetail} /> : <div className='mb-4'><Skeleton height={50} /></div>}

      <div className="mb-3">
        <div className='bg-white rounded-md px-4'>
          {links.map((item, index) => {
            return (
              <a
                key={index}
                className="block no-underline hover:text-inherit hover:no-underline"
                onClick={(e) => { handleClick(e, item.as) }}
              >
                <div className='bg-white border-b border-gray-200 flex py-3 mb-2'>
                  <div className="w-7/12">
                    <div className="font-bold text-sm">{item.title}</div>
                  </div>
                  <div className="w-4/12">
                    {myDetail != null && index == 0 &&
                      <div className="text-md text-right">{myDetail.linkaja_id ?
                        <span className='bg-green-100 text-green-500 p-1 rounded-lg'>Sudah Terhubung</span> : <span className='bg-red-100 text-red-500 p-1 rounded-lg'>Belum Terhubung</span>
                      }
                      </div>
                    }
                  </div>
                  <div className="w-1/12 flex justify-end text-ruby-base">
                    <IconChevronRight color="inherit" />
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
      {isShowModalFaq && (
        <PopupFAQ
          onCancel={() => setIsShowModalFaq(false)}
        />
      )}
      {isShowModalToc && (
        <PopupTOC
          onCancel={() => setIsShowModalToc(false)}
        />
      )}
    </Layout>
  )
}


export async function getServerSideProps(context) {
  const deepLink = `${process.env.LINKAJA_DEEPLINK}`;

  return {
    props: {
      deepLink: deepLink
    }
  }
}