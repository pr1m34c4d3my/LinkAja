import ProgressItem from '@/components/desktop/dashboard/ProgressAchievement/ProgressItem'

export default function ProgressAchievement({ xp }) {

  const achievementLevels = [
    {
      id: 1,
      medal: 'bronze',
      start: 0,
      limit: 95000,
      iconPath: '/icons/achieve-badge/0.png',
    },
    {
      id: 2,
      medal: 'silver',
      start: 95000,
      limit: 150000,
      iconPath: '/icons/achieve-badge/5.png',
    },
    {
      id: 3,
      medal: 'gold',
      start: 150000,
      limit: 300000,
      iconPath: '/icons/achieve-badge/10.png',
    },
    {
      id: 4,
      medal: 'platinum',
      start: 300000,
      limit: 400000,
      iconPath: '/icons/achieve-badge/20.png',
    },
    {
      id: 5,
      medal: 'priority',
      start: 400000,
      limit: 499999,
      iconPath: '/icons/achieve-badge/50.png',
    },
  ]

  return (
    <div className="flex justify-between w-full">
      <div aria-label="wrapper" className="w-full overflow-hidden">
        <div
          aria-label="progress-achievement"
          className="flex justify-between relative"
          style={{
            marginRight: `-${100 / 5 - 2}%`,
          }}
        >
          <div aria-label="progress-bar"
            className="flex w-full"
            style={{
              padding: '2px 10px',
              marginLeft: '-5px',
            }}
          >
            {achievementLevels.map((item, index) => (
              <ProgressItem
                level={item}
                key={item.id}
                isFinish={index + 1 >= achievementLevels.length ? true : false}
                xp={xp}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}