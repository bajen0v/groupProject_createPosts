/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import s from './styles.module.css'

export function Tag ({ tags }) {
  return (
        <div className={s.tags__wrapper}>
            {tags?.map((tag, index) => tag && <Link to={`/sort/${tag}`} key={index} className={s.tag__name} title='Посты с таким же тегом'>{tag}</Link>)}
        </div>
  )
}
