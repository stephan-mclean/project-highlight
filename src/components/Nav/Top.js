import React from "react";
import styled from "styled-components";
import NavContainer from "./Container";
import { NavItem } from "./NavItem";
import { H5 } from "../Fonts/Fonts";

const TopNavHeader = styled(H5)`
  margin-left: auto;
  margin-right: auto;
`;

const TopNavRightNavItem = styled(NavItem)`
  position: absolute;
  right: 1rem;
`;

const TopNav = props => <NavContainer top {...props} />;

export { TopNav, TopNavHeader, TopNavRightNavItem };
