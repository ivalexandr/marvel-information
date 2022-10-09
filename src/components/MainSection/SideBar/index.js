import { Component } from "react";
import { Button } from "../../Button";
import { ComicsItem } from "./ComicsItem";
import { Spinner } from "../../Spinner";
import { ErrorMessage } from "../../ErrorMessage";
import { Skeleton } from "../../Skeleton";
import ms from "../../../services/MarvelServices";
import cn from "classnames";
import s from "./style.module.scss";

class SideBar extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  updateChar = () => {
    const { character } = this.props;
    if (!character) {
      return;
    }
    this.onCharLoading();
    ms.getOneCharacter(character)
      .then(this.onCharLoaded)
      .catch(this.onCharError);
  };

  renderSideBar = () => {
    const { name, thumbnail, description, comics, homepage, wiki } =
      this.state.char;
    const spliceArray = comics.length > 10 ? comics.splice(0, 10) : comics;
    const comicsItemArray = spliceArray.map((item, index) => (
      <ComicsItem key={index} text={item.name} href={item.resourceURI} />
    ));
    const emptyComicsArray = !comicsItemArray.length && (
      <li className={s.sidebar__notComics}>Comics are not found...</li>
    );
    const emptyDescription = !description && (
      <span>Description is not found...</span>
    );
    const isImageNotFound = thumbnail.includes("image_not_available");
    return (
      <>
        <div className={s.sidebar__character}>
          <div
            className={cn(s.sidebar__img, {
              [s.sidebar__img_contain]: isImageNotFound,
            })}
          >
            <img src={thumbnail} alt={name} />
          </div>
          <div className={s.sidebar__nav}>
            <span className={s.sidebar__name}>{name}</span>
            <div className={s.sidebar__btns}>
              <Button type="button" color="red" size="normal" href={homepage}>
                HOMEPAGE
              </Button>
              <Button type="button" color="grey" size="normal" href={wiki}>
                WIKI
              </Button>
            </div>
          </div>
        </div>
        <p className={s.sidebar__descr}>
          {emptyDescription}
          {description}
        </p>
        <h2 className={s.sidebar__heading}>Comics:</h2>
        <ul className={s.sidebar__list}>
          {emptyComicsArray}
          {comicsItemArray}
        </ul>
      </>
    );
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false, error: false });
  };

  onCharLoading = () => {
    this.setState({ loading: true });
  };

  onCharError = () => {
    this.setState({ error: true });
  };

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.character !== prevProps.character) {
      this.updateChar();
    }
  }

  render() {
    const { char, loading, error } = this.state;
    const skeleton = !(char || loading || error) && <Skeleton />;
    const errorMessage = error && <ErrorMessage />;
    const spinner = loading && <Spinner />;
    const content = !(error || loading || !char) && this.renderSideBar();
    return (
      <aside className={s.sidebar}>
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </aside>
    );
  }
}

export { SideBar };
