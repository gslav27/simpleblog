import React, { PureComponent } from 'react';


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


export default UserInteractionHandlersHOC;
