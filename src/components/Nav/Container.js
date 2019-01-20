import styled from "styled-components";

const getNavBorder = props => {
  return `1px solid ${props.theme.colors.foreground.quintenary}`;
};

export default styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 4rem;
  background-color: ${props => props.theme.colors.background.light};
  border-bottom: ${props => (props.top ? getNavBorder(props) : "none")};
  border-top: ${props => (props.bottom ? getNavBorder(props) : "none")};
`;
