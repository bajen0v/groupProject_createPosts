import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';
dayjs.locale('ru');
dayjs.extend(relativeTime);

// import s from './styles.module.css'

export function Date({ created_at }) {
  
  const dateCreated = dayjs(created_at);
  const dayCreated = dateCreated.date();
  const today = dayjs().date()
  
  return dayCreated === today
    ? "Сегодня " + dateCreated.format("HH:mm")
    : today - dayCreated === 1
        ? "Вчера " + dateCreated.format("hh:mm") 
        : dateCreated.format("DD MMMM YYYY") + " г.";
}
