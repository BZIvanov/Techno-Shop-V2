import React from 'react';
import { MenuItem } from '../../molecules';
import { AppWidth, ItemsContainer } from '../../atoms';

const ProductCategories = () => {
  return (
    <AppWidth>
      <ItemsContainer>
        <MenuItem title="Mobile Phones" />
        <MenuItem title="Tablets" />
        <MenuItem title="Smart Watches" />
        <MenuItem title="Fitnes Wrist" />
        <MenuItem title="Headphones" />
      </ItemsContainer>
    </AppWidth>
  );
};

export default ProductCategories;
