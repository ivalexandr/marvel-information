import { CharacterItem } from "./CharacterItem";
import { Button } from "../../Button";
import s from "./style.module.scss";

const ListCharacters = ({ characters }) => {
  const charactersArray = characters.map((character) => {
    return (
      <CharacterItem
        key={character.id}
        character={character}
        active={character.active}
      />
    );
  });
  return (
    <div className={s.characterList}>
      <ul className={s.characterList__list}>
        {characters.length && charactersArray}
      </ul>
      <div className={s.characterList__more}>
        <Button button color="red" type="button" size="large">
          LOAD MORE
        </Button>
      </div>
    </div>
  );
};

export { ListCharacters };
