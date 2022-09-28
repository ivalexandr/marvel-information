import { Container } from "../Container";
import cn from "classnames";
import s from "./style.module.scss";

const Header = () => {
  return (
    <Container>
      <header className={s.header}>
        <div className={s.header__main}>
          <span className={s.header__main_red}>Marvel</span> information portal
        </div>
        <nav className={s.header__navigate}>
          <a className={cn(s.header__navigate_char, s.active)} href=" ">
            Characters
          </a>
          <span className={s.header__navigate_div}>/</span>
          <a className={s.header__navigate_comics} href=" ">
            Comics
          </a>
        </nav>
      </header>
    </Container>
  );
};

export { Header };
