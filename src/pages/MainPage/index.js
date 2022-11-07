import { Banner } from "../../components/Banner";
import { MainSection } from "../../components/MainSection";
import bg from "../../assets/images/bg_app.png";
import s from "./style.module.scss";

const MainPage = ({ bgClass }) => {
  return (
    <>
      <Banner />
      <MainSection />
      <div className={s.app__background}>
        <img src={bg} alt="background" />
      </div>
    </>
  );
};

export { MainPage };
