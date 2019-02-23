import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { getNewObj } from '_Utils_/getters/getNewObj';


export default function (WrappedComponent) {
  class FormHandlerHOC extends PureComponent {
    constructor(props) {
      super(props);
      this.state = getNewObj(props.inputs);
      this.handleTextChange = this.handleTextChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.formIsFilled = () => !Object.entries(this.state).some(([_, value]) => !value.length);
    }

    handleTextChange(e, type) {
      this.setState({ [type]: e.target.value });
    }

    handleSubmit(e) {
      e.preventDefault();
      if (this.formIsFilled()) {
        this.props.onSubmit({ ...this.state });
        this.setState(getNewObj(this.props.inputs));
        return;
      }
      const alertTemplate = 'is required';
      const emptyFormField = Object.entries(this.state).find(([_, value]) => !value.length)[0];
      alert(`"${emptyFormField}" ${alertTemplate}`);
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          values={this.state}
          onChange={this.handleTextChange}
          onSubmit={this.handleSubmit}
          formIsFilled={this.formIsFilled}
        />
      );
    }
  }


  FormHandlerHOC.propTypes = {
    inputs: PropTypes.objectOf(PropTypes.object).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
  };

  FormHandlerHOC.defaultProps = { onCancel: () => { } };

  return FormHandlerHOC;
}
