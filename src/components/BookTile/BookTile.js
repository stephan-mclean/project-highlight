import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Caption, S2 } from "../Fonts/Fonts";

const BookTileContainer = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.foreground.secondary};
  display: inline-block;
  margin-bottom: 1rem;
`;

const CoverImg = styled.img`
  width: 6rem;
  height: 8rem;
  display: block;
`;

const CoverImgPlaceholder = styled.div`
  width: 6rem;
  height: 8rem;
  background: ${props => props.theme.colors.background.default};
`;

const Title = styled(S2)`
  text-align: left;
  padding-left: 0.5rem;
  padding-top: 0.5rem;
  color: ${props => props.theme.colors.background.tertiary};
`;

const BookTile = ({ title, coverSrc, numEntries, onClick }) => (
  <BookTileContainer onClick={onClick}>
    {coverSrc && <CoverImg src={coverSrc} />}
    {!coverSrc && (
      <CoverImgPlaceholder>
        <Title>{title}</Title>
      </CoverImgPlaceholder>
    )}
    <Caption>
      {numEntries === 0 && "No entries"}
      {numEntries === 1 && "1 entry"}
      {numEntries > 1 && `${numEntries} entries`}
    </Caption>
  </BookTileContainer>
);

BookTile.propTypes = {
  title: PropTypes.string.isRequired,
  coverSrc: PropTypes.string,
  numEntries: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onClick: PropTypes.func.isRequired
};

const StyledBookTileGrid = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

export default BookTile;
export const BookTileGrid = StyledBookTileGrid;
