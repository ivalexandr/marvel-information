import { Container } from "../Container";
import { Button } from "../Button";
import thor from "../../assets/images/thor.jpg";
import s from "./style.module.scss";

const Banner = () => {
  return (
    <Container>
      <div className={s.banner}>
        <div className={s.banner__character}>
          <div className={s.banner__character_img}>
            <img src={thor} alt="thor" />
          </div>
          <div className={s.banner__character_about}>
            <h2 className={s.banner__character_name}>THOR</h2>
            <p className={s.banner__character_descr}>
              As the Norse God of thunder and lightning, Thor wields one of the
              greatest weapons ever made, the enchanted hammer Mjolnir. While
              others have described Thor as an over-muscled, oafish imbecile,
              he's quite smart and compassionate...
            </p>
            <div className={s.banner__character_nav}>
              <Button button color="red" type="button" size="normal">
                HOMEPAGE
              </Button>
              <Button button color="grey" type="button" size="normal">
                WIKI
              </Button>
            </div>
          </div>
        </div>
        <div className={s.banner__random}>
          <h2 className={s.banner__random_heading}>
            Random character for today!
            <br /> Do you want to get to know him better?
          </h2>
          <p className={s.banner__random_choose}>Or choose another one</p>
          <div className={s.banner__random_nav}>
            <Button button color="red" type="button" size="normal" dark>
              TRY IT
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export { Banner };
