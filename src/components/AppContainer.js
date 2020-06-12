/* eslint-disable default-case */
import React, { Component } from "react";
import styled from "styled-components";
import CreateProductToSell from "./CreateProductToSell"
import ShoppingCart from './ShoppingCart'
import { Navbar } from "./Navbar";
import { Home } from "./Home";
import ProductDetails from './ProdutoDetalhes/ProdutoDetalhes'
// import { Sales } from "./Sales";
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

  handleProductDetails = () => {
    this.setState({ renderedScreen: "product" });
  };

  render() {
    const rendersScreen = () => {
      // switch (this.state.renderedScreen) {
      //   case "home":
      //     return (
      //       <Home
      //         renderSalesScreenProps={this.handleSalesLink}
      //         renderStoreScreenProps={this.handleStoreLink}
      //       />
      //     );
      //   case "store":
      //     return (
      //       <Store
      //         renderProductDetailsScreenProps={this.handleProductDetails}
      //       />
      //     );
      //   case "product":
      //     return <ProductDetails />;
      // }
    };

    return (
      <ComponentsContainer>
        <Navbar
          renderHomeScreenProps={this.handleHomeLink}
          renderSalesScreenProps={this.handleSalesLink}
          renderStoreScreenProps={this.handleStoreLink}
        />
        <Store />
        <ScreenComponents>{rendersScreen()}</ScreenComponents>
      </ComponentsContainer>
    );
  }
}