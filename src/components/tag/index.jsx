/* eslint-disable react/prop-types */
import s from './styles.module.css'

export function Tag ({ tags }) {
  return (
        <div className={s.tags__wrapper}>
            {tags.map((tag, index) => tag && <p key={index} className={s.tag__name}>{tag}</p>)}
        </div>
  )
}
