import { useState, useEffect } from "react";
import { Button } from "../../Button";
import { ComicsItem } from "./ComicsItem";
import { Spinner } from "../../Spinner";
import { ErrorMessage } from "../../ErrorMessage";
import { Skeleton } from "../../Skeleton";
import ms from "../../../services/MarvelServices";
import cn from "classnames";
import s from "./style.module.scss";

const SideBar = ({ character }) => {
  const [char, setChar] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line
  }, [character]);

  const onCharLoaded = (character) => {
    setChar(character);
    setLoading(false);
    setError(false);
  };

  const updateChar = () => {
    if (!character) {
      return;
    }
    setLoading(true);
    ms.getOneCharacter(character)
      .then(onCharLoaded)
      .catch(() => setError(true));
  };

  const skeleton = !(char || isLoading || isError) && <Skeleton />;
  const errorMessage = isError && <ErrorMessage />;
  const spinner = isLoading && <Spinner />;
  const content = !(isError || isLoading || !char) && <Inner {...char} />;

  return (
    <aside className={s.sidebar}>
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </aside>
  );
};

const Inner = ({ name, thumbnail, description, comics, homepage, wiki }) => {
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

export { SideBar };
