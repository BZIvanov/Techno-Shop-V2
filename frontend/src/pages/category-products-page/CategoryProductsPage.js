import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { ProductsList } from '../../components/products-list';
import {
  getCategoryAction,
  getCategoryProductsAction,
} from '../../store/features/category/categorySlice';

const CategoryProductsPage = () => {
  const category = useSelector(
    ({ category: { selectedCategory } }) => selectedCategory
  );
  const { products, totalCount } = useSelector(
    ({ category: { selectedCategoryProducts } }) => selectedCategoryProducts
  );

  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getCategoryAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getCategoryProductsAction({ categoryId: id, params: { page } }));
  }, [dispatch, id, page]);

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  return (
    <Box>
      {category && (
        <ProductsList
          header={`${products.length} Products in ${category.name} category`}
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

export default CategoryProductsPage;
