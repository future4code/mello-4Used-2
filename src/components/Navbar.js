import React from "react";
import styled from "styled-components";

export const NavbarContainer = styled.div`
  width: 100%;
  height: 100px;
  margin: 0 0 40px 0;
  padding: 0 5em;
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0000ff;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.4);
`;
export const Menu = styled.div`
  width: 35%;
  display: flex;
  justify-content: space-between;
`;

export const Link = styled.button`
  margin: 0;
  padding: 0;
  border: unset;
  outline: unset;
  cursor: pointer;
  font-size: x-large;
  font-weight: bold;
  background: transparent;
  color: #fff;

  &:hover {
    color: #a3b6ff;
  }
`;

export const Navbar = (props) => {
  return (
    <NavbarContainer>
      <div>
        <img src="https://picsum.photos/50/50" alt="Logo" />
      </div>

      <Menu>
        <Link onClick={props.renderHomeScreenProps}>home</Link>
        <Link onClick={props.renderSalesScreenProps}>vender</Link>
        <Link onClick={props.renderStoreScreenProps}>comprar</Link>
      </Menu>
    </NavbarContainer>
  );
};
