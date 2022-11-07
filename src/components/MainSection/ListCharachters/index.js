import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { CharacterItem } from "./CharacterItem";
import { Button } from "../../Button";
import { Spinner } from "../../Spinner";
import { ErrorMessage } from "../../ErrorMessage";
import { useMarvelServices } from "../../../services/MarvelServices";
import s from "./style.module.scss";

const ListCharacters = ({ onCharSelected }) => {
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(210);
  const [isNewItemsLoading, setNewItemsLoading] = useState(false);
  const [isCharEnded, setCharEnded] = useState(false);

  const { isLoading, isError, getAllCharacters } = useMarvelServices();

  const arrayCharacterElements = useRef([]);

  useEffect(() => {
    onRequest(offset, true);
    //eslint-disable-next-line
  }, []);

  const charLoaded = (newCharacters) => {
    setCharacters((prevCharacters) => [...prevCharacters, ...newCharacters]);
    setOffset((prevOffset) => prevOffset + 9);
    setCharEnded(newCharacters.length < 9);
  };

  const onRequest = (offset, initital) => {
    initital ? setNewItemsLoading(false) : setNewItemsLoading(true);
    getAllCharacters(offset).then(charLoaded);
  };

  const onClickCharacter = (id, index) => {
    onCharSelected && onCharSelected(id);
    arrayCharacterElements.current.forEach((item) =>
      item.classList.remove(s.character_active)
    );
    arrayCharacterElements.current[index].classList.add(s.character_active);
  };

  const getElements = (ref, index) => {
    arrayCharacterElements.current[index] = ref;
  };

  const charactersArray = characters.map((item, index) => {
    return (
      <CharacterItem
        {...item}
        key={item.id}
        onClick={onClickCharacter}
        index={index}
        ref={(ref) => getElements(ref, index)}
      />
    );
  });

  const spinner = isLoading && !isNewItemsLoading && <Spinner />;
  const errorMessage = isError && <ErrorMessage />;

  return (
    <div className={s.characterList}>
      <ul className={s.characterList__list}>
        {spinner}
        {errorMessage}
        {charactersArray}
      </ul>
      <div className={s.characterList__more}>
        <Button
          button
          color="red"
          type="button"
          size="large"
          disabled={isNewItemsLoading}
          onClick={() => onRequest(offset, true)}
          style={{ display: isCharEnded ? "none" : "block" }}
        >
          LOAD MORE
        </Button>
      </div>
    </div>
  );
};

ListCharacters.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export { ListCharacters };
