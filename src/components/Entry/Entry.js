import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button, { LINK_TYPE, DANGER_STYLE } from "../Button/Button";
import { Overline, S1, B1, B2 } from "../Fonts/Fonts";
import TextHighlighter from "../Annotater/text/TextHighlighter";

const Container = styled.div`
  border: ${props => `1px solid ${props.theme.colors.background.default}`};
`;

const BookAndDateContainer = styled.div`
  min-height: 2rem;
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
  book,
  page,
  createdDate,
  passage,
  notes,
  onEdit,
  onDelete
}) => (
  <Container>
    <BookAndDateContainer>
      {book && (
        <BookText>
          {book.title}
          {page && <span>#{page}</span>}
        </BookText>
      )}

      <DateText>{createdDate}</DateText>
    </BookAndDateContainer>
    <MainContainer>
      {passage && (
        <TextHighlighter
          text={passage.text}
          renderTextBy={(ref, text) => (
            <PassageText ref={ref}>{text}</PassageText>
          )}
          annotations={passage.annotations}
        />
      )}
      <NotesTitle>Notes</NotesTitle>
      <NotesText>{notes}</NotesText>

      <ButtonsContainer>
        <StyledEntryButton onClick={onEdit} buttonType={LINK_TYPE}>
          Edit
        </StyledEntryButton>
        <StyledEntryButton
          onClick={onDelete}
          buttonType={LINK_TYPE}
          buttonStyle={DANGER_STYLE}
        >
          Delete
        </StyledEntryButton>
      </ButtonsContainer>
    </MainContainer>
  </Container>
);

Entry.propTypes = {
  book: PropTypes.object,
  page: PropTypes.string,
  createdDate: PropTypes.string,
  passage: PropTypes.object,
  notes: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

export default Entry;
