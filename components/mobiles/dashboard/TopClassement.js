import { useMemo, useState } from 'react'
import IconBadgeXp from '@/components/mobiles/icons/IconBadgeXp'
import { numberWithCommas, convertDecimalTo } from '@/helpers/index'

export default function TopClassement({ profile, ranks }) {

  const tabs = [
    {
      value: 'global',
      label: 'Semua',
    },
    {
      value: 'local',
      label: profile.Medal.title,
    },
  ]

  const [activeTab, setActiveTab] = useState('global')

  const activeTabContent = useMemo(() => {
    return ranks[activeTab] || []
  }, [activeTab])

  return (
    <>
      <div aria-label="tab-switcher" className="flex mb-4">
        {tabs.map((tab, index) => (
          <span
            key={index}
            className={`${activeTab === tab.value
              ? 'border-ruby-base text-ruby-base font-bold'
              : 'border-transparent text-gray-500'
              } border-b-2 font-semibold w-full text-center cursor-pointer p-2`}
            onClick={() => setActiveTab(tab.value)}>
            {tab.label}
          </span>
        ))}
      </div>
      <div aria-label="tab-content" className="">
        {activeTabContent.map((item, index) => {
          return (
            <div
              key={index}
              className={`flex items-center py-2 px-1 border-b
                ${index + 1 < activeTabContent.length ? 'border-gray-200' : 'border-transparent'}
                ${item.is_me ? 'bg-gray-100' : 'bg-white'}
              `}>
              {activeTab === 'global' && <h3 className="text-lg text-center font-semibold w-1/12">{item.global_ranking}</h3>}
              {activeTab !== 'global' && <h3 className="text-lg text-center font-semibold w-1/12">{item.local_ranking}</h3>}
              <div className="w-2/12 px-1">
                <div style={{ width: '48px', height: '48px' }}>
                  {item.profile_picture &&
                    <img
                      src={item.profile_picture}
                      alt="avatar"
                      className='inline-block object-cover h-12 w-12 rounded-full ring-2 ring-white'
                    />
                  }
                  {!item.profile_picture &&
                    <img
                      src='/example/avatar/1.png'
                      alt="avatar-path"
                      className="w-full object-cover object-center"
                    />
                  }
                </div>
              </div>
              <div className="w-5/12 px-1">
                <span className="text-sm font-normal">{item.fullname}</span>
              </div>
              <div className="w-3/12 pr-1 text-right">
                <span className="font-semibold text-sm">{`${convertDecimalTo(item.experience)} XP`}</span>
              </div>
              <div className="w-1/12 flex justify-end items-center">
                <IconBadgeXp xp={item.experience} size="18px" />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}