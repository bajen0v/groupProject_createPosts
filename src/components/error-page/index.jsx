import { Button } from '@mui/material';
import { ReactComponent as NotFoundIcon } from './ic-notfound.svg';


import s from "./styles.module.css";
export function NotFound() {

  return (
    <div className={s.notfound} title="Страница не найдена">
      <NotFoundIcon className={s.image} aria-hidden="true" />
      <h1 className={s.title}>Страница не найдена</h1>
        <Button variant="contained"  href="/" >На главную</Button>
    </div>
  );
}