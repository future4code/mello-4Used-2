import styled from 'styled-components'
import Button from '@material-ui/core/Button'

export const Main = styled.main`
  display: grid;
  grid-template-columns: 120px 350px 350px auto;
  grid-template-rows: 80px 120px 180px auto;
`

export const Header = styled.div`
  grid-column: 1/5;
  text-align: center;
  background-color: #12C0D2;
`
export const Product = styled.div`
  display: grid;
  grid-column: 2/4;
  grid-row: 2/3;
  >div {
    h2 {
      margin: 0px;
    }
    p { 
      width: 300px;
    }
    grid-column: 3/4;
    font-size: 20px;
    align-self: start;
    justify-self: left;
  }
  >img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 5%;
  }
`
export const ButtonAddCart = styled(Button)`
  font-weight: 700;
  grid-column: 3/4;
  grid-row: 3/4;
  align-self: end;
`
export const ButtonBack = styled(Button)`
  grid-row: 4/5;
  grid-column: 3/4;
  justify-self: center;
  margin-top: 30px;
`