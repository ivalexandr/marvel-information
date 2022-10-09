import { Component } from "react";
import { Container } from "../Container";
import { Button } from "../Button";
import { Spinner } from "../Spinner";
import { ErrorMessage } from "../ErrorMessage";
import { randomGenerator } from "../../services/randomGenerator";
import { elipsisStr } from "../../services/funcs";
import cn from "classnames";
import ms from "../../services/MarvelServices";
import s from "./style.module.scss";

class Banner extends Component {
  state = {
    character: {
      name: null,
      description: null,
      thumbnail: null,
      homepage: null,
      wiki: null,
    },
    loading: true,
    error: false,
  };

  onCharLoaded = (character) => {
    this.setState({ character, loading: false });
  };

  updateChar = (id) => {
    ms.getOneCharacter(id).then(this.onCharLoaded).catch(this.catchError);
  };

  catchError = () => {
    this.setState({ loading: false, error: true });
  };

  viewCharacter = (char) => {
    const { name, thumbnail, description, homepage, wiki } = char;
    const isImageNotFound = char?.thumbnail.includes("image_not_available");
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

  componentDidMount() {
    this.updateChar(randomGenerator(1011000, 1011400));
  }

  clickRandomHandler = () => {
    const { error } = this.state;
    this.onCharLoading();
    if (error) {
      this.setState({ error: false });
    }
    this.updateChar(randomGenerator(1011000, 1011400));
  };

  onCharLoading = () => {
    this.setState({ loading: true });
  };

  render() {
    const { character, loading, error } = this.state;
    const errorMessage = error && <ErrorMessage />;
    const spinner = loading && <Spinner />;
    const content = !(error || loading) && this.viewCharacter(character);
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
                onClick={this.clickRandomHandler}
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
  }
}

export { Banner };
