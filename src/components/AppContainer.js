import React, { Component } from 'react'
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
