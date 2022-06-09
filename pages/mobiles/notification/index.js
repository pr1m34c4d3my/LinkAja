import { useState, useEffect } from 'react'
import axios from 'axios'

import Router from 'next/router'
import Layout from '@/components/mobiles/Layout'

import { parseTimeAgoMini } from '@/helpers/index'
import InfiniteScroll from 'react-infinite-scroll-component'
import Skeleton from 'react-loading-skeleton'
import * as HelperComponents from '@/helpers/components'

export default function Notification({
    showNavbar,
}) {
    const [notifications, setNotifications] = useState(null);
    const [notifCurrentPage, setNotifCurrentPage] = useState(1);
    const [notifTotalPage, setNotifTotalPage] = useState(1);

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
        Promise.all([
            apiNotification(),
        ])
            .then(([notification]) => {
                if (!notification._error) {
                    setNotifications(notification.data);
                    setNotifCurrentPage(notification.current_page);
                    setNotifTotalPage(notification.total_page);
                }
            })
            .catch(err => {
                setNotifications(null);
                setNotifCurrentPage(1);
                setNotifTotalPage(1);
            });
    }

    const onClickNotificationItem = async (notification) => {
        if (notifications != null) {
            if (!notification.is_read) {
                apiNotificationRead(notification);
            }
        }
    }

    //=============================================================//
    //=================== COMPONENT - FUNCTION ====================//
    //=============================================================//
    const apiNotification = async () => {
        return axios.post('/notification',
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                if (res.status === 200) {
                    return res.data.payload;
                } else {
                    return { _error: 1 };
                }
            })
            .catch(err => {
                return { _error: 1 };
            });
    }

    const apiNotificationRead = async (notification) => {
        return axios.post(`/notification/${notification.id}/read`,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                handleNotificationRead(notification);
            })
            .catch(err => {
                return;
            });
    }

    const handleNotificationRead = (notification) => {
        if (notifications != null && notifications.length > 0) {
            let newNotifications = [];

            notifications.map((item) => {
                if (item.id === notification.id) {
                    item.is_read = true;
                }

                newNotifications.push(item);
            });

            if (notification.flag == 'POINT') {
                setNotifications(newNotifications);
                Router.push('/mobiles/points', '/points');
            } else {
                setNotifications(newNotifications);
                window.location = notification.url;
            }
        }
    }

    //==========================================================//
    //=================== COMPONENT - RENDER ===================//
    //==========================================================//
    const _renderNotificationItem = (item, index) => {
        return (
            <a key={`notification-${index}`} onClick={() => onClickNotificationItem(item)}>
                <div className={`${item.is_read === 0 ? 'bg-red-50' : 'bg-white'
                    } border-gray-200 border-b p-3`}>
                    <div className="flex justify-center items-center">
                        <div className="px-2">
                            <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="13" cy="13" r="13" fill="#E82529" />
                                <g mask="url(#mask0_916_32987)">
                                    <circle cx="19.5" cy="21.5" r="14.5" fill="url(#paint0_linear_916_32987)" />
                                </g>
                                <path d="M7.59998 13C7.59998 11.86 8.52665 10.9333 9.66665 10.9333H12.3333V9.66666H9.66665C7.82665 9.66666 6.33331 11.16 6.33331 13C6.33331 14.84 7.82665 16.3333 9.66665 16.3333H12.3333V15.0667H9.66665C8.52665 15.0667 7.59998 14.14 7.59998 13ZM10.3333 13.6667H15.6666V12.3333H10.3333V13.6667ZM16.3333 9.66666H13.6666V10.9333H16.3333C17.4733 10.9333 18.4 11.86 18.4 13C18.4 14.14 17.4733 15.0667 16.3333 15.0667H13.6666V16.3333H16.3333C18.1733 16.3333 19.6666 14.84 19.6666 13C19.6666 11.16 18.1733 9.66666 16.3333 9.66666Z" fill="white" />
                            </svg>
                        </div>
                        <div className="ml-2 mr-6">
                            <span className="font-semibold text-gray-700 text-ms">{item.title || <Skeleton />}</span>
                            <span className="block text-gray-500 text-xs font-normal">{item.description || <Skeleton count={3} />}</span>
                        </div>
                        <div className='ml-1'>
                            <span className='text-xs text-gray-300 font-normal'>{parseTimeAgoMini(new Date(item.created_at))}</span>
                        </div>
                    </div>
                </div>
            </a>
        );
    }

    const _renderNotificationList = () => {
        return (
            <InfiniteScroll
                dataLength={notifications.length}
                // next={fetchMoreData}
                style={{ display: 'flex', flexDirection: 'column' }} //To put endMessage and loader to the top.
                inverse={true} //
                // hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv">
                {notifications.map(_renderNotificationItem)}
            </InfiniteScroll>
        );
    }

    return (
        <Layout title='Notifikasi' showNavbar={showNavbar}>

            <div className='py-2 bg-white'>
                <h2 className="px-4 font-bold text-base my-2">Notifikasi</h2>
                <div className='w-full h-auto'>
                    {notifications != null && notifications.length > 0 && _renderNotificationList()}
                </div>
            </div>
        </Layout >
    )
}

export async function getServerSideProps(context) {
    const showNavbar = HelperComponents.isNavbarShow(context);

    return {
        props: {
            showNavbar,
        }
    }
}