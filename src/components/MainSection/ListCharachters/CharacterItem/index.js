import cn from "classnames";
import s from "./style.module.scss";

const CharacterItem = ({ character, active }) => {
  const { name, img } = character;
  return (
    <li className={cn(s.character, { [s.character_active]: active })}>
      <div className={s.character__img}>
        <img src={img} alt={name} />
      </div>
      <h3 className={s.character__name}>{name}</h3>
    </li>
  );
};

export { CharacterItem };
