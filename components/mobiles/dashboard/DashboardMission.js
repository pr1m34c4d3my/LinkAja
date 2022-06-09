import { useMemo, useState } from 'react'

import DailyMissions from '@/components/mobiles/dashboard/DailyMissions'
import TopClassement from '@/components/mobiles/dashboard/TopClassement'

const views = [
  {
    title: 'Misi Harian',
    value: 'daily-missions',
    component: DailyMissions,
  },
  {
    title: 'Top 5 Klasemen',
    value: 'top-classement',
    component: TopClassement,
  },
]

export default function DashboardMission({ profile, missions, ranks }) {
  const [viewType, setViewType] = useState('daily-missions')

  const activeComponent = useMemo(() => {
    const view = views.find((item) => item.value === viewType)

    const { component: Component } = view

    return Component ? <Component profile={profile} missions={missions} ranks={ranks} /> : <> </>
  }, [viewType])

  return (
    <div className="bg-white py-4 px-2 rounded-t-2xl">
      <div className="w-full rounded-full flex border-4 border-gray-100 bg-gray-150 mb-4">
        {views.map((view) => {
          return (
            <div
              key={view.value}
              className={`${viewType === view.value ? 'bg-ruby-base' : 'bg-gray-150'} ${viewType === view.value ? 'text-gray-100' : 'text-red-600'} flex-1 text-center rounded-full py-3 cursor-pointer font-bold`}
              onClick={() => setViewType(view.value)}>
              {view.title}
            </div>
          )
        })}
      </div>
      {activeComponent}
    </div>
  )
}