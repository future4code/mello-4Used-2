import React from "react";
import styled from "styled-components";
import axios from 'axios'
import { Card } from "./Card";
import ProdutoDetalhes from "./ProdutoDetalhes/ProdutoDetalhes";

import Filter from './Filter'

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
    productName: '',
    productImages: '',
    productDescription: '',
    productPrice: '',
    productId: '',
    maxValue: 1000,
    minValue: 0,
    inputName: "",
    order: "",
    category: ""
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
  }

  componentDidMount = () => {
    this.getProductList()
  }

  getProductList = () => {
    axios.get('https://us-central1-labenu-apis.cloudfunctions.net/fourUsedTwo/products')
      .then((response) => {
        this.setState({ productList: response.data.products })
      })
      .catch((error) => {
        window.alert(error)
      })
  }

  getProductById = (productId) => {
    axios.get('https://us-central1-labenu-apis.cloudfunctions.net/fourUsedTwo/products')
      .then((response) => {
        this.setState({ productList: response.data.products })
        this.state.productList.map((product) => {
          product.id === productId &&
            this.setState({
              productName: product.name,
              productImages: product.photos,
              productDescription: product.description,
              productPrice: product.price
            })
        })
        this.changeRender()
      })
      .catch((error) => {
        window.alert(error)
      })
  }

  changeRender = () => {
    this.setState({ productDetailsDiv: !this.state.productDetailsDiv })
  }

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
      orderedList = orderedList.filter((product) =>
        product.price < this.state.maxValue)
    }
    if (this.state.minValue) {
      orderedList = orderedList.filter((product) =>
        product.price > this.state.minValue)
    }
    if (this.state.inputName) {
      orderedList = orderedList.filter(product => {
        const productName = product.name.toLowerCase()
        return productName.indexOf(this.state.inputName.toLowerCase()) > -1
      })
    }

    console.log(this.state.productList)
    const renderedProductList = orderedList.map((product) => {
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
    console.log(this.state.inputName, this.state.maxValue, this.state.minValue, this.state.category)
    return (
      <div>
        {this.state.productDetailsDiv ?
          <ProdutoDetalhes
            productName={this.state.productName}
            productPrice={this.state.productPrice}
            productDescription={this.state.productDescription}
            productImages={this.state.productImages}
            onClickBack={this.changeRender}
          /> :
          <div>
            <Filter
              changeInputName={this.changeInputName}
              changeInputMin={this.changeInputMin}
              changeInputMax={this.changeInputMax}
              changeOrder={this.changeOrder}
              changeCategory={this.changeCategory}
              productList={this.state.productList}
            />
            <StoreContainer>
              <ListContainer >{renderedProductList}</ListContainer>
            </StoreContainer>
          </div>}
      </div>
    );
  }
}
