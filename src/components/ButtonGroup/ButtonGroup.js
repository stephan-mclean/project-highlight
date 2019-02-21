import styled from "styled-components";

const ButtonGroupItem = styled.div``;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: ${props => (props.left ? "flex-start" : "flex-end")};
  margin-bottom: 1rem;

  ${ButtonGroupItem} {
    margin-right: 0.5rem;

    :last-child {
      margin-right: 0;
    }
  }
`;

const VerticalBtnGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  ${ButtonGroupItem} {
    margin-bottom: 1rem;

    :last-child {
      margin-bottom: none;
    }
  }
`;

ButtonGroup.Item = ButtonGroupItem;
VerticalBtnGroup.Item = ButtonGroupItem;

export default ButtonGroup;
export const VerticalButtonGroup = VerticalBtnGroup;
