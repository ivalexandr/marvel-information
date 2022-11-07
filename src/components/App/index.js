import { Header } from "../Header";
import { ComicsPage } from "../../pages/ComicsPage";
import s from "./style.module.scss";

const App = () => {
  return (
    <div className={s.app}>
      <Header />
      <main>
        <ComicsPage />
      </main>
    </div>
  );
};

export { App };
