import React from 'react';
import styled from 'styled-components';

const ParagraphCss = styled.p`
  color: ${(props) => props.theme.palette.warning};
  font-size: 0.8rem;
`;

const TextWarning = ({ children }) => {
  return <ParagraphCss>{children}</ParagraphCss>;
};

export default TextWarning;
