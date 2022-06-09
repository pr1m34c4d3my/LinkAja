import { useState, useEffect } from 'react';
import Link from 'next/link'
import { ChevronRight as IconChevronRight, IndeterminateCheckBoxSharp } from '@material-ui/icons'

export default function TopThread({ hots }) {

  const [threads, setThreads] = useState(null)

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
    if (typeof hots !== 'undefined' && hots != null && hots != '') {
      const threadData = hots.filter(hot => hot.is_hot == true)
      console.log(hots)
      setThreads(threadData)
    }
  }

  return (
    <>
      {threads != null && threads.map((data, index) => (
        <div key={data.id} className="bg-white rounded-lg border border-gray-200 flex p-3 mb-2">
          <div className="w-4/12">
            <div className="rounded-xl" style={{ width: '64px', height: '64px' }}>
              <img src={data.picture} alt={data.description} className="w-full h-full object-center object-cover" />
            </div>
          </div>
          <div className="w-8/12">
            <div className="font-bold">{data.title}</div>
            <div className="flex items-center">
              <div className="mr-2 mt-2">
                <svg
                  width="16"
                  height="18"
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 9.2743L1 12.1319C1 13.4121 1.61112 13.9922 2.81191 13.9922L5.23007 13.9922"
                    stroke="#656D86"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11.9154 1.00009L2.81191 1.00009C1.61022 1.00009 1 1.58018 1 2.86038C1 2.86038 1 7.93318 1 11.1836"
                    stroke="#656D86"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15.1001 12.1533L15.1001 2.86026C15.1001 1.58005 14.489 0.999962 13.2882 0.999962L9.18713 0.999963"
                    stroke="#656D86"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10.8698 13.9922L13.2866 13.9922C14.4883 13.9922 15.0985 13.4121 15.0985 12.1319L15.0985 9.2743"
                    stroke="#656D86"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M5.2304 13.9927L7.87069 16.4816C7.94789 16.5544 8.0685 16.5542 8.14549 16.4812L10.7698 13.9927"
                    stroke="#656D86"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4.62613 6.43855C4.01427 6.43855 3.51826 6.93456 3.51826 7.54642C3.51826 8.15828 4.01427 8.6543 4.62613 8.6543C5.238 8.6543 5.73401 8.15828 5.73401 7.54642C5.73401 6.93456 5.238 6.43855 4.62613 6.43855Z"
                    fill="#656D86"
                  />
                  <path
                    d="M8.05069 6.43855C7.43883 6.43855 6.94282 6.93456 6.94282 7.54642C6.94282 8.15828 7.43883 8.6543 8.05069 8.6543C8.66256 8.6543 9.15857 8.15828 9.15857 7.54642C9.15857 6.93456 8.66256 6.43855 8.05069 6.43855Z"
                    fill="#656D86"
                  />
                  <path
                    d="M11.4751 6.43855C10.8633 6.43855 10.3673 6.93456 10.3673 7.54642C10.3673 8.15828 10.8633 8.6543 11.4751 8.6543C12.087 8.6543 12.583 8.15828 12.583 7.54642C12.583 6.93456 12.087 6.43855 11.4751 6.43855Z"
                    fill="#656D86"
                  />
                </svg>
              </div>
              <div className="text-xs text-gray-500">{data.thread_count} Balasan</div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}