import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Caption } from "../Fonts/Fonts";

const BookTileContainer = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.foreground.secondary};
  display: inline-block;
  margin-right: 0.5rem;
`;

const CoverImg = styled.img`
  width: 6rem;
  height: 8rem;
  display: block;
`;

const BookTile = ({ coverSrc, numEntries, onClick }) => (
  <BookTileContainer onClick={onClick}>
    <CoverImg src={coverSrc} />
    <Caption>
      {numEntries === 0 && "No entries"}
      {numEntries === 1 && "1 entry"}
      {numEntries > 1 && `${numEntries} entries`}
    </Caption>
  </BookTileContainer>
);

BookTile.propTypes = {
  coverSrc: PropTypes.string.isRequired,
  numEntries: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onClick: PropTypes.func.isRequired
};

const StyledBookTileGrid = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export default BookTile;
export const BookTileGrid = StyledBookTileGrid;
