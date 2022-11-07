import PropTypes from "prop-types";
import cn from "classnames";
import s from "./style.module.scss";

const ComicsItem = ({ thumbnail, title, price }) => {
  const isNotAvailable = thumbnail && thumbnail.includes("not_available");
  return (
    <li className={s.comics}>
      <div className={s.comics__cover}>
        <img
          className={cn({ [s.img_fill]: isNotAvailable })}
          src={thumbnail}
          alt={title}
        />
      </div>
      <h3 className={s.comics__title}>{title}</h3>
      <span className={s.comics__price}>{price}</span>
    </li>
  );
};

ComicsItem.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
};

export { ComicsItem };
