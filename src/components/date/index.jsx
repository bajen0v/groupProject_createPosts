import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ru'
dayjs.locale('ru')
dayjs.extend(relativeTime)

// eslint-disable-next-line camelcase
export function Date ({ created_at }) {
  const dateCreated = dayjs(created_at)
  const dayCreated = dateCreated.date()
  const monthCreated = dateCreated.month()

  const today = dayjs().date()
  const todayMonth = dayjs().month()

  return dayCreated === today && monthCreated === todayMonth
    ? 'Сегодня ' + dateCreated.format('HH:mm')
    : today - dayCreated === 1 && monthCreated === todayMonth
      ? 'Вчера ' + dateCreated.format('hh:mm')
      : dateCreated.format('DD MMMM YYYY') + ' г.'
}
