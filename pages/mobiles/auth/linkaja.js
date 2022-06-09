import Layout from '@/components/mobiles/Layout'

export default function Auth() {

  return (
    <Layout title='LinkAja'>
      <div className='p-2'>
        <h2 className='text-md text-gray-600 font-bold'>Masukan nomor Handphone</h2>
        <span className='text-xs text-gray-400'>Masukan nomor handphone yang terhubung dengan LinkAja</span>
        <form className='mt-5'>
          <label htmlFor='phone' className='block text-sm text-gray-400 font-bold'>Nomor Handphone</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-600 sm:text-sm">
                +62
              </span>
            </div>
            <input type='text' id='phone' name='phone' className="focus:ring-red-400 focus:border-red-400 block w-full pl-10 pr-4 py-4 sm:text-sm text-gray-600 border-gray-300 rounded-md shadow-sm mb-5" />
          </div>
          <button type='submit' className='w-full rounded-lg text-white text-center bg-red-600 shadow-md p-4 font-bold'>Lanjutkan</button>
        </form>
      </div>
    </Layout>
  )
}