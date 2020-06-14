import React from 'react';
import styled from 'styled-components';

const InputCss = styled.input`
  color: ${(props) => props.theme.palette.secondary};
  padding: 0.5rem;
  border: none;
  outline: none;
  font-size: 1rem;
  border-bottom: ${(props) => '2px solid' + props.theme.palette.tertiary};
  ::placeholder {
    font-size: 0.9rem;
    color: ${(props) => props.theme.palette.offBlack};
    transition: color 1s ease;
  }
  &:hover {
    border-bottom: ${(props) => '2px solid' + props.theme.palette.secondary};
  }
  &:hover::placeholder {
    color: ${(props) => props.theme.palette.secondary};
  }
`;

const TextInput = React.forwardRef((props, ref) => {
  return <InputCss ref={ref} type="text" {...props} />;
});

export default TextInput;
