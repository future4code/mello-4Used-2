import React from 'react'
import axios from 'axios'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import {
  Main,
  Header,
  Product,
  MyButton
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
    productName: '',
    productImages: [],
    productDescription: '',
    productPrice: '',
    productId: 'cKkI4jW5Dxana5OrPZyK'
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

  render() {
    console.log(this.state.productImgs)
    return(
      <MuiThemeProvider theme={myTheme}>
      <Main>
          <Header>
            <h2>header</h2>
          </Header>
          <Product>
            <img alt='produto' src={this.state.productImages} />
            <div>
              <h2>{this.state.productName}</h2>
              <p>{this.state.productDescription}</p>
              <p>R$ {this.state.productPrice}</p>
            </div>
          </Product>
          
            <MyButton size='medium' variant='extendedFab' color='secondary'>colocar no carrinho</MyButton>
          
        </Main>
      </MuiThemeProvider>
    )
  }
}