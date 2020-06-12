import React from 'react'
import axios from 'axios'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core'
import ShoppingCart from '../ShoppingCart'
import {
  Main,
  Product,
  ButtonAddCart,
  ButtonBack
} from './style'

const myTheme = createMuiTheme ({
  palette: {
    primary: {
      main: '#12C0D2'
    },
    secondary: {
      main: '#FFC81A'
    }
  }
})

export default class ProdutoDetalhes extends React.Component {
  state = {
    productList: '',
    cartDiv: true
  }

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

  onClickAddToCart = () => {

  }

  render() {
    console.log(this.state.productImgs)
    return(
      <MuiThemeProvider theme={myTheme}>
      <Main>
        {this.state.cartDiv ?
        <ShoppingCart /> :
        <div>
          <Product>
            <img alt='produto' src={this.props.productImages} />
            <div>
              <h2>{this.props.productName}</h2>
              <p>{this.props.productDescription}</p>
              <p>R$ {this.props.productPrice}</p>
            </div>
          </Product>
          <ButtonAddCart onCLick={this.onClickAddToCart} size='medium' variant='extendedFab' color='secondary'>colocar no carrinho</ButtonAddCart>
          <ButtonBack onClick={this.props.onClickBack} variant='text' color='primary'>escolher mais produtos</ButtonBack>
        </div>}
      </Main>
      </MuiThemeProvider>
    )
  }
}