import React, { Component } from 'react'
import ProdutoDetalhes from './ProdutoDetalhes/ProdutoDetalhes'

import CreateProductToSell from "./CreateProductToSell"
import ShoppingCart from './ShoppingCart'


export class AppContainer extends Component {
  state = {
  }
  render() {

    return (
      <div>
        <ShoppingCart />
      </div>
    )
  }
}
