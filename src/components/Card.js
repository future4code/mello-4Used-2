import React from "react";
import styled from "styled-components";
export const CardContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 5px;
  border: 1px solid #C8C8C8;
  border-radius: 10px;
  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.4);
`;
export const ClickableCard = styled.button`
  margin: 0;
  padding: 0;
  border: unset;
  outline: unset;
  cursor: pointer;
  background: transparent;
`;
export const Img = styled.img`
  width: 100%;
  border-radius: 5px;
`;
export const Card = (props) => {
  return (
    <CardContainer>
      <ClickableCard onClick={props.renderProductDetailsScreenProps}>
        <div>
          <Img src={props.imageProps} alt={props.descriptionProps} />
        </div>
        <div>
          <p>R${props.valueProps}</p>
          <h4>{props.titleProps}</h4>
          <p>{props.brandProps}</p>
        </div>
      </ClickableCard>
    </CardContainer>
  );
};
