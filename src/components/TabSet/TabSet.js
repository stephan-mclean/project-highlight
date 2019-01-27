import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const HeadingsContainer = styled.div`
  display: flex;
`;

const TabHeadingContainer = styled.div`
  border-right: ${props =>
    `1px solid ${props.theme.colors.foreground.default}`};
`;

class TabSet extends Component {
  constructor(props) {
    super(props);

    const renderTabs = [];
    let activeTab = 0;

    React.Children.forEach(props.children, (tab, index) => {
      if (tab.props.isDefault) {
        activeTab = index;
      }

      renderTabs.push(tab.props.render);
    });

    this.state = { activeTab, renderTabs };
  }

  onTabClick(idx) {
    this.setState({
      activeTab: idx
    });
  }

  render() {
    const headings = (
      <HeadingsContainer>
        {React.Children.map(this.props.children, (child, idx) => {
          return (
            <TabHeadingContainer onClick={this.onTabClick.bind(this, idx)}>
              {child.props.renderHeader()}
            </TabHeadingContainer>
          );
        })}
      </HeadingsContainer>
    );

    return (
      <Fragment>
        {headings}

        {this.state.renderTabs[this.state.activeTab]()}
      </Fragment>
    );
  }
}

const TabComp = () => <Fragment />;
TabComp.propTypes = {
  render: PropTypes.func.isRequired,
  renderHeader: PropTypes.func.isRequired
};

export default TabSet;
export const Tab = TabComp;
