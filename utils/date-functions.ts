import { formatDistanceToNow } from 'date-fns'

export const getDateDistanceToNow = (date: number) => {
  const fromNow = formatDistanceToNow(date)
  return fromNow
}
