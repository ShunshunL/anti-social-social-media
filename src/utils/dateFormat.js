import { format, isThisYear, formatDistanceStrict, formatDistanceToNow } from 'date-fns'

export function formatPostDate(date) {
  const shortFormat = format(new Date(date), 'MMMM d').toUpperCase()
  const longFormat = format(new Date(date), 'MMMM d, yyyy').toUpperCase()
  return isThisYear(new Date(date)) ? shortFormat : longFormat
}

export function formatDateToNow(date) {
  return formatDistanceStrict(new Date(date), new Date(Date.now())).split(' ').map((s, i) => i === 1 ? s[0] : s).join('') + ' ago'
}

export function formatFeedDate(date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true}).toUpperCase()
}