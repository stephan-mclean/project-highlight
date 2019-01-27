import React, { Fragment } from "react";
import Entry from "../Entry/Entry";

export default ({ entries }) => {
  if (entries && entries.length) {
    return (
      <Fragment>
        {entries.map(entry => {
          return <Entry {...entry} key={entry.id} />;
        })}
      </Fragment>
    );
  }

  return <Fragment>No entries</Fragment>;
};
