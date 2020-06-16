import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CollectionPreview } from '../../molecules';
import { AppWidth } from '../../atoms';

const CategoryList = ({ category: { title, items } }) => {
  return (
    <AppWidth>
      <CollectionPreview title={title} items={items} />
    </AppWidth>
  );
};

const mapStateToProps = ({ shop }, { match }) => ({
  category: shop.collections.filter(
    (collection) => collection.routeName === match.params.category
  )[0],
});

export default withRouter(connect(mapStateToProps)(CategoryList));
