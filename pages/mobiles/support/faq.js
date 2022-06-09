import { useState, useEffect } from 'react'
import axios from 'axios'
import { static_faqs } from '@/constant/index'
import { Breadcrumb } from 'antd'
import {
    KeyboardArrowUp as IconKeyboardArrowUp,
    KeyboardArrowDown as IconKeyboardArrowDown,
} from '@material-ui/icons'
import Layout from '@/components/mobiles/Layout'


const apiSupportFAQ = async (session, url) => {
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
            // console.log('apiSupportFAQ.response: ' + JSON.stringify(response.data.data));
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
            // console.log('apiSupportFAQ.error: ' + JSON.stringify(error));
            if (error.response !== undefined && error.response.data !== null) {
                return { _error: 1, message: error.message };
            } else {
                return { _error: 1, message: error.message };
            }
        });
}

export default function Faq({
    faqData
}) {


    function toggleItem(index) {
        console.log('toggleItem', index)
        if (selectedIndex.includes(index)) {
            setSelectedIndex([...selectedIndex].filter((item) => item !== index))
        } else {
            setSelectedIndex([...selectedIndex, index])
        }
    }

    const [faqs, setFaqs] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState([])

    //==========================================================//
    //=================== COMPONENT - HOOKS ====================//
    //==========================================================//
    useEffect(() => {
        if (typeof faqData !== 'undefined' && faqData != null && !faqData._error) {
            setFaqs(faqData.payload);
        }
    }, []);

    //=============================================================//
    //=================== COMPONENT - LISTENER ====================//
    //=============================================================//
    // const onClickItemFAQ = (index) => {
    //     if (selectedIndex.includes(index)) {
    //         setSelectedIndex([...selectedIndex].filter((item) => item !== index))
    //     } else {
    //         setSelectedIndex([...selectedIndex, index])
    //     }
    // }

    //==========================================================//
    //=================== COMPONENT - RENDER ===================//
    //==========================================================//
    // const _renderSectionContentFAQ = (item, index) => {
    //     return (
    //         <a className="flex justify-between items-center mt-2 mb-2 rounded-lg border border-gray-300 p-3 cursor-pointer" onClick={() => onClickItemFAQ(index)}>
    //             <div className="flex-initial">
    //                 <h2 className="font-bold text-md">{item.question}</h2>
    //                 <p className={`mt-4 font-thin text-md ${selectedIndex.includes(index) ? 'h-full block' : 'h-0 hidden'}`}>{item.answer}</p>
    //             </div>
    //             <div className="flex-initial">
    //                 <IconKeyboardArrowDown fontSize="medium" />
    //             </div>
    //         </a>
    //     );
    // }

    // const _renderSectionFAQ = (item, index) => {
    //     return (
    //         <div className="mb-8">
    //             <h1 className="mb-3 font-bold text-xl">{item.title}</h1>
    //             <div className="relative">
    //                 {item.Faqs.length > 0 && item.Faqs.map(_renderSectionContentFAQ)}
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <Layout
            title='FAQ'
            headerTitle={`FAQ`}
            headerBack={`/profile`}>
            <div className="bg-white p-4 min-h-screen">
                <div className="mb-3">
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>Profile</Breadcrumb.Item>
                        <Breadcrumb.Item>FAQ</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="mt-5">
                    {/* {faqs != null && faqs.map(_renderSectionFAQ)} */}
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
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const session = context.req.session;
    const faqUrlAPI = `${process.env.NEXT_API_URL}/v1/support/faqs`;
    const faq = await apiSupportFAQ(session, faqUrlAPI);

    return {
        props: {
            faqData: faq,
        }
    }
}