import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button, { LINK_TYPE, DANGER_STYLE } from "../../Button/Button";
import ButtonGroup from "../../ButtonGroup/ButtonGroup";

const PopoverContainer = styled.div`
  height: 2rem;
  background-color: #ffffff;
  border: ${props => `1px solid ${props.theme.colors.background.default}`};
  border-radius: 0.25rem;
  position: absolute;
  top: ${props => `${props.top}px`};
  left: ${props => `${props.left}px`};
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

class Popover extends Component {
  constructor(props) {
    super(props);

    this.renderButtons = this.renderButtons.bind(this);
  }

  renderButtons() {
    const {
      shouldRenderEditButtons,
      editBtnRef,
      deleteBtnRef,
      annotateBtnRef,
      onEdit,
      onDelete,
      onAnnotate
    } = this.props;
    let buttons;
    if (shouldRenderEditButtons) {
      buttons = (
        <ButtonGroup left>
          <ButtonGroup.Item>
            <Button
              type="button"
              buttonType={LINK_TYPE}
              ref={editBtnRef}
              onClick={onEdit}
            >
              Edit
            </Button>
          </ButtonGroup.Item>
          <ButtonGroup.Item>
            <Button
              type="button"
              buttonType={LINK_TYPE}
              buttonStyle={DANGER_STYLE}
              ref={deleteBtnRef}
              onClick={onDelete}
            >
              Delete
            </Button>
          </ButtonGroup.Item>
        </ButtonGroup>
      );
    } else {
      buttons = (
        <ButtonGroup left>
          <ButtonGroup.Item>
            <Button
              buttonType={LINK_TYPE}
              type="button"
              onClick={onAnnotate}
              ref={annotateBtnRef}
            >
              Annotate
            </Button>
          </ButtonGroup.Item>
        </ButtonGroup>
      );
    }

    return buttons;
  }

  render() {
    const { top, left } = this.props;

    return (
      <PopoverContainer top={top} left={left}>
        {this.renderButtons()}
      </PopoverContainer>
    );
  }
}

Popover.propTypes = {
  shouldRenderEditButtons: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAnnotate: PropTypes.func.isRequired,
  editBtnRef: PropTypes.func.isRequired,
  deleteBtnRef: PropTypes.func.isRequired,
  annotateBtnRef: PropTypes.func.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired
};

export default Popover;
