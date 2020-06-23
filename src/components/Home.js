import React from "react";
import styled from "styled-components";

export const HomeContainer = styled.div`
  width: 100%;
`;

export const CallToActionContainer = styled.div`
  width: 40%;
  margin: 0;
  padding: 0;
  position: relative;
  top: 5vh;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const H1 = styled.h1`
  font-size: 40px;
  font-weight: lighter;
`;

export const Button = styled.button`
  width: 75%;
  margin: 50px 0 0 0;
  padding: 10px;
  border: unset;
  border-radius: 25px;
  outline: unset;
  cursor: pointer;
  font-size: x-large;
  font-weight: bold;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.4);

  &:first-of-type {
    background: #0000ff;
    color: #fff;

    &:hover {
      background: #a3b6ff;
    }
  }

  &:last-of-type {
    background: #ffff00;
    color: #000;

    &:hover {
      background: #ffcc00;
    }
  }
`;

export const Img = styled.img`
  position: absolute;
  right: 5em;
  bottom: 2em;
`;

export const Home = (props) => {
  return (
    <HomeContainer>
      <CallToActionContainer>
        <H1>comprar e vender usados de forma easy e cool!</H1>
        <Button onClick={props.renderSalesScreenProps}>quero vender</Button>
        <Button onClick={props.renderStoreScreenProps}>quero comprar</Button>
      </CallToActionContainer>

      <div>
        <Img src="https://picsum.photos/400/400" alt="" />
      </div>
    </HomeContainer>
  );
};
