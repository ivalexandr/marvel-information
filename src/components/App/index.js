import { Header } from "../Header";
import { Banner } from "../Banner";
import { MainSection } from "../MainSection";
import s from "./style.module.scss";

const App = () => {
  return (
    <div className={s.app}>
      <Header />
      <Banner />
      <MainSection />
    </div>
  );
};

export { App };
