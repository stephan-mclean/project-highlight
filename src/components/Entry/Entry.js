import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button, { LINK_TYPE, DANGER_STYLE } from "../Button/Button";
import { Overline, S1, B1, B2 } from "../Fonts/Fonts";

const Container = styled.div`
  width: 100%;
  border: ${props => `1px solid ${props.theme.colors.background.default}`};
`;

const BookAndDateContainer = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.background.default};
`;

const BookText = styled(Overline)`
  margin-left: 0.5rem;
  color: ${props => props.theme.colors.background.tertiary};
`;

const DateText = styled(Overline)`
  margin-right: 0.5rem;
  color: ${props => props.theme.colors.background.tertiary};
`;

const MainContainer = styled.div`
  padding: 0.5rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
`;

const StyledEntryButton = styled(Button)`
  flex: 1;
`;

const PassageText = styled(B1)`
  margin-bottom: 0.5rem;
`;

const NotesTitle = styled(S1)`
  margin-bottom: 0.25rem;
`;

const NotesText = styled(B2)`
  color: ${props => props.theme.colors.foreground.secondary};
  margin-bottom: 2rem;
`;

const Entry = ({
  bookTitle,
  page,
  createdDate,
  passage,
  notes,
  onEdit,
  onDelete
}) => (
  <Container>
    <BookAndDateContainer>
      <BookText>
        {bookTitle}#{page}
      </BookText>
      <DateText>{createdDate}</DateText>
    </BookAndDateContainer>
    <MainContainer>
      <PassageText>"{passage.text}"</PassageText>
      <NotesTitle>Notes</NotesTitle>
      <NotesText>{notes}</NotesText>

      <ButtonsContainer>
        <StyledEntryButton onClick={onEdit} type={LINK_TYPE}>
          Edit
        </StyledEntryButton>
        <StyledEntryButton
          onClick={onDelete}
          type={LINK_TYPE}
          buttonStyle={DANGER_STYLE}
        >
          Delete
        </StyledEntryButton>
      </ButtonsContainer>
    </MainContainer>
  </Container>
);

Entry.propTypes = {
  bookTitle: PropTypes.string,
  page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  createdDate: PropTypes.string,
  passage: PropTypes.object,
  notes: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

export default Entry;
