import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Comment from '../../../containers/Comment';

const Container = styled.section`
  margin: 0px 0px 10px 10px;
  width: 100%;
  border-left: 2px solid #eee;
`;


class SubComments extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { showSubComments: false };
  }

  render() {
    const { subComments } = this.props;
    console.log('render SUB_COMMENTS');
    return (
      <Container>
        {
          subComments.map(_id => (
            <Comment
              key={_id}
              type='subComment'
              _id={_id}
            />
          ))
          // )
        }
      </Container>
    );
  }
}


SubComments.propTypes = { subComments: PropTypes.arrayOf(PropTypes.string).isRequired };


export default SubComments;
