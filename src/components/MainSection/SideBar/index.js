import { Button } from "../../Button";
import { ComicsItem } from "./ComicsItem";
import loki from "../../../assets/images/characters/loki.jpg";
import s from "./style.module.scss";

const SideBar = () => {
  const data = [
    {
      text: "All-Winners Squad: Band of Heroes (2011) #3",
      id: 1,
    },
    {
      text: "Alpha Flight (1983) #50",
      id: 2,
    },
    {
      text: "Amazing Spider-Man (1999) #503",
      id: 3,
    },
    {
      text: "Amazing Spider-Man (1999) #504",
      id: 4,
    },
    {
      text: "AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)",
      id: 5,
    },
    {
      text: "Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback",
      id: 6,
    },
    {
      text: "Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)",
      id: 7,
    },
    {
      text: "Vengeance (2011) #4",
      id: 8,
    },
    {
      text: "Avengers (1963) #1",
      id: 9,
    },
    {
      text: "Avengers (1996) #1",
      id: 10,
    },
  ];
  const comicsItemArray = data.map((comics) => (
    <ComicsItem key={comics.id} text={comics.text} />
  ));

  return (
    <aside className={s.sidebar}>
      <div className={s.sidebar__character}>
        <div className={s.sidebar__img}>
          <img src={loki} alt="loki" />
        </div>
        <div className={s.sidebar__nav}>
          <span className={s.sidebar__name}>LOKI</span>
          <div className={s.sidebar__btns}>
            <Button button type="button" color="red" size="normal">
              HOMEPAGE
            </Button>
            <Button button type="button" color="grey" size="normal">
              WIKI
            </Button>
          </div>
        </div>
      </div>
      <p className={s.sidebar__descr}>
        In Norse mythology, Loki is a god or jötunn (or both). Loki is the son
        of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By
        the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the
        world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or
        Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in
        the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki
        is referred to as the father of Váli in the Prose Edda.
      </p>
      <h2 className={s.sidebar__heading}>Comics:</h2>
      <ul className={s.sidebar__list}>{comicsItemArray}</ul>
    </aside>
  );
};

export { SideBar };
