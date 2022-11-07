import { useState, useEffect } from "react";
import { Container } from "../Container";
import { Button } from "../Button";
import { Spinner } from "../Spinner";
import { ErrorMessage } from "../ErrorMessage";
import { randomGenerator } from "../../services/randomGenerator";
import { elipsisStr } from "../../services/funcs";
import { useMarvelServices } from "../../services/MarvelServices";
import cn from "classnames";
import s from "./style.module.scss";

const Banner = () => {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [homepage, setHomepage] = useState(null);
  const [wiki, setWiki] = useState(null);

  const { isLoading, isError, getOneCharacter, clearError } =
    useMarvelServices();

  useEffect(() => {
    updateChar(randomGenerator(1011000, 1011400));
    // eslint-disable-next-line
  }, []);

  const onCharLoaded = ({ name, description, thumbnail, homepage, wiki }) => {
    setName(name);
    setDescription(description);
    setThumbnail(thumbnail);
    setHomepage(homepage);
    setWiki(wiki);
  };

  const updateChar = (id) => {
    clearError();
    getOneCharacter(id).then(onCharLoaded);
  };

  const clickRandomHandler = () => {
    updateChar(randomGenerator(1011000, 1011400));
  };

  const errorMessage = isError && <ErrorMessage />;
  const spinner = isLoading && <Spinner />;
  const content = !(isError || isLoading || !name) && (
    <Character
      name={name}
      thumbnail={thumbnail}
      description={description}
      homepage={homepage}
      wiki={wiki}
    />
  );

  return (
    <Container>
      <div className={s.banner}>
        <div className={s.banner__character}>
          {errorMessage}
          {spinner}
          {content}
        </div>
        <div className={s.banner__random}>
          <h2 className={s.banner__random_heading}>
            Random character for today!
            <br /> Do you want to get to know him better?
          </h2>
          <p className={s.banner__random_choose}>Or choose another one</p>
          <div className={s.banner__random_nav}>
            <Button
              onClick={clickRandomHandler}
              button
              color="red"
              type="button"
              size="normal"
              dark
            >
              TRY IT
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

const Character = ({ name, thumbnail, description, homepage, wiki }) => {
  const isImageNotFound = thumbnail.includes("image_not_available");
  return (
    <>
      <div className={s.banner__character_img}>
        <img
          src={thumbnail}
          alt={name}
          className={cn({ [s.img_contain]: isImageNotFound })}
        />
      </div>
      <div className={s.banner__character_about}>
        <h2 className={s.banner__character_name}>{name}</h2>
        <p className={s.banner__character_descr}>
          {description
            ? elipsisStr(description, 250)
            : "Description is not found..."}
        </p>
        <div className={s.banner__character_nav}>
          <Button color="red" type="button" size="normal" href={homepage}>
            HOMEPAGE
          </Button>
          <Button color="grey" type="button" size="normal" href={wiki}>
            WIKI
          </Button>
        </div>
      </div>
    </>
  );
};

export { Banner };
