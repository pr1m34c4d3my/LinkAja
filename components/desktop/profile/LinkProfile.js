import Link from 'next/link'
import { ChevronRight as IconChevronRight } from '@material-ui/icons'

export default function LinkProfile({ data }) {
  return (
    <Link href={data.path} as={data.as}>
      <a className="block no-underline hover:text-inherit hover:no-underline">
        <div className='bg-white border-b border-gray-200 flex py-3 mb-2'>
          <div className="w-11/12">
            <div className="font-bold text-sm">{data.title}</div>
          </div>
          <div className="w-1/12 flex justify-end text-ruby-base">
            <IconChevronRight color="inherit" />
          </div>
        </div>
      </a>
    </Link>
  )
}