import 'dayjs';
// import s from './styles.module.css'

export function Date({created_at}) {
    const dayjs = require('dayjs');
    return (
        dayjs(created_at).format('DD-MM-YYYY HH:mm:ss')
    )
}
