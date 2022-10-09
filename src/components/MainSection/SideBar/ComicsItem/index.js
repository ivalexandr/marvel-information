import s from "./style.module.scss";

const ComicsItem = ({ text, href }) => {
  return (
    <li className={s.item}>
      <a className={s.item__link} href={href} target="_blank" rel="noreferrer">
        {text}
      </a>
    </li>
  );
};

export { ComicsItem };
