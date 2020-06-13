import React from 'react';
import styled from 'styled-components';

const BackgroundCss = styled.div`
  background-image: url(${({ imageURL }) => imageURL});
  background-position: center;
  background-size: cover;
  positions: absolute;
  width: 100%;
  height: 100%;
`;

const BackgroundImageBox = (props) => (
  <BackgroundCss {...props}>{props.children}</BackgroundCss>
);

export default BackgroundImageBox;
