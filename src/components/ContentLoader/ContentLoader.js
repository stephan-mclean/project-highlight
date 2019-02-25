import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

class ContentLoader extends Component {
  render() {
    // Loading not initialized yet.
    if (this.props.loading === undefined || this.props.error === undefined) {
      return null;
    }

    if (this.props.loading) {
      console.log("content loader loading");
      return (
        <LoadingContainer>
          <FontAwesomeIcon icon="spinner" spin />
        </LoadingContainer>
      );
    } else if (this.props.error) {
      console.log("content loader error");
      return this.props.onError();
    } else {
      console.log("content loader onload");
      return this.props.onLoad();
    }
  }
}

ContentLoader.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  onLoad: PropTypes.func.isRequired,
  onError: PropTypes.func
};

ContentLoader.defaultProps = {
  onError: () => <Fragment>ERROR</Fragment>
};

export default ContentLoader;
