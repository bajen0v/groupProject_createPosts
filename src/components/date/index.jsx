import { Dayjs } from 'dayjs'
import s from './styles.module.css'

export function Date({ createdAt }) {
    // const date = require('dayjs')
    // dateInnerText.innerText = date('2023-02-02').format('YY')
    return (
        <>
        <div>{Dayjs(createdAt).format('YY MM DD')}</div>
        </>
    )
}
Date();