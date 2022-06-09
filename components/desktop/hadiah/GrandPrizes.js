import { useState, useEffect } from 'react';
import { numberWithCommas } from '@/helpers/index'

export default function GrandPrizes({ redeems }) {

  const [redeemLong, setRedeemLong] = useState(null);

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
    if (typeof redeems !== 'undefined' && redeems != null && redeems != '') {
      redeems.map((item, index) => {
        if (item.is_hot == true) setRedeemLong(item);
      })
    }
  }

  const _renderRedeemLong = () => {
    return (
      <div className="flex justify-center bg-ruby-base text-gray-100 p-4 rounded-md mb-3">
        <div className="p-1" style={{ width: '250px' }}>
          <img src={redeemLong.picture} alt={redeemLong.title} className="w-full h-auto" />
        </div>
        <div className="flex flex-col justify-between py-2">
          <h1 className="text-2xl italic font-bold font-title text-gray-100">
            GRAND PRIZE
          </h1>
          <div className="flex items-center">
            <div className="text-6xl font-bold font-title text-gray-100">
              {redeemLong.qty}
            </div>
            <div className="text-xl font-bold font-title text-gray-100 leading-6 w-1/2">
              {String(redeemLong.title).toUpperCase()}
            </div>
          </div>
          <div className="flex">
            <div
              className="bg-white w-auto px-3 rounded-full text-gray-900 text-xs flex items-center relative pr-10 truncate"
              style={{ height: '30px' }}
            >
              {numberWithCommas(redeemLong.point)} Point Redeem / Unit
              <div
                className=" absolute rounded-full bg-white border-2 border-ruby-base flex items-center justify-center right-0"
                style={{
                  height: '30px',
                  width: '30px',
                  marginRight: -2,
                  paddingLeft: 2,
                  paddingTop: 1,
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="13" height="13" fill="white" />
                  <path
                    d="M10.2917 0.541992H2.70833C2.1125 0.541992 1.63042 1.02949 1.63042 1.62533L1.625 8.62908C1.625 9.00283 1.81458 9.33324 2.10167 9.52824L6.5 12.4587L10.8929 9.52824C11.18 9.33324 11.3696 9.00283 11.3696 8.62908L11.375 1.62533C11.375 1.02949 10.8875 0.541992 10.2917 0.541992ZM5.41667 8.66699L2.70833 5.95866L3.47208 5.19491L5.41667 7.13408L9.52792 3.02283L10.2917 3.79199L5.41667 8.66699Z"
                    fill="#E82529"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>{redeemLong != null && _renderRedeemLong()}</>
  )
}