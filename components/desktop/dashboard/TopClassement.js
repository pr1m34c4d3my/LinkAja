import { useMemo, useState } from 'react'
import { numberWithCommas } from '@/helpers/index'
import IconBadgeXp from '@/components/mobiles/icons/IconBadgeXp'

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
              ? 'border-ruby-secondary text-ruby-base font-bold'
              : 'border-gray-200 text-gray-500'
              } border-b-2 font-semibold cursor-pointer flex-1 flex items-center justify-center`}
            onClick={() => setActiveTab(tab.value)}
          >
            <span className="p-3">{tab.label}</span>
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
              {activeTab === 'global' && <h3 className="text-lg text-center font-semibold w-2/12">{item.global_ranking}</h3>}
              {activeTab !== 'global' && <h3 className="text-lg text-center font-semibold w-2/12">{item.local_ranking}</h3>}
              <div className="rounded-full w-3/12 px-1">
                <div style={{ width: '48px', height: '48px' }}>
                  {item.profile_picture &&
                    <img
                      src={item.profile_picture}
                      alt="avatar"
                      className="inline-block object-cover h-12 w-12 rounded-full ring-2 ring-white"
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
              <div className="w-8/12">
                <div>
                  <span className="text-sm">{item.fullname}</span>
                </div>
                <div className="flex">
                  <IconBadgeXp xp={item.experience} size="18px" className="mr-2" />
                  <span className="text-base font-bold">{`${numberWithCommas(item.experience)} XP`}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}