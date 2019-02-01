import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


function UserInteractionHandlersHOC(WrappedComponent) {
  return class extends PureComponent {
    constructor(props) {
      super(props);
      this.state = { userOverElement: false };
      this.handleCheckBoxHoverOn = this.handleCheckBoxHoverOn.bind(this);
      this.handleCheckBoxHoverOff = this.handleCheckBoxHoverOff.bind(this);
    }

    handleCheckBoxHoverOn() {
      this.setState(() => ({ userOverElement: true }));
    }

    handleCheckBoxHoverOff() {
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
            onMouseEnter: this.handleCheckBoxHoverOn,
            onFocus: this.handleCheckBoxHoverOn,
            onMouseLeave: this.handleCheckBoxHoverOff,
            onBlur: this.handleCheckBoxHoverOff,
          }}
          {...this.props}
        />
      );
    }
  };
}


UserInteractionHandlersHOC.propTypes = { userOver: PropTypes.bool };

export default UserInteractionHandlersHOC;
