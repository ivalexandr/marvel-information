import s from "./style.module.scss";

const ComicsItem = ({ text }) => {
  return <li className={s.item}>{text}</li>;
};

export { ComicsItem };
