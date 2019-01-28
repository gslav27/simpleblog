import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1500;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const BackDrop = styled.div`
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
`;

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
    padding-right: 15px;
  }
`;


class Dialog extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    (e.keyCode === 27) && this.props.onClose();
  }

  render() {
    const { children } = this.props;

    const element = (
      <Container
        role='dialog'
        aria-labelledby='dialog-title'
        onKeyDown={this.handleKeyDown}
      >
        {children}
        <BackDrop ariaHidden='true' onClick={this.props.onClose} />
        <GlobalStyle />
      </Container>
    );

    return ReactDOM.createPortal(
      element,
      document.body,
    );
  }
}


Dialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Dialog;
