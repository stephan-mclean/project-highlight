import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { searchBooks } from "../../actions";
import Input from "../../components/Input/Input";
import Button, {
  DEFAULT_STYLE,
  ACCENT_STYLE,
  OUTLINE_TYPE
} from "../../components/Button/Button";

class NewBookSearch extends Component {
  constructor(props) {
    super(props);

    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.renderSearchForm = this.renderSearchForm.bind(this);
    this.renderSearchResults = this.renderSearchResults.bind(this);
    this.backToSearch = this.backToSearch.bind(this);

    this.state = {
      // Initially show the search form
      shouldShowSearchForm: true
    };
  }

  componentDidUpdate() {
    console.log("book search update", this.props);
  }

  onSearchSubmit(values) {
    this.props.searchBooks(values);
    this.setState({ shouldShowSearchForm: false });
  }

  renderSearchForm() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSearchSubmit)}>
        <Field name="author" label="Author" type="text" component={Input} />
        <button type="submit">Submit</button>
      </form>
    );
  }

  backToSearch() {
    this.setState({ shouldShowSearchForm: true });
  }

  renderSearchResults() {
    return (
      <Fragment>
        <Button
          type={OUTLINE_TYPE}
          buttonStyle={DEFAULT_STYLE}
          onClick={this.backToSearch}
        >
          Back
        </Button>
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        {this.state.shouldShowSearchForm && this.renderSearchForm()}
        {!this.state.shouldShowSearchForm && this.renderSearchResults()}
      </Fragment>
    );
  }
}

NewBookSearch.propTypes = {
  onAddBook: PropTypes.func.isRequired
};

const mapStateToProps = ({ bookSearch }) => {
  return { bookSearch };
};

NewBookSearch = connect(
  mapStateToProps,
  { searchBooks }
)(NewBookSearch);

export default reduxForm({
  form: "booksearch"
})(NewBookSearch);
