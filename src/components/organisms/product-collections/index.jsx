import React from 'react';
import { CollectionPreview } from '../../molecules';
import { AppWidth } from '../../atoms';
import collections from './data';

const ProductCollections = () => {
  const renderData = collections.map((collection) => (
    <CollectionPreview key={collection.id} {...collection} />
  ));

  return <AppWidth>{renderData}</AppWidth>;
};

export default ProductCollections;
