import moment from 'moment'

export const formatTimeDifference = (createdAt: string): string => {
  const createdDate = moment(createdAt)
  const currentDate = moment()

  const yearsDiff = currentDate.diff(createdDate, 'years')
  const monthsDiff = currentDate.diff(createdDate, 'months')
  const daysDiff = currentDate.diff(createdDate, 'days')
  const hoursDiff = currentDate.diff(createdDate, 'hours')
  const minutesDiff = currentDate.diff(createdDate, 'minutes')
  const secondsDiff = currentDate.diff(createdDate, 'seconds') + 1

  if (yearsDiff > 0) {
    return `${yearsDiff}y`
  } else if (monthsDiff > 0) {
    return `${monthsDiff}mo`
  } else if (daysDiff > 0) {
    return `${daysDiff}d`
  } else if (hoursDiff > 0) {
    return `${hoursDiff}h`
  } else if (minutesDiff > 0) {
    return `${minutesDiff}m`
  } else {
    return `${secondsDiff}s`
  }
}
