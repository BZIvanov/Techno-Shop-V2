import React from 'react';
import styled from 'styled-components';

const CommonHeading = styled.h1`
  font-weight: bold;
  line-height: 1.5;
  color: ${({ color, theme }) => color || theme.palette.primary};
`;

const CommonSubheading = styled.p`
  line-height: 1.5;
  color: ${({ color, theme }) => color || theme.palette.primary};
`;

const HeadingOne = styled(CommonHeading).attrs({ as: 'h1' })`
  font-size: 2.5rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    font-size: 2.2rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    font-size: 2rem;
  }
`;
const HeadingTwo = styled(CommonHeading).attrs({ as: 'h2' })`
  font-size: 2.2rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    font-size: 2rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    font-size: 1.8rem;
  }
`;
const HeadingThree = styled(CommonHeading).attrs({ as: 'h3' })`
  font-size: 1.8rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    font-size: 1.6rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    font-size: 1.4rem;
  }
`;
const HeadingFour = styled(CommonHeading).attrs({ as: 'h4' })`
  font-size: 1.6rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    font-size: 1.4rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    font-size: 1.2rem;
  }
`;
const HeadingFive = styled(CommonHeading).attrs({ as: 'h5' })`
  font-size: 1.4rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    font-size: 1.2rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    font-size: 1rem;
  }
`;
const HeadingSix = styled(CommonHeading).attrs({ as: 'h6' })`
  font-size: 1.2rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    font-size: 1rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    font-size: 0.9rem;
  }
`;
const SubtitleOne = styled(CommonSubheading)`
  font-size: 1.4rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    font-size: 1.2rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    font-size: 1rem;
  }
`;
const SubtitleTwo = styled(CommonSubheading)`
  font-size: 1rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    font-size: 0.9rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    font-size: 0.8rem;
  }
`;

const Typography = ({ variant, children }) => {
  switch (variant) {
    case 'h1':
      return <HeadingOne>{children}</HeadingOne>;
    case 'h2':
      return <HeadingTwo>{children}</HeadingTwo>;
    case 'h3':
      return <HeadingThree>{children}</HeadingThree>;
    case 'h4':
      return <HeadingFour>{children}</HeadingFour>;
    case 'h5':
      return <HeadingFive>{children}</HeadingFive>;
    case 'h6':
      return <HeadingSix>{children}</HeadingSix>;
    case 'subtitle1':
      return <SubtitleOne>{children}</SubtitleOne>;
    case 'subtitle2':
      return <SubtitleTwo>{children}</SubtitleTwo>;
    default:
      return <HeadingOne>{children}</HeadingOne>;
  }
};

export default Typography;
