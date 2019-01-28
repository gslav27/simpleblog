import { PureComponent } from 'react';
import PropTypes from 'prop-types';


class RenderForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { showForm: false };
    this.handleOnOpen = this.handleOnOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOnOpen() {
    this.setState({ showForm: true });
  }

  handleClose() {
    this.setState({ showForm: false });
  }

  render() {
    return (
      this.props.children(
        this.state.showForm,
        this.handleOnOpen,
        this.handleClose,
      )
    );
  }
}


RenderForm.propTypes = { children: PropTypes.func.isRequired };


export default RenderForm;
