import React from 'react';
import styled from 'styled-components';

const CoverCss = styled.div`
  background-color: ${(props) =>
    props.backColor || props.theme.palette.offWhite};
`;

const AppWidthCss = styled.section`
  max-width: ${(props) => props.theme.breakpoints.lg}px;
  margin: 0 auto;
`;

const AppWidth = ({ children }) => {
  return (
    <CoverCss>
      <AppWidthCss>{children}</AppWidthCss>
    </CoverCss>
  );
};

export default AppWidth;
