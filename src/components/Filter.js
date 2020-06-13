import React, { Component } from 'react'
import axios from 'axios'

import '../Filter.css'

class Filter extends React.Component {

  render() {

    return (

      <div>
        <div className="inputFilter">

          <input placeholder="busca por nome" id="inputName" onChange={this.props.changeInputName} />
          <input placeholder="valor máximo" type="number" id="maxValue" onChange={this.props.changeInputMax} />
          <input placeholder="valor mínimo" type="number" id="minValue" onChange={this.props.changeInputMin} />

          <select
            onChange={this.props.changeOrder}>
            <option value="" >Escolha seu filtro</option>

            <option> - Por preço - </option>
            <option value="crescente" >ordem crescente</option>
            <option value="decrescente" >ordem decrescente</option>

            <option> - Por Nome - </option>
            <option value="a-z"> A - Z  </option>
            <option value="z-a">  Z - A  </option>

            <option> - Categorias - </option>
            <option value="categoriaAZ">A - Z </option>
            <option value="categoriaZA">Z - A</option>
          </select>

          <select
            onChange={this.props.changeCategory}
          >
            <option value="">Escolha uma categoria</option>
            {this.props.productList
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
      </div>

    )
  }
}


export default Filter