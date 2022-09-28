import { Container } from "../Container";
import { ListCharacters } from "./ListCharachters";
import { SideBar } from "./SideBar";
import { db } from "../../assets/images/characters/db";
import s from "./style.module.scss";

const MainSection = () => {
  return (
    <Container>
      <main className={s.main}>
        <ListCharacters characters={db} />
        <SideBar />
      </main>
    </Container>
  );
};

export { MainSection };
