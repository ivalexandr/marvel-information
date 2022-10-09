import cn from "classnames";
import s from "./style.module.scss";

const CharacterItem = ({ active, name, thumbnail }) => {
  const isImageNotFound = thumbnail.includes("image_not_available");
  return (
    <li className={cn(s.character, { [s.character_active]: active })}>
      <div className={s.character__img}>
        <img
          src={thumbnail}
          alt={name}
          className={cn({ [s.img_contain]: isImageNotFound })}
        />
      </div>
      <h3 className={s.character__name}>{name}</h3>
    </li>
  );
};

export { CharacterItem };
