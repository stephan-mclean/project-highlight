import styled from "styled-components";

const ButtonGroupItem = styled.div``;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: ${props => (props.left ? "flex-start" : "flex-end")};

  ${ButtonGroupItem} {
    margin-right: 0.5rem;

    :last-child {
      margin-right: ${props => (props.right ? 0 : "0.5rem")};
    }
  }
`;

ButtonGroup.Item = ButtonGroupItem;

export default ButtonGroup;
