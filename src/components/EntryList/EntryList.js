import React, { Fragment } from "react";
import styled from "styled-components";
import Entry from "../Entry/Entry";

const EntryContainer = styled.div`
  margin-bottom: 1rem;
`;

export default ({ entries }) => {
  if (entries && entries.length) {
    return (
      <Fragment>
        {entries.map(entry => {
          return (
            <EntryContainer key={entry.id}>
              <Entry {...entry} />
            </EntryContainer>
          );
        })}
      </Fragment>
    );
  }

  return <Fragment>No entries</Fragment>;
};
