import React, { Component } from "react";
import styled from "styled-components";

import { Navbar } from "./Navbar";
import { Home } from "./Home";
import { Sales } from "./Sales";
import { Store } from "./Store";

export const ComponentsContainer = styled.div`
  width: 100%;
`;

export const ScreenComponents = styled.div`
  padding: 0 5em;
`;

export class AppContainer extends Component {
  state = {
    renderedScreen: "home",
  };

  handleHomeLink = () => {
    this.setState({ renderedScreen: "home" });
  };

  handleSalesLink = () => {
    this.setState({ renderedScreen: "sales" });
  };

  handleStoreLink = () => {
    this.setState({ renderedScreen: "store" });
  };

  render() {
    const rendersScreen = () => {
      switch (this.state.renderedScreen) {
        case "home":
          return (
            <Home
              renderSalesScreenProps={this.handleSalesLink}
              renderStoreScreenProps={this.handleStoreLink}
            />
          );
        case "sales":
          return <Sales />;
        case "store":
          return <Store />;
        default:
      }
    };

    return (
      <ComponentsContainer>
        <Navbar
          renderHomeScreenProps={this.handleHomeLink}
          renderSalesScreenProps={this.handleSalesLink}
          renderStoreScreenProps={this.handleStoreLink}
        />
        <ScreenComponents>{rendersScreen()}</ScreenComponents>
      </ComponentsContainer>
    );
  }
}
