import styled from "styled-components";

const getNavBorder = props => {
  return `1px solid ${props.theme.colors.foreground.quintenary}`;
};

export default styled.div`
  position: sticky;
  top: ${props => (props.top ? 0 : "auto")};
  bottom: ${props => (props.top ? "auto" : 0)};
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 4rem;
  background-color: ${props => props.theme.colors.background.light};
  border-bottom: ${props => (props.top ? getNavBorder(props) : "none")};
  border-top: ${props => (props.bottom ? getNavBorder(props) : "none")};
  z-index: 9999999;
`;
