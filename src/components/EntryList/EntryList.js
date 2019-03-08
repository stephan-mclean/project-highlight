import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getEntries, removeEntry } from "../../actions";
import styled from "styled-components";
import Entry from "../Entry/Entry";
import ContentLoader from "../ContentLoader/ContentLoader";

const EntryContainer = styled.div`
  margin-bottom: 1rem;
`;

class EntryList extends Component {
  constructor(props) {
    super(props);

    this.renderEntries = this.renderEntries.bind(this);

    this.props.getEntries();
  }

  onDeleteEntry(entry) {
    this.props.removeEntry(entry);
  }

  renderEntries() {
    const entries = this.props.entries.list;

    if (entries && entries.length) {
      return (
        <Fragment>
          {entries.map((entry, index) => {
            return (
              <EntryContainer
                key={entry.id}
                data-cy={`entry-list-entry-${index}`}
              >
                <Entry {...entry} onDelete={() => this.onDeleteEntry(entry)} />
              </EntryContainer>
            );
          })}
        </Fragment>
      );
    }

    return <Fragment>No entries</Fragment>;
  }

  render() {
    return (
      <ContentLoader
        loading={this.props.entries.loading}
        error={this.props.entries.error}
        onLoad={this.renderEntries}
      />
    );
  }
}

const mapStateToProps = ({ entries }, ownProps) => {
  return {
    entries: {
      ...entries,
      list: entries.list
        ? entries.list
            .sort((a, b) => {
              const firstEntryDate = new Date(a.createdDate);
              const secondEntryDate = new Date(b.createdDate);

              return secondEntryDate - firstEntryDate;
            })
            .filter(entry => {
              return (
                !ownProps.filterByBookID ||
                entry.book.id === ownProps.filterByBookID
              );
            })
        : []
    }
  };
};

export default connect(
  mapStateToProps,
  { getEntries, removeEntry }
)(EntryList);
