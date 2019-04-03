import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { B1 } from "../Fonts/Fonts";
import Button, { LINK_TYPE } from "../Button/Button";

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  color: ${props => props.theme.colors.foreground.default};
`;

class ContentLoader extends Component {
  render() {
    const { loading, error, onError, onLoad, onRetry } = this.props;

    // Loading not initialized yet.
    if (loading === undefined || error === undefined) {
      return null;
    }

    if (loading) {
      console.log("content loader loading");
      return (
        <LoadingContainer>
          <FontAwesomeIcon icon="spinner" spin />
        </LoadingContainer>
      );
    } else if (error) {
      console.log("content loader error");
      return onError(onRetry);
    } else {
      console.log("content loader onload");
      return onLoad();
    }
  }
}

ContentLoader.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  onLoad: PropTypes.func.isRequired,
  onError: PropTypes.func,
  onRetry: PropTypes.func
};

ContentLoader.defaultProps = {
  onError: retry => (
    <LoadingContainer>
      <FontAwesomeIcon icon="exclamation-circle" />
      <B1>
        An error has ocurred{" "}
        {retry && (
          <Button type="button" buttonType={LINK_TYPE} onClick={retry}>
            Retry
          </Button>
        )}
      </B1>
    </LoadingContainer>
  )
};

export default ContentLoader;
