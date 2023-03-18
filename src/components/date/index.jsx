import { Dayjs } from 'dayjs'
import s from './styles.module.css'

export function Date() {
    const date = require('dayjs')
    console.log(date('2023-02-02').format('YY'))
    // dateInnerText.innerText = date('2023-02-02').format('YY')
    return (
        <>
        <div className={s.date}>{date('2023-02-02').format('YY MM DD')}</div>
        </>
    )
}
Date();