import { useState, useEffect } from 'react'
import { numberWithCommas } from '@/helpers/index'

export default function CardRedeems({ redeems }) {

  const [redeemsCard, setRedeemsCard] = useState(null);

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
      const redeemData = redeems.filter(redeem => redeem.is_hot == false)
      setRedeemsCard(redeemData)
    }
  }

  const _renderRedeemCardItem = (item, index) => {
    return (
      <div key={item.id} className='bg-white rounded-lg overflow-hidden flex flex-col'>
        <div className="p-2 flex justify-center">
          <div
            style={{ height: '150px', width: '150px' }}
            className="mt-3"
          >
            <img
              src={item.picture}
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
        <div className='p-3 flex flex-col justify-between flex-1'>
          <div>
            <h3 className='font-bold mb-3 text-ruby-base text-lg text-center'>{item.qty} Unit</h3>
            <h3 className='font-extrabold text-gray-700 text-lg text-center'>{item.title}</h3>
          </div>
        </div>
        <div className="p-3 flex justify-center">
          <div
            className="bg-gray-100 w-auto px-3 rounded-full text-gray-900 text-xs flex items-center relative pr-10 truncate"
            style={{ height: '30px' }}
          >
            {numberWithCommas(item.point)} Point Redeem / Unit
            <div
              className="absolute rounded-full bg-white border-1 border-ruby-base flex items-center justify-center right-0"
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
    )
  }

  const _renderRedeemCard = () => {
    return (
      <>
        {redeemsCard != null && redeemsCard.length > 0 &&
          redeemsCard.map((item, index) => _renderRedeemCardItem(item, index))
        }
      </>
    )
  }

  return (
    <>
      {redeemsCard != null && _renderRedeemCard()}
    </>
  )

}