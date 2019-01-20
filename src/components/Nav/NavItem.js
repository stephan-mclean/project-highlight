import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Overline } from "../Fonts/Fonts";

const NavItemContainer = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.foreground.secondary};
`;

const NavItemLabel = styled(Overline)`
  display: block;
`;

const NavItem = props => (
  <NavItemContainer {...props}>
    {props.icon && <FontAwesomeIcon icon={props.icon} />}
    {props.label && <NavItemLabel>{props.label}</NavItemLabel>}
  </NavItemContainer>
);

export { NavItem };
