import React from 'react';
import { connect } from 'react-redux';
import { MenuItem } from '../../molecules';
import { AppWidth, ItemsContainer } from '../../atoms';

const ProductCategories = ({ categories }) => {
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

const mapStateToProps = ({ categories }) => ({
  categories,
});

export default connect(mapStateToProps)(ProductCategories);
