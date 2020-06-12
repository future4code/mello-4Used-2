import React, { Component } from "react";
import axios from "axios";
import Filter from "../Filter.css";

class Filter extends React.Component {
  state = {
    products: [],
    maxValue: 1000,
    minValue: 0,
    inputName: "",
    order: "",
    category: "",
  };

  /* Filtros trabalho */
  /* FILTROS E ORDENAÇÕES */
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
  getProducts = () => {
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/fourUsedTwo/products",
        {}
      )
      .then((response) => {
        console.log(response.data.products);
        this.setState({ products: response.data.products });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount = () => {
    this.getProducts();
  };
  changeOrder = (event) => {
    this.setState({ order: event.target.value });
  };
  changeCategory = (event) => {
    this.setState({ category: event.target.value });
  };
  render() {
    let orderedList = this.state.products;
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
    return (
      <div>
        <div className="inputFilter">
          <input
            placeholder="busca por nome"
            id="inputName"
            onChange={this.changeInputName}
          />
          <input
            placeholder="valor máximo"
            type="number"
            id="maxValue"
            onChange={this.changeInputMax}
          />
          <input
            placeholder="valor mínimo"
            type="number"
            id="minValue"
            onChange={this.changeInputMin}
          />
          <select value={this.state.order} onChange={this.changeOrder}>
            <option value="">Escolha seu filtro</option>
            <option> - Por preço - </option>
            <option value="crescente">ordem crescente</option>
            <option value="decrescente">ordem decrescente</option>
            <option> - Por Nome - </option>
            <option value="a-z"> A - Z </option>
            <option value="z-a"> Z - A </option>
            <option> - Categorias - </option>
            <option value="categoriaAZ">A - Z </option>
            <option value="categoriaZA">Z - A</option>
          </select>
          <select value={this.state.category} onChange={this.changeCategory}>
            <option value="">Escolha uma categoria</option>
            {this.state.products
              .filter(
                (product, index, array) =>
                  array.findIndex(
                    (item) => item.category === product.category
                  ) === index
              )
              .map((product) => (
                <option value={product.category}>{product.category}</option>
              ))}
          </select>
        </div>
        <div>
          {orderedList.map((product) => {
            return (
              <div>
                <p>{product.name}</p>
                <p>R${product.price}</p>
                <p>{product.category}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Filter;
