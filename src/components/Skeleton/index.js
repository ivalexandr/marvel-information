import cn from "classnames";
import s from "./style.module.scss";

const Skeleton = () => {
  return (
    <div className={s.skeleton}>
      <h3 className={s.skeleton__heading}>
        Please select a character to see information
      </h3>
      <div className={s.skeleton__top}>
        <div className={s.skeleton__round}></div>
        <div className={cn(s.skeleton__line, s.skeleton__line_small)}></div>
      </div>
      <div className={cn(s.skeleton__line, s.skeleton__line_large)}></div>
      <div className={cn(s.skeleton__line, s.skeleton__line_large)}></div>
      <div className={cn(s.skeleton__line, s.skeleton__line_large)}></div>
    </div>
  );
};

export { Skeleton };
