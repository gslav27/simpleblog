import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


function UserInteractionHandlersHOC(WrappedComponent) {
  return class extends PureComponent {
    constructor(props) {
      super(props);
      this.state = { userOverElement: false };
      this.handleUserOver = this.handleUserOver.bind(this);
      this.handleUserLeave = this.handleUserLeave.bind(this);
    }

    handleUserOver() {
      this.setState(() => ({ userOverElement: true }));
    }

    handleUserLeave() {
      this.setState(() => ({ userOverElement: false }));
    }

    render() {
      const { userOverElement } = this.state;

      // in case of parent element also has this HOC instance
      if (typeof this.props.userOver === 'boolean') {
        return <WrappedComponent {...this.props} />;
      }

      return (
        <WrappedComponent
          userOver={userOverElement}
          handlers={{
            onMouseEnter: this.handleUserOver,
            onFocus: this.handleUserOver,
            onMouseLeave: this.handleUserLeave,
            onBlur: this.handleUserLeave,
          }}
          {...this.props}
        />
      );
    }
  };
}


UserInteractionHandlersHOC.propTypes = { userOver: PropTypes.bool };

export default UserInteractionHandlersHOC;
