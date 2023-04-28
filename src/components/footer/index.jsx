import s from './styles.module.css'

export function Footer({footerFixed, SetFooterFixed}) {
    return (
        <>
           <footer className={footerFixed ? s.footer__fixed : s.footer}>
                <p>Этот проект выполнен командой: Илья, Евгений, Алла, Дмитрий 2023 ©</p>
            </footer>
        </>

    )
}