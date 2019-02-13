import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import themes from '_Utils_/themes/themes';


export const InputContainer = styled.div`
  display: flex;
  flex-direction: ${(({ direction }) => direction)};
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 5px;
  ${themes.widthXsMediaMixin(`flex-direction: column;`)}
`;

export const Label = styled.label`
  min-width: 120px;
  text-align: ${({ textAlign }) => textAlign};
  margin-right: 7px;
  font-size: 1.2em;
  color: rgba(213, 0, 0, 1);
  ${({ theme, xl }) => xl && theme.boldUppercaseMixin(theme.color)};
  &:after {
    content: ':';
    ${({ value }) => value && `content: '✓'`};
  };
  ${themes.widthXsMediaMixin(`
    min-width: unset;
    font-size: 1em;
  `)};
`;

const Input = styled.input`
  flex: 1 1 auto;
  box-sizing: border-box;
  width: 100%;
  font-size: 1em;
  padding: 2px 5px;
  height: 1.6em;
  ${({ theme }) => theme.inputTextMixin};
  border: none;
  color: #000;
  text-transform: ${({ textUppercase }) => (textUppercase ? 'uppercase' : 'unset')};
  overflow: hidden;
  text-overflow: ellipsis;
  &::placeholder {
    color: #999;
    font-style: italic;
    text-transform: none;
  };
  ${themes.widthXsMediaMixin(`
    &:invalid { border-bottom: 1px dotted #bbb; };
  `)};
`;

const TextArea = styled.textarea`
  flex: 1 1 auto;
  box-sizing: border-box;
  width: 100%;
  font-size: 1em;
  padding: 5px;
  ${({ theme }) => theme.inputTextMixin};
  border: none;
  border-top: 1px dashed #bbb;
  font-style: italic;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  &::placeholder {
    color: #999;
  };
  ${themes.widthXsMediaMixin(`border-top: unset`)};
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

InputElement.defaultProps = { rows: 5 };


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
        {label}
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
