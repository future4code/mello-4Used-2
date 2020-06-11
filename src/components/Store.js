import React from "react";
import styled from "styled-components";

import { Card } from "./Card";

export const StoreContainer = styled.div`
  width: 100%;
  margin: 0 0 50px 0;
`;

export const ListContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 25px;
`;

export class Store extends React.Component {
  state = {
    productList: [
      {
        id: 1,
        image: "https://picsum.photos/200/200?a=1",
        description: "Imagem do produto 1",
        value: 199,
        title: "Item A",
        brand: "Fake",
      },
      {
        id: 2,
        image: "https://picsum.photos/200/200?a=2",
        description: "Imagem do produto 2",
        value: 55,
        title: "Item B",
        brand: "Fake",
      },
      {
        id: 3,
        image: "https://picsum.photos/200/200?a=3",
        description: "Imagem do produto 3",
        value: 99,
        title: "Item C",
        brand: "Fake",
      },
      {
        id: 4,
        image: "https://picsum.photos/200/200?a=4",
        description: "Imagem do produto 4",
        value: 80,
        title: "Item D",
        brand: "Fake",
      },
      {
        id: 5,
        image: "https://picsum.photos/200/200?a=5",
        description: "Imagem do produto 5",
        value: 40,
        title: "Item E",
        brand: "Fake",
      },
      {
        id: 6,
        image: "https://picsum.photos/200/200?a=6",
        description: "Imagem do produto 6",
        value: 499,
        title: "Item F",
        brand: "Fake",
      },
      {
        id: 7,
        image: "https://picsum.photos/200/200?a=7",
        description: "Imagem do produto 7",
        value: 501,
        title: "Item G",
        brand: "Fake",
      },
      {
        id: 8,
        image: "https://picsum.photos/200/200?a=8",
        description: "Imagem do produto 8",
        value: 210,
        title: "Item H",
        brand: "Fake",
      },
    ],
  };

  render() {
    const renderedProductList = this.state.productList.map((product) => {
      return (
        <Card
          key={product.id}
          imageProps={product.image}
          descriptionProps={product.description}
          valueProps={product.value}
          titleProps={product.title}
          brandProps={product.brand}
        />
      );
    });

    return (
      <StoreContainer>
        <ListContainer>{renderedProductList}</ListContainer>
      </StoreContainer>
    );
  }
}
