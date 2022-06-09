import axios from 'axios'
import { useEffect, useState } from 'react'
import { MEDAL } from '@/constant/index'

const useMedal = (flag) => {

  const [imageUrl, setImageUrl] = useState({
    background: '',
    badge: '',
  })

  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  function generateMockStatus() {
    // return 'complete'
    // return 'progress'
    return 'locked'
  }

  function processImageUrl() {
    let background = ''
    let badge = ''

    switch (flag) {
      case MEDAL.BRONZE.FLAG:
        background = '/images/medals/bg-bronze.png'
        badge = '/icons/achieve-badge/0.png'
        break
      case MEDAL.SILVER.FLAG:
        background = '/images/medals/bg-silver.png'
        badge = '/icons/achieve-badge/5.png'
        break
      case MEDAL.GOLD.FLAG:
        background = '/images/medals/bg-gold.png'
        badge = '/icons/achieve-badge/10.png'
        break
      case MEDAL.PLATINUM.FLAG:
        background = '/images/medals/bg-platinum.png'
        badge = '/icons/achieve-badge/20.png'
        break
      case MEDAL.PRIORITY.FLAG:
        background = '/images/medals/bg-priority.png'
        badge = '/icons/achieve-badge/50.png'
        break

      default:
        background = '/images/medals/bg-bronze.png'
        badge = '/icons/achieve-badge/0.png'
        break
    }
    setImageUrl((state) => ({
      ...state,
      background,
      badge,
    }))
  }

  async function fetchData() {
    try {
      setIsLoading(true)
      const selectedMedal = localStorage.getItem('medal')

      if (selectedMedal) {
        const medal = JSON.parse(selectedMedal)
        setData({
          ...medal,
          status_progress: generateMockStatus(),
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (flag) {
      fetchData()
      processImageUrl()
    }
  }, [flag])

  function renderMedalProgress() {
    return (
      <div>
        <h4 className="text-white font-semibold font-title mb-1">
          Membership saat ini
        </h4>
        <div className="flex">
          <div
            className="bg-gray-100 rounded-full border-gray-100"
            style={{
              height: '16px',
              borderWidth: '3px',
              width: '60%',
            }}
          >
            <div
              className="bg-ruby-base h-full rounded-full"
              style={{ width: '70%' }}
            ></div>
          </div>
        </div>
        <h4 className="text-white font-semibold font-title text-xs mt-1">
          1 dari 2 Misi Terselesaikan
        </h4>
      </div>
    )
  }

  function renderMedalPassed() {
    return (
      <div className="flex">
        <div className="bg-gray-100 rounded-full px-2 py-1 mt-1 flex items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
              fill="#0CC5AA"
            />
          </svg>
          <span className="text-xs ml-1 mr-2 text-gray-700 font-semibold font-title">
            Sudah Dilewati
          </span>
        </div>
      </div>
    )
  }

  function renderMedalLocked() {
    return (
      <div className="flex">
        <div className="bg-gray-100 rounded-full px-2 py-1 mt-1 flex items-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.9999 6.66634H14.1666V4.99967C14.1666 2.69967 12.2999 0.833008 9.99992 0.833008C7.69992 0.833008 5.83325 2.69967 5.83325 4.99967V6.66634H4.99992C4.08325 6.66634 3.33325 7.41634 3.33325 8.33301V16.6663C3.33325 17.583 4.08325 18.333 4.99992 18.333H14.9999C15.9166 18.333 16.6666 17.583 16.6666 16.6663V8.33301C16.6666 7.41634 15.9166 6.66634 14.9999 6.66634ZM9.99992 14.1663C9.08325 14.1663 8.33325 13.4163 8.33325 12.4997C8.33325 11.583 9.08325 10.833 9.99992 10.833C10.9166 10.833 11.6666 11.583 11.6666 12.4997C11.6666 13.4163 10.9166 14.1663 9.99992 14.1663ZM12.5833 6.66634H7.41658V4.99967C7.41658 3.57467 8.57492 2.41634 9.99992 2.41634C11.4249 2.41634 12.5833 3.57467 12.5833 4.99967V6.66634Z"
              fill="#BDBDBD"
            />
          </svg>

          <span className="text-xs ml-1 mr-2 text-gray-700 font-semibold font-title">
            Masih Terkunci
          </span>
        </div>
      </div>
    )
  }

  function renderMedalStatus() {
    if (data.status_progress === 'complete') {
      return renderMedalPassed()
    }

    if (data.status_progress === 'progress') {
      return renderMedalProgress()
    }

    if (data.status_progress === 'locked') {
      return renderMedalLocked()
    }

    return null
  }

  return {
    data,
    isLoading,
    imageUrl,
    renderMedalStatus,
  }
}

export default useMedal
