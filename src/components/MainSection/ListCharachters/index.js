import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { CharacterItem } from "./CharacterItem";
import { Button } from "../../Button";
import { Spinner } from "../../Spinner";
import { ErrorMessage } from "../../ErrorMessage";
import ms from "../../../services/MarvelServices";
import s from "./style.module.scss";

const ListCharacters = ({ onCharSelected }) => {
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(210);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [isNewItemsLoading, setNewItemsLoading] = useState(false);
  const [isCharEnded, setCharEnded] = useState(false);

  const arrayCharacterElements = useRef([]);

  useEffect(() => {
    onRequest();
    //eslint-disable-next-line
  }, []);

  const charLoaded = (newCharacters) => {
    setCharacters((prevCharacters) => [...prevCharacters, ...newCharacters]);
    setOffset((prevOffset) => prevOffset + 9);
    setLoading(false);
    setNewItemsLoading(false);
    setCharEnded(newCharacters.length < 9);
  };

  const onRequest = (offset) => {
    setNewItemsLoading(true);
    ms.getAllCharacters(offset)
      .then(charLoaded)
      .catch(() => setError(true));
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

  const spinner = isLoading && <Spinner />;
  const errorMessage = isError && <ErrorMessage />;
  const content = !(isError || isLoading) && charactersArray;

  return (
    <div className={s.characterList}>
      <ul className={s.characterList__list}>
        {spinner}
        {errorMessage}
        {content}
      </ul>
      <div className={s.characterList__more}>
        <Button
          button
          color="red"
          type="button"
          size="large"
          disabled={isNewItemsLoading}
          onClick={() => onRequest(offset)}
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
