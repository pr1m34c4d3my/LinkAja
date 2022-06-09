import { useState, useEffect } from 'react'
import { numberWithCommas } from '@/helpers/index'
import Link from 'next/link'

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
      <div key={index} className="flex py-4 border-b h-full">
        <div className='w-4/12'>
          <div
            className="border border-gray-300 rounded-lg p-1 mr-4"
            style={{ width: '80px', height: '80px' }}
          >
            <img
              src={item.picture}
              alt={item.title}
              className="w-full h-auto object-center object-cover"
            />
          </div>
        </div>
        <div className='w-8/12'>
          <div className="flex-auto min-h-full flex flex-col justify-between">
            <div className="text-xs">{item.qty} unit</div>
            <div className="font-bold">{item.title}</div>
            <div className="flex">
              <Link href={`/mobiles/hadiah/[id]/?id=${item.id}`} as={`/hadiah/${item.id}`} >
                <a>
                  <div
                    className="bg-ruby-base w-auto px-3 rounded-full text-gray-100 flex items-center relative pr-10"
                    style={{ height: '28px', fontSize: '12px' }}
                  >
                    {numberWithCommas(item.point)} Point Redeem / Unit
                    <div
                      className=" absolute rounded-full bg-ruby-base border-2 border-white flex items-center justify-center right-0"
                      style={{
                        height: '28px',
                        width: '28px',
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
                        <rect width="13" height="13" fill="#E3292B" />
                        <path
                          d="M10.2917 0.541992H2.70833C2.1125 0.541992 1.63042 1.02949 1.63042 1.62533L1.625 8.62908C1.625 9.00283 1.81458 9.33324 2.10167 9.52824L6.5 12.4587L10.8929 9.52824C11.18 9.33324 11.3696 9.00283 11.3696 8.62908L11.375 1.62533C11.375 1.02949 10.8875 0.541992 10.2917 0.541992ZM5.41667 8.66699L2.70833 5.95866L3.47208 5.19491L5.41667 7.13408L9.52792 3.02283L10.2917 3.79199L5.41667 8.66699Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              </Link>
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
      <h3 className="text-md font-bold">Hadiah Lainnya</h3>
      {redeemsCard != null && _renderRedeemCard()}
    </>
  )
}