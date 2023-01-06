import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../../../store/hooks';
import { getProductsAction } from '../../../store/features/product/productSlice';
import ProductsList from '../ProductsList/ProductsList';
import { PRODUCTS_LIST_TYPES } from '../../../constants';

const PRODUCTS_PER_PAGE = 12;

const Products = () => {
  const dispatch = useDispatch();

  const { products, totalCount } = useSelector((state) => state.product.all);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      getProductsAction({
        productsType: PRODUCTS_LIST_TYPES.all,
        page,
        perPage: PRODUCTS_PER_PAGE,
      })
    );
  }, [dispatch, page]);

  return (
    <ProductsList
      header='Products List'
      products={products}
      page={page}
      handlePageChange={(_, value) => setPage(value)}
      totalCount={totalCount}
      productsPerPage={PRODUCTS_PER_PAGE}
    />
  );
};

export default Products;
