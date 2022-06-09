export default function VirtualCity({ data }) {
  return (
    <div className='w-full'>
      <img
        src={data.image}
        width='100%'
        height='100%'
        alt={data.title}
        className='rounded'
      />
    </div>
  )
}