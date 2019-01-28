import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addPost } from '../operations/postsOperations';

import HeaderLayout from '../components/Header/HeaderLayout';

class Header extends Component {
  render() {
    return (
      <HeaderLayout
        handleNewPost={this.props.addPost}
      />
    );
  }
}

Header.propTypes = { addPost: PropTypes.func.isRequired };

const mapStateToProps = state => ({});

const mapDispatchToProps = { addPost };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
