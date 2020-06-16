import React from 'react';
import { connect } from 'react-redux';
import { CollectionPreview } from '../../molecules';
import { AppWidth } from '../../atoms';

const ProductCollections = ({ collections }) => {
  const renderData = collections.map((collection) => (
    <CollectionPreview key={collection.id} {...collection} filter />
  ));

  return <AppWidth>{renderData}</AppWidth>;
};

const mapStateToProps = ({ shop }) => ({
  collections: shop.collections,
});

export default connect(mapStateToProps)(ProductCollections);
