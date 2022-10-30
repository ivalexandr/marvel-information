import { useState } from "react";
import { Container } from "../Container";
import { ListCharacters } from "./ListCharachters";
import { SideBar } from "./SideBar";
import { ErrorBoundary } from "../ErrorBoundary";
import s from "./style.module.scss";

const MainSection = () => {
  const [selectedChar, setSelectedChar] = useState(null);
  const onCharSelected = (id) => setSelectedChar(id);

  return (
    <Container>
      <div className={s.main}>
        <ListCharacters onCharSelected={onCharSelected} />
        <ErrorBoundary>
          <SideBar character={selectedChar} />
        </ErrorBoundary>
      </div>
    </Container>
  );
};

export { MainSection };
