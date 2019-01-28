import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import HomeLink from './components/HomeLink';
import AddNewPost from '../../containers/AddNewPost';

const Header = styled.header`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-conent: flex-start;
  align-items: center;
  width: 100%;
`;


const HeaderLayout = props => (
  <Header>
    <HomeLink />
    <AddNewPost onSubmit={props.handleNewPost} />
  </Header>
);

HeaderLayout.propTypes = { handleNewPost: PropTypes.func.isRequired };

export default HeaderLayout;
