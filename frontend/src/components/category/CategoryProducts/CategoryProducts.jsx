import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../../../store/hooks';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import ProductsList from '../../product/ProductsList/ProductsList';
import {
  getCategoryAction,
  getCategoryProductsAction,
} from '../../../store/features/category/categorySlice';

const CategoryProducts = () => {
  const category = useSelector((state) => state.category.selectedCategory);
  const { products, totalCount } = useSelector(
    (state) => state.category.selectedCategoryProducts
  );

  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const { categoryId } = useParams();

  useEffect(() => {
    dispatch(getCategoryAction(categoryId));
  }, [dispatch, categoryId]);

  useEffect(() => {
    dispatch(getCategoryProductsAction({ categoryId, params: { page } }));
  }, [dispatch, categoryId, page]);

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  return (
    <Box>
      {category && (
        <ProductsList
          header={`${totalCount} products in ${category.name} category`}
          products={products}
          page={page}
          handlePageChange={handlePageChange}
          totalCount={totalCount}
          productsPerPage={12}
        />
      )}
    </Box>
  );
};

export default CategoryProducts;
