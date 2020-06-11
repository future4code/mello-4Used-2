import React, { Component } from "react";
import axios from "axios";

class ShoppingCart extends Component {
  state = {
    products: [],
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

  render() {
    return (
      <div>
        {this.state.products.map((product) => {
          return (
            <p>
              {product.name} - {product.price}{"R$ "}
            </p>
          );
        })}
      </div>
    );
  }
}

export default ShoppingCart;
