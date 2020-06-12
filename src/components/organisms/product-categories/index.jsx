import React from 'react';
import { MenuItem } from '../../molecules';
import { AppWidth, ItemsContainer } from '../../atoms';
import categories from './data';

const ProductCategories = () => {
  return (
    <AppWidth>
      <ItemsContainer>
        {categories.map((category) => (
          <MenuItem key={category.id} {...category} />
        ))}
      </ItemsContainer>
    </AppWidth>
  );
};

export default ProductCategories;
