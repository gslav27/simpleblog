import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


export const InputContainer = styled.div`
  display: flex;
  flex-direction: ${(({ direction }) => direction)};
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 5px;
  & > * {
    ${(({ direction }) => (direction === 'column') && `width: 100%`)};
  };
`;

export const Label = styled.label`
  width: 5em;
  text-align: ${({ textAlign }) => textAlign};
  margin-right: 7px;
  font-size: 1.2em;
  color: ${({ value }) => (value ? 'green' : 'red')};
  ${({ theme, xl }) => xl && theme.boldUppercaseMixin(theme.color)};
`;

const Input = styled.input`
  flex: 1 1 auto;
  box-sizing: border-box;
  font-size: 1em;
  padding: 2px 5px;
  height: 1.6em;
  ${({ theme }) => theme.inputTextMixin};
  border: none;
  color: #000;
  text-transform: ${({ textUppercase }) => (textUppercase ? 'uppercase' : 'unset')};
  &::placeholder {
    color: #999;
    font-style: italic;
    text-transform: none;
  }
`;

const TextArea = styled.textarea`
  flex: 1 1 auto;
  box-sizing: border-box;
  font-size: 1em;
  padding: 5px;
  ${({ theme }) => theme.inputTextMixin};
  border: none;
  border-top: 1px dashed #bbb;
  font-style: italic;
  color: #000;
  &::placeholder {
    color: #999;
  }
`;

const InputElement = ({ element, rows, ...props }) => (
  (element === 'input')
    ? <Input {...props} />
    : <TextArea {...props} rows={rows} />
);


InputElement.propTypes = {
  element: PropTypes.string.isRequired,
  rows: PropTypes.number,
};

InputElement.defaultProps = { rows: 7 };


function TextInput({ value, onChange, id, direction, label, labelXl, labelAlign, ...props }) {
  console.log('RENDER ', label, props.element);
  return (
    <InputContainer direction={direction}>
      <Label
        htmlFor={id}
        value={value}
        xl={labelXl}
        textAlign={labelAlign}
      >
        {label}:
      </Label>
      <InputElement
        id={id}
        type='text'
        value={value}
        onChange={onChange}
        {...props}
      />
    </InputContainer>
  );
}


TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  direction: PropTypes.string,
  labelXl: PropTypes.bool,
  labelAlign: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
  direction: 'row',
  labelXl: false,
  labelAlign: 'left',
};

export default memo(TextInput, (prevProps, nextProps) => (prevProps.value === nextProps.value));
