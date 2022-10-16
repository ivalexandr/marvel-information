import { Component } from "react";
import { Container } from "../Container";
import { ListCharacters } from "./ListCharachters";
import { SideBar } from "./SideBar";
import { ErrorBoundary } from "../ErrorBoundary";
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
          <ErrorBoundary>
            <SideBar character={selectedChar} />
          </ErrorBoundary>
        </div>
      </Container>
    );
  }
}

export { MainSection };
