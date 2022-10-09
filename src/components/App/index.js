import { Header } from "../Header";
import { Banner } from "../Banner";
import { MainSection } from "../MainSection";
import bg from "../../assets/images/bg_app.png";
import s from "./style.module.scss";

const App = () => {
  return (
    <div className={s.app}>
      <Header />
      <main>
        <Banner />
        <MainSection />
      </main>
      <div className={s.app__background}>
        <img src={bg} alt="background" />
      </div>
    </div>
  );
};

export { App };
