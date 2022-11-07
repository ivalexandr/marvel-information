import { Container } from "../Container";
import avengers from "../../assets/images/comics/Avengers_banner.png";
import logo from "../../assets/images/comics/Avengers_logo_banner.png";
import s from "./style.module.scss";

const ComicsBanner = () => {
  return (
    <Container>
      <div className={s["comics-banner"]}>
        <div className={s["comics-banner__main"]}>
          <div className={s["comics-banner__avengers"]}>
            <img src={avengers} alt="avengers" />
          </div>
          <h2 className={s["comics-banner__title"]}>
            New comics every week! Stay tuned!
          </h2>
        </div>
        <div className={s["comics-banner__logo"]}>
          <img src={logo} alt="logo" />
        </div>
      </div>
    </Container>
  );
};

export { ComicsBanner };
