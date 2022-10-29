import { Component } from "react";
import PropTypes from "prop-types";
import { CharacterItem } from "./CharacterItem";
import { Button } from "../../Button";
import { Spinner } from "../../Spinner";
import { ErrorMessage } from "../../ErrorMessage";
import ms from "../../../services/MarvelServices";
import s from "./style.module.scss";

class ListCharacters extends Component {
  state = {
    characters: [],
    loading: true,
    error: false,
    charId: null,
    newItemsLoading: false,
    offset: 210,
    charEnded: false,
  };

  catchError = () => {
    this.setState({ error: true });
  };

  componentDidMount() {
    this.onRequest();
  }

  charLoaded = (newCharacters) => {
    this.setState(({ characters, offset }) => ({
      characters: [...characters, ...newCharacters],
      loading: false,
      newItemsLoading: false,
      offset: offset + 9,
      charEnded: newCharacters.length < 9,
    }));
  };

  onRequest = (offset) => {
    this.onCharListLoading();
    ms.getAllCharacters(offset).then(this.charLoaded).catch(this.catchError);
  };

  onClickCharacter = (id) => {
    this.props.onCharSelected(id);
    this.setState({ charId: id });
  };

  onCharListLoading = () => {
    this.setState({
      newItemsLoading: true,
    });
  };

  render() {
    const { characters, loading, error, newItemsLoading, offset, charEnded } =
      this.state;
    const charactersArray = characters.map((character) => {
      let isActive = false;
      if (character.id === this.state.charId) {
        isActive = true;
      }
      return (
        <CharacterItem
          key={character.id}
          thumbnail={character.thumbnail}
          name={character.name}
          active={isActive}
          id={character.id}
          onClick={this.onClickCharacter}
        />
      );
    });
    const spinner = loading && <Spinner />;
    const errorMessage = error && <ErrorMessage />;
    const content = !(error || loading) && charactersArray;
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
            disabled={newItemsLoading}
            onClick={() => this.onRequest(offset)}
            style={{ display: charEnded ? "none" : "block" }}
          >
            LOAD MORE
          </Button>
        </div>
      </div>
    );
  }
}

ListCharacters.propTypes = {
  onCharSelected: PropTypes.func,
};

export { ListCharacters };
