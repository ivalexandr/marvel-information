import s from "./style.module.scss";

const Container = ({ children }) => (
  <div className={s.container}>{children}</div>
);

export { Container };
