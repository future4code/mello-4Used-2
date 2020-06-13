import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Card } from "./Card";
import ProdutoDetalhes from "./ProdutoDetalhes/ProdutoDetalhes";
import ShoppingCart from "./ShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { MyTheme } from "./ProdutoDetalhes/ProdutoDetalhes";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Filter from "./Filter";

const myTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#12C0D2",
    },
    secondary: {
      main: "#FFC81A",
    },
  },
});

export const StoreContainer = styled.div`
  width: 100%;
  margin: 0 0 50px 0;
`;

export const ListContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 25px;
`;

const MyBadge = styled(Badge)`
  margin: -1px;
  cursor: pointer;
`;

export class Store extends React.Component {
  state = {
    productDetailsDiv: false,
    productList: [],
    productName: "",
    productImages: "",
    productDescription: "",
    productPrice: "",
    productId: "",
    productsInCart: "",
    cartList: [],
    cartRender: "",
    storeComponentRender: "productGrid",
    maxValue: 1000,
    minValue: 0,
    inputName: "",
    order: "",
    category: "",
  };

  changeInputName = (event) => {
    const newName = event.target.value;
    this.setState({ inputName: newName });
  };
  changeInputMax = (event) => {
    const newMax = event.target.value;
    this.setState({ maxValue: newMax });
  };
  changeInputMin = (event) => {
    const newMin = event.target.value;
    this.setState({ minValue: newMin });
  };
  changeOrder = (event) => {
    this.setState({ order: event.target.value });
  };
  changeCategory = (event) => {
    this.setState({ category: event.target.value });
  };

  componentDidMount = () => {
    this.getProductList();
  };

  onClickAddToCart = (name) => {
    let productToCart = this.state.productList.find((product) => {
      return product.name === name;
    });

    this.setState({ cartList: [...this.state.cartList, productToCart] });
    console.log(this.state.cartList);
  };

  getProductList = () => {
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/fourUsedTwo/products"
      )
      .then((response) => {
        this.setState({ productList: response.data.products });
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  fetchCartItems = () => {
    this.setState({ storeComponentRender: "shoppingCart" });
  };

  getProductById = (productId) => {
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/fourUsedTwo/products"
      )
      .then((response) => {
        this.setState({ productList: response.data.products });
        this.state.productList.map((product) => {
          product.id === productId &&
            this.setState({
              productName: product.name,
              productImages: product.photos,
              productDescription: product.description,
              productPrice: product.price,
            });
        });
        this.setState({ storeComponentRender: "productDetail" });
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  backToStoreFromCart = () => {
    this.setState({ storeComponentRender: "productGrid" });
  };

  changeRender = () => {
    this.setState({ storeComponentRender: "productGrid" });
  };

  render() {
    let orderedList = this.state.productList;
    if (this.state.category) {
      orderedList = orderedList.filter(
        (produto) => produto.category === this.state.category
      );
    }
    if (this.state.order === "crescente") {
      orderedList.sort(function (a, b) {
        return a.price - b.price;
      });
    }
    if (this.state.order === "decrescente") {
      orderedList.sort(function (a, b) {
        return b.price - a.price;
      });
    }
    if (this.state.order === "a-z") {
      orderedList.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      );
    }
    if (this.state.order === "z-a") {
      orderedList.sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return -1;
        } else {
          return 1;
        }
      });
    }
    if (this.state.order === "categoriaAZ") {
      orderedList.sort(function (a, b) {
        if (a.category.toLowerCase() > b.category.toLowerCase()) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    if (this.state.order === "categoriaZA") {
      orderedList.sort(function (a, b) {
        if (a.category.toLowerCase() > b.category.toLowerCase()) {
          return -1;
        } else {
          return 1;
        }
      });
    }
    if (this.state.maxValue) {
      orderedList = orderedList.filter(
        (product) => product.price < this.state.maxValue
      );
    }
    if (this.state.minValue) {
      orderedList = orderedList.filter(
        (product) => product.price > this.state.minValue
      );
    }
    if (this.state.inputName) {
      orderedList = orderedList.filter((product) => {
        const productName = product.name.toLowerCase();
        return productName.indexOf(this.state.inputName.toLowerCase()) > -1;
      });
    }

    // const renderedProductList = orderedList.map((product) => {
    //   return (
    //     <div onClick={() => this.getProductById(product.id)}>
    //       <Card
    //         key={product.id}
    //         imageProps={product.photos}
    //         descriptionProps={product.description}
    //         valueProps={Number(product.price).toFixed(2)}
    //         titleProps={product.name}
    //         brandProps={product.brand}
    //       />
    //     </div>
    //   );
    // });

    let screen;
    switch (this.state.storeComponentRender) {
      case "productGrid":
        screen = (
          <div>
            {" "}
            <Filter
              changeInputName={this.changeInputName}
              changeInputMin={this.changeInputMin}
              changeInputMax={this.changeInputMax}
              changeOrder={this.changeOrder}
              changeCategory={this.changeCategory}
              productList={this.state.productList}
            />
            <ListContainer>
              {orderedList.map((product) => {
                return (
                  <div onClick={() => this.getProductById(product.id)}>
                    <Card
                      key={product.id}
                      imageProps={product.photos}
                      descriptionProps={product.description}
                      valueProps={Number(product.price).toFixed(2)}
                      titleProps={product.name}
                      brandProps={product.brand}
                    />
                  </div>
                );
              })}
              <div>
                <MuiThemeProvider theme={myTheme}>
                  <MyBadge
                    badgeContent={this.state.cartList.length}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    color={"primary"}
                  >
                    <ShoppingCartIcon
                      onClick={this.fetchCartItems}
                      onClickBack={this.changeRender}
                      style={{ fontSize: 70 }}
                    />
                  </MyBadge>
                </MuiThemeProvider>
              </div>
            </ListContainer>
          </div>
        );

        break;
      case "productDetail":
        screen = (
          <ProdutoDetalhes
            productName={this.state.productName}
            productPrice={this.state.productPrice}
            productDescription={this.state.productDescription}
            productImages={this.state.productImages}
            onClickBack={this.changeRender}
            onClickAddToCart={this.onClickAddToCart}
          />
        );
        break;
      case "shoppingCart":
        screen = (
          <ShoppingCart
            cartList={this.state.cartList}
            onClickBack={this.backToStoreFromCart}
          />
        );
        break;
      default:
        screen = null;
    }

    return (
      <StoreContainer>
        <div>{screen}</div>
      </StoreContainer>
    );
  }
}

// {this.state.cartList.map((products) => {
//   return (
//     <div>
//       <p>{products.name}</p>
//     </div>
//   );
// })}
// <button>Ver Carrinho</button>
// <div>
//   <h1>Carrinho</h1>
//   <div></div>
// </div>
