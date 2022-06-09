import InfiniteScroll from 'react-infinite-scroll-component'
import ItemNotif from '@/components/mobiles/notification/ItemNotif'

export default function ListNotif({ notifs }) {



  return (
    <div className='w-full h-auto'>
      <InfiniteScroll
        dataLength={notifs.data.length}
        next={fetchMoreData}
        style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
        inverse={true} //
        hasMore={true}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        {notifs.data.map((notif, index) => (
          <ItemNotif
            key={index} notif={notif}
          />
        ))}
      </InfiniteScroll>
    </div>
  )
}