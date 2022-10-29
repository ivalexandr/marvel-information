import cn from "classnames";
import s from "./style.module.scss";

const Button = ({
  children,
  button,
  onClick,
  color,
  type,
  size,
  dark,
  href,
  disabled,
  style,
}) => {
  if (button) {
    return (
      <button
        type={type}
        className={cn(s.button, s[color], s[size], { [s.red__dark]: dark })}
        onClick={onClick}
        disabled={disabled}
        style={style}
      >
        {children}
      </button>
    );
  }
  return (
    <a
      href={href}
      className={cn(s.button, s[color], s[size], { [s.red__dark]: dark })}
      onClick={onClick}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

export { Button };
