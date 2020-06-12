import React from "react";
import styled from "styled-components";
import axios from 'axios'
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
  };

  componentDidMount = () => {
    this.getProduct()
  }

  getProduct = (productId) => {
    productId = this.state.productId
    axios.get('https://us-central1-labenu-apis.cloudfunctions.net/fourUsedTwo/products')
      .then((response) => {
        this.setState({productList: response.data.products})
        this.state.productList.map((product) => {
          product.id === productId &&
          this.setState({
            productName: product.name, 
            productImages: product.photos,
            productDescription: product.description,
            productPrice: product.price
          })
        })
      }) 
      .catch((error) => {
        window.alert(error)
      })
  }

  onClickCards = (id) => {
    // this.setState({productDetailsDiv: !this.state.productDetailsDiv})
    window.alert(id)
  }

  render() {
    console.log(this.state.productList)
    const renderedProductList = this.state.productList.map((product) => {
      return (
        <div onClick={() => this.onClickCards(product.id)}>
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
        {this.state.productDetailsDiv ?
        <ProdutoDetalhes /> :
        <StoreContainer>
          <ListContainer >{renderedProductList}</ListContainer>
        </StoreContainer>}
      </div>
    );
  }
}
