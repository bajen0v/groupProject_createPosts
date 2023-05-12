import s from './styles.module.css'

// eslint-disable-next-line react/prop-types
export function Footer ({ footerFixed }) {
  return (
        <> {footerFixed
          ? <footer className={s.footer__fixed}>
                <p>Этот проект выполнен командой: Илья, Евгений, Алла, Дмитрий 2023 ©</p>
            </footer>
          : <footer className={s.footer}>
                <p>Этот проект выполнен командой: Илья, Евгений, Алла, Дмитрий 2023 ©</p>
            </footer>}

        </>

  )
}
