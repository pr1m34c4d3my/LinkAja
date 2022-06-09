import cookie from 'cookie'
import TimeAgo from 'javascript-time-ago'
import timeAgoLocale from 'javascript-time-ago/locale/en'
import moment from 'moment-timezone'


TimeAgo.addLocale(timeAgoLocale)

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || '' : '')
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export const parseTimeAgo = (unix) => {
  const timeAgo = new TimeAgo('id-ID')
  return timeAgo.format(unix)
}

export const parseTimeAgoMini = (unix) => {
  const timeAgo = new TimeAgo('id-ID')
  return timeAgo.format(unix, 'mini')
}

export function parseThumbnailYoutube(string) {
  const id = new URL(string)
  return `https://img.youtube.com/vi/${id.searchParams.get('v')}/sddefault.jpg`
}

export function parseEmbedYoutube(string) {
  const id = new URL(string)
  return `https://www.youtube.com/embed/${id.searchParams.get('v')}`
}

export function getLevelLabel(xp) {
  let value = ''
  switch (true) {
    case xp >= 0 && xp < 95000:
      value = 'Bronze'
      break
    case xp >= 95000 && xp < 150000:
      value = 'Silver'
      break
    case xp >= 150000 && xp < 300000:
      value = 'Gold'
      break
    case xp >= 300000 && xp < 400000:
      value = 'Platinum'
      break
    case xp >= 400000:
      value = 'Priority'
      break
    default:
      value = 'Bronze'
      break
  }

  return value
}

export function getMissionImage(flag) {
  let value = ''
  switch (true) {
    case flag == 'LOGIN':
      value = '/icons/daily-mission/login.png'
      break
    case flag == 'PROFILE':
      value = '/icons/daily-mission/profile.png'
      break
    case flag == 'CEK_AJA':
      value = '/icons/daily-mission/cek-aja.png'
      break
    case flag == 'BERGAUL_AJA':
      value = '/icons/daily-mission/bergaul-aja.png'
      break
    case flag == 'MAIN_AJA':
      value = '/icons/daily-mission/main-aja.png'
      break
    case flag == 'BAGIKAN_AJA':
      value = '/icons/daily-mission/ajak-teman.png'
      break
    case flag == 'TRANSAKSI_AZ':
      value = '/icons/daily-mission/transaksi-a-z.png'
      break
    case flag == 'JADI_BERKAH':
      value = '/icons/daily-mission/jadi-berkah.png'
      break
    case flag == 'SPECIAL_AZ':
      value = '/icons/daily-mission/transaksi-a-z-special.png'
      break
    case flag == 'SPECIAL_BERKAH':
      value = '/icons/daily-mission/jadi-berkah-special.png'
      break
    default:
      value = ''
      break
  }
  return value
}

export function getBadgeIcon(xp) {
  let value = ''
  switch (true) {
    case xp >= 0 && xp < 95000:
      value = '/icons/achieve-badge/0.png'
      break
    case xp >= 95000 && xp < 150000:
      value = '/icons/achieve-badge/5.png'
      break
    case xp >= 150000 && xp < 300000:
      value = '/icons/achieve-badge/10.png'
      break
    case xp >= 300000 && xp < 400000:
      value = '/icons/achieve-badge/20.png'
      break
    case xp >= 400000:
      value = '/icons/achieve-badge/50.png'
      break
    default:
      value = ''
      break
  }

  return value
}

export function getBadgeIconDesktop(flag) {
  let value = ''
  switch (true) {
    case flag == 'bronze':
      value = '/icons/medali/ic_bronze.png'
      break
    case flag == 'silver':
      value = '/icons/medali/ic_silver.png'
      break
    case flag == 'gold':
      value = '/icons/medali/ic_gold.png'
      break
    case flag == 'platinum':
      value = '/icons/medali/ic_platinum.png'
      break
    case flag == 'priority':
      value = '/icons/medali/ic_priority.png'
      break
    default:
      value = ''
      break
  }

  return value
}

export function parseQRCode(string) {
  return `https://qrcode.kawasan-hukum.com/?link=https://apa2bisa.linkaja.id/login?ref=${string}`
}

export function convertDecimalTo(num) {
  let result = 0
  switch (true) {
    case num > 999 && num < 1000000:
      result = (num / 1000).toFixed(0) + 'K'
      break
    case num > 1000000:
      result = (num / 1000000).toFixed(0) + 'M'
      break
    case num < 900:
      result = num
      break
    default:
      result
      break
  }

  return result
}

export function dateWithFormatSQL(str) {
  return moment(str).tz("Asia/Jakarta").format('YYYY-MM-DD')
}