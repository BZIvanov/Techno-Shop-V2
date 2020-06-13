import React from 'react';
import { Link as L } from 'react-router-dom';

const Link = ({ children, ...rest }) => {
  return <L {...rest}>{children}</L>;
};

export default Link;
