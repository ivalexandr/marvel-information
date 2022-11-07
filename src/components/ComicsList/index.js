import { useEffect, useState } from "react";
import { Container } from "../Container";
import { useMarvelServices } from "../../services/MarvelServices";
import { ComicsItem } from "./ComicsItem";
import { Button } from "../Button";
import { Spinner } from "../Spinner";
import { ErrorMessage } from "../ErrorMessage";
import s from "./style.module.scss";

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [offset, setOffset] = useState(0);
  const { getAllComics, isError, isLoading } = useMarvelServices();

  useEffect(() => {
    onRequest();
    // eslint-disable-next-line
  }, []);

  const onRequest = (offset) => {
    getAllComics(offset).then((data) =>
      setComics((prevState) => [...prevState, ...data])
    );
  };

  const loadMoreHandler = () => {
    setOffset((prev) => prev + 8);
    onRequest(offset);
  };

  const content = comics.map(({ id, ...item }) => (
    <ComicsItem key={item.id} {...item} />
  ));

  const spinner = isLoading && <Spinner />;
  const error = isError && <ErrorMessage />;

  return (
    <>
      <Container>
        <ul className={s.list}>
          {spinner}
          {error}
          {content}
        </ul>
        <div className={s.list__button}>
          <Button button color="red" size="large" onClick={loadMoreHandler}>
            LOAD MORE
          </Button>
        </div>
      </Container>
    </>
  );
};

export { ComicsList };
