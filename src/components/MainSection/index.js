import { Component } from "react";
import { Container } from "../Container";
import { ListCharacters } from "./ListCharachters";
import { SideBar } from "./SideBar";
import s from "./style.module.scss";

class MainSection extends Component {
  state = {
    selectedChar: null,
  };

  onCharSelected = (id) => {
    this.setState({ selectedChar: id });
  };

  render() {
    const { selectedChar } = this.state;
    return (
      <Container>
        <div className={s.main}>
          <ListCharacters onCharSelected={this.onCharSelected} />
          <SideBar character={selectedChar} />
        </div>
      </Container>
    );
  }
}

export { MainSection };
