import { forwardRef } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import s from "./style.module.scss";

const CharacterItem = forwardRef(
  ({ name, thumbnail, onClick, id, index }, ref) => {
    const isImageNotFound = thumbnail.includes("image_not_available");
    const clickHandler = () => {
      onClick && onClick(id, index);
    };
    return (
      <li onClick={clickHandler} className={s.character} ref={ref}>
        <a
          className={s.character__inner}
          href="/"
          onClick={(e) => e.preventDefault()}
        >
          <div className={s.character__img}>
            <img
              src={thumbnail}
              alt={name}
              className={cn({ [s.img_contain]: isImageNotFound })}
            />
          </div>
          <h3 className={s.character__name}>{name}</h3>
        </a>
      </li>
    );
  }
);

CharacterItem.propTypes = {
  active: PropTypes.bool,
  name: PropTypes.string,
  thumbnail: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.number,
};

export { CharacterItem };
