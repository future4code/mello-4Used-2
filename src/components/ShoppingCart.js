import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import DeleteFromCart from "@material-ui/icons/Delete";

const CartContainer = styled.div`
  border: 1px solid #a1a0d2;
`;
const ProductPhoto = styled.img`
  margin: 20px;
`;

const MyDeleteFromCart = styled(DeleteFromCart)`
  cursor: pointer;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 20px;
`;
let productPriceTotal;
const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductInfo = styled.p`
  font-size: 20px;
  margin-top: -1px;
  margin-bottom: -1px;
`;

const ProductContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #a1a0d2;
`;

class ShoppingCart extends Component {
  state = {
    products: [],
    cartList: [],
  };

  addToCart = (product) => {
    let productToAddToCart = product;
    this.setState({ cartList: [...this.state.cartList, productToAddToCart] });
  };

  deletefromCart = (productId) => {
    const listOfProductsFromCart = this.state.cartList.filter((product) => {
      if (productId === product.id) {
        return false;
      } else {
        return true;
      }
    });
    this.setState({ cartList: listOfProductsFromCart });
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
    const productPrice = this.state.cartList.map((product) => {
      return Number(product.price);
    });

    productPriceTotal = productPrice.reduce(
      (productPriceTotal, (productPrice) => productPriceTotal + productPrice, 0)
    );

    const cartTotalPrice =
      this.state.cartList.length !== 0 ? (
        <div>
          <p>{productPriceTotal}</p>
        </div>
      ) : (
        <div></div>
      );

    return (
      <div>
        {this.state.products.map((product) => {
          return (
            <div>
              <p> {product.name}</p>
              <p>
                {"R$ "}
                {product.price}
              </p>

              <button onClick={() => this.addToCart(product)}>
                Adicionar ao Carrinho
              </button>
            </div>
          );
        })}
        <div>
          <h1>Carrinho </h1>
          <CartContainer>
            {this.state.cartList.map((product) => {
              return (
                <ProductContainer>
                  <ProductPhoto src="https://picsum.photos/150" alt="product" />{" "}
                  <ProductInfoContainer>
                    {" "}
                    <ProductInfo> {product.name}</ProductInfo>
                    <ProductInfo>
                      {"R$ "}
                      {product.price}
                    </ProductInfo>
                    <ProductInfo>{product.paymentMethod}</ProductInfo>
                  </ProductInfoContainer>
                  <MyDeleteFromCart
                    onClick={() => this.deletefromCart(product.id)}
                  />
                </ProductContainer>
              );
            })}
          </CartContainer>
          <div>{cartTotalPrice}</div>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
