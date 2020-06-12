import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const InputPrice = styled.input`
  text-align: right;
`;

class CreateProductToSell extends Component {
  state = {
    productCategory: "",
    productName: "",
    productDescription: "",
    productNewOrUsed: "",
    productPrice: "",
    productInstallments: 1,
    productPaymentMethod: "",
    productLink: "",
  };

  //Seta o estado da categoria de produto conforme o value das options
  handleProductCategory = (event) => {
    this.setState({ productCategory: event.target.value });
  };

  handleProductNameInput = (event) => {
    this.setState({ productName: event.target.value });
  };

  handleDescriptionInput = (event) => {
    this.setState({ productDescription: event.target.value });
  };

  handleNewUsed = (event) => {
    this.setState({ productNewOrUsed: event.target.value });
  };

  handleProductPriceInput = (event) => {
    this.setState({ productPrice: event.target.value });
  };

  handleProductPaymentMethod = (event) => {
    if (this.state.productPaymentMethod === "Cartão de Crédito") {
      this.setState({ productInstallments: 1 });
    }

    this.setState({ productPaymentMethod: event.target.value });
  };

  handleProductInstallmentsSelect = (event) => {
    this.setState({ productInstallments: event.target.value });
  };
  handleProductLinkInput = (event) => {
    this.setState({ productLink: event.target.value });
  };

  resetInstallments = (event) => {
    this.setState({ productInstallments: 1 });
  };

  createProduct = () => {
    const body = {
      name: this.state.productName,
      description: this.state.productDescription,
      price: Number(this.state.productPrice),
      paymentMethod: this.state.productPaymentMethod,
      category: this.state.productCategory,
      photos: [this.state.productLink],
      installments: Number(this.state.productInstallments),
    };
    axios
      .post(
        "https://us-central1-labenu-apis.cloudfunctions.net/fourUsedTwo/products",
        body,
        {}
      )
      .then((response) => {
        console.log(response.config.data);
        alert("Produto Adicionado com sucesso!");
        this.setState({
          productName: "",
          productDescription: "",
          productPrice: "",
          productCategory: "",
          productLink: "",
          productPaymentMethod: "",
        });
      })
      .catch((error) => {
        console.log(body);
      });
  };

  render() {
    const installments = this.state.productPaymentMethod ===
      "Cartão de Crédito" && (
      <div>
        <select
          onChange={this.handleProductInstallmentsSelect}
          value={this.state.productInstallments}
        >
          <option value={1}> 1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
          <option value={11}>11</option>
          <option value={12}>12</option>
        </select>
      </div>
    );

    return (
      <div>
        <h1>Crie seu produto abaixo</h1>
        <p>Qual o nome do seu produto?</p>
        <input
          value={this.state.productName}
          onChange={this.handleProductNameInput}
        />
        <p>Qual a categoria do seu produto?</p>
        <select
          onChange={this.handleProductCategory}
          value={this.state.productCategory}
        >
          <option value=""></option>
          <option value="Roupa">Roupa</option>
          <option value="Acessório">Acessório</option>
          <option value="Eletrônico">Eletrônico</option>
          <option value="calçado">Calçado</option>
        </select>
        <p>Descrição do Produto</p>
        <input
          value={this.state.productDescription}
          onChange={this.handleDescriptionInput}
        />
        <div>
          <input
            type="radio"
            name="new-used"
            id="new-radio"
            value="Novo"
            onChange={this.handleNewUsed}
          />
          <label htmlFor="new-radio">Novo</label>
          <input
            type="radio"
            id="used-radio"
            name="new-used"
            value="Usado"
            onChange={this.handleNewUsed}
          />
          <label htmlFor="used-radio">Usado</label>
        </div>
        <p>Valor do Produto</p>
        <InputPrice
          type="number"
          value={this.state.productPrice}
          onChange={this.handleProductPriceInput}
        ></InputPrice>
        <span> R$</span>
        <p>Forma de Pagamento</p>
        <div>
          <select
            onChange={this.handleProductPaymentMethod}
            value={this.state.productPaymentMethod}
          >
            <option value=""></option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Cartão de Débito">Cartão de Débito</option>
            <option value="Boleto">Boleto</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>
          <div>{installments}</div>
        </div>
        <p>Link para imagem</p>
        <input
          value={this.state.productLink}
          onChange={this.handleProductLinkInput}
        ></input>
        <button onClick={this.createProduct}>Criar Produto</button>
      </div>
    );
  }
}

export default CreateProductToSell;
