import React from "react";
import styled from "styled-components";
import NavContainer from "./Container";

const StyledBottomNav = styled(NavContainer)`
  justify-content: space-around;
`;

const BottomNav = props => <StyledBottomNav bottom {...props} />;

export { BottomNav };
