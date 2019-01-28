import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { S1, S2, Caption } from "../Fonts/Fonts";

const CoverImg = styled.img`
  width: 4rem;
  height: 5rem;
  float: left;
  margin-right: 1rem;
`;

const Title = styled(S1)`
  margin-bottom: 0.25rem;
`;

const Subtitle = styled(S2)`
  color: ${props => props.theme.colors.foreground.secondary};
  margin-bottom: 0.5rem;
`;

const BookSummary = ({
  coverSrc,
  title,
  subtitle,
  description,
  showDescription
}) => (
  <Fragment>
    <CoverImg src={coverSrc} />
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
    {showDescription && <Caption>{description}</Caption>}
  </Fragment>
);

BookSummary.propTypes = {
  coverSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  showDescription: PropTypes.bool
};

BookSummary.defaultProps = {
  showDescription: true
};

export default BookSummary;
