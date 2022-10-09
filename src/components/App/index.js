import { Header } from "../Header";
import { Banner } from "../Banner";
import { MainSection } from "../MainSection";
import s from "./style.module.scss";

const App = () => {
  return (
    <>
      <Header />
      <main className={s.app}>
        <Banner />
        <MainSection />
      </main>
    </>
  );
};

export { App };
