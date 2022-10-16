import { Component } from "react";
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
  };

  catchError = () => {
    this.setState({ error: true });
  };

  componentDidMount() {
    this.onRequest();
  }

  charLoaded = (characters) => {
    this.setState((prevState) => ({
      ...prevState,
      characters,
      loading: false,
      newItemsLoading: false,
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
    const { characters, loading, error } = this.state;
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
          <Button button color="red" type="button" size="large">
            LOAD MORE
          </Button>
        </div>
      </div>
    );
  }
}

export { ListCharacters };
