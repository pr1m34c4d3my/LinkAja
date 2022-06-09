import Link from 'next/link'
import { ChevronRight as IconChevronRight } from '@material-ui/icons'

export default function CardForumCategory({ data }) {
  return (
    <div key={data.id}>
      <Link href={`/forum/category/[id]?id=${data.id}`} as={'/forum/' + data.id}>
        <a className="block no-underline hover:text-inherit hover:no-underline">
          <div className="bg-white rounded-lg border border-gray-200 flex p-3 mb-2">
            <div className="w-2/12 px-2">
              <div className="rounded-full" style={{ width: '64px', height: '64px' }}>
                <img src={data.picture} alt="" className="w-full h-full object-center object-cover rounded-full" />
              </div>
            </div>
            <div className="w-9/12">
              <div className="font-bold">{data.title}</div>
              <p className="text-gray-500 mb-2 text-sm">{data.description}</p>
              <div className="flex items-center">
                <div className="mr-2">
                  <svg
                    width="14"
                    height="17"
                    viewBox="0 0 14 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.50015 4.50098L0.500149 14.5082C0.500149 15.8292 1.09827 16.5 2.41827 16.5C2.41827 16.5 3.14874 16.5 6.50018 16.5"
                      stroke="#989EB8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12.0002 0.500007L2.41827 0.500006C1.09827 0.500006 0.500149 1.17179 0.500149 2.49179L0.500149 7"
                      stroke="#989EB8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8.53561 0.500977L11.482 0.500977C12.802 0.500977 13.4001 1.17178 13.4001 2.49276L13.4001 14.5C13.4001 15.6046 12.5047 16.5 11.4001 16.5H6.50024"
                      stroke="#989EB8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10.1002 4.2998H4.10016"
                      stroke="#989EB8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.1002 7.1001H4.10016"
                      stroke="#989EB8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.1002 9.5H4.10022"
                      stroke="#989EB8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.1002 12.5H4.10022"
                      stroke="#989EB8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-xs text-gray-500">{data.thread_count} Threads</div>
              </div>
            </div>
            <div className="w-1/12 text-ruby-base flex items-center">
              <IconChevronRight color="inherit" />
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}