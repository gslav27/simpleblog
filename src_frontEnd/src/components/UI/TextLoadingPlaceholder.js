import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const placeHolderShimmer = keyframes`
  0%{
    background-position: -8vw 0
  }
  100%{
    background-position: 80vw 0
  }
`;

const PlaceholderDiv = styled.div`
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-name: ${placeHolderShimmer};
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 100vw;
  position: relative;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  margin: 10px auto;
`;

const TextLoadingPlaceholder = ({ rows, height, width }) => (
  Array.isArray(rows)
    ? (
      rows.map((row, i) => (
        <PlaceholderDiv key={i} height={height} width={row} />
      ))
    )
    : (
      Array(rows).fill(1).map((_, i) => (
        <PlaceholderDiv key={i} height={height} width={width} />
      ))
    )
);

TextLoadingPlaceholder.propTypes = {
  rows:   PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  width:  PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

TextLoadingPlaceholder.defaultProps = {
  rows: 1,
  height: '0.8em',
  width: '100%',
};


export default TextLoadingPlaceholder;
