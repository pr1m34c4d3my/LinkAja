import Link from 'next/link'
export default function CardForumThread({ data }) {
  return (
    <Link href={`/forum/thread/[id]?id=${data.id}`} as={`/forum/thread/${data.id}`}>
      <a className="no-underline hover:no-underline p-3 flex rounded-lg border border-gray-200 mb-3">
        <div className="mr-4">
          <div className="rounded-lg mr-4" style={{ width: '64px', height: '64px' }}>
            <img src={data.picture} alt="" className="h-full w-full object-cover object-center rounded-lg" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold mb-2">{data.title}</h3>
          <div className="flex items-center">
            <div className="mr-2">
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 9.27454L1 12.1321C1 13.4123 1.61112 13.9924 2.81191 13.9924L5.23007 13.9924"
                  stroke="#656D86"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M11.9154 0.999967L2.81191 0.999968C1.61022 0.999968 1 1.58006 1 2.86026C1 2.86026 1 7.93306 1 11.1835"
                  stroke="#656D86"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M15.1001 12.1534L15.1001 2.86038C15.1001 1.58018 14.489 1.00008 13.2882 1.00008L9.18713 1.00008"
                  stroke="#656D86"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M10.8698 13.9924L13.2866 13.9924C14.4883 13.9924 15.0985 13.4123 15.0985 12.1321L15.0985 9.27454"
                  stroke="#656D86"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M5.2304 13.9924L7.87069 16.4813C7.94789 16.554 8.0685 16.5539 8.14549 16.4809L10.7698 13.9924"
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
            <div className="text-gray-400">{data.reply_count} Balasan</div>
          </div>
        </div>
      </a>
    </Link>
  )
}