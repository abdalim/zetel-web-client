import dayjs from 'dayjs'

export const getTimestampDisplay = (date: Date) => {
  return dayjs(date).format('DD MMM YYYY hh:mm:ss A')
}
