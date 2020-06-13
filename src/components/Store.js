import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Card } from "./Card";
import ProdutoDetalhes from "./ProdutoDetalhes/ProdutoDetalhes";

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
        this.changeRender();
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  changeRender = () => {
    this.setState({ productDetailsDiv: !this.state.productDetailsDiv });
  };

  render() {
    console.log(this.state.cartList);
    const renderedProductList = this.state.productList.map((product) => {
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
    });

    return (
      <div>
        {this.state.productDetailsDiv ? (
          <ProdutoDetalhes
            productName={this.state.productName}
            productPrice={this.state.productPrice}
            productDescription={this.state.productDescription}
            productImages={this.state.productImages}
            onClickBack={this.changeRender}
            onClickAddToCart={this.onClickAddToCart}
          />
        ) : (
          <StoreContainer>
            <ListContainer>{renderedProductList}</ListContainer>
            {this.state.cartList.map((products) => {
              return (
                <div>
                  <p>{products.name}</p>
                  <p>{this.state.cartList.lenght}</p>
                </div>
              );
            })}
            <button>Ver Carrinho</button>
            <div>
              <h1>Carrinho</h1>
              <div></div>
            </div>
          </StoreContainer>
        )}
      </div>
    );
  }
}
