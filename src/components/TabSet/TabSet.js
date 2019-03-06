import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Overline } from "../Fonts/Fonts";

const HeadingsContainer = styled.div`
  display: flex;
  height: 2rem;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 1rem;
`;

const TabHeadingContainer = styled.div`
  flex: 1;
  text-align: center;
  padding: 0.5rem;
  border-right: ${props =>
    `1px solid ${props.theme.colors.foreground.tertiary}`};
  :last-child {
    border-right: none;
  }
`;

const TabHeading = styled(Overline)`
  color: ${props =>
    props.active
      ? props.theme.colors.foreground.default
      : props.theme.colors.foreground.tertiary};
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
            <TabHeadingContainer
              onClick={this.onTabClick.bind(this, idx)}
              data-cy={`tab-${child.props.header}`}
            >
              <TabHeading active={this.state.activeTab === idx}>
                {child.props.header}
              </TabHeading>
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
  header: PropTypes.string.isRequired
};

export default TabSet;
export const Tab = TabComp;
