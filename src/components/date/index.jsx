import "dayjs";
// import s from './styles.module.css'

export function Date({ created_at }) {
  const dayjs = require("dayjs");
  const dateCreated = dayjs(created_at);
  const dayCreated = dateCreated.date();
  const today = dayjs().date()
  
  return dayCreated === today
    ? "Сегодня " + dateCreated.format("hh:mm")
    : today - dayCreated === 1
        ? "Вчера " + dateCreated.format("hh:mm") 
        : dateCreated.format("DD MMM YYYY") + " г.";
}
