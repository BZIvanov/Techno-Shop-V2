import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../../../store/hooks';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import ProductsList from '../../product/ProductsList/ProductsList';
import {
  getSubcategoryAction,
  getSubcategoryProductsAction,
} from '../../../store/features/subcategory/subcategorySlice';

const SubcategoryProductsPage = () => {
  const subcategory = useSelector(
    (state) => state.subcategory.selectedSubcategory
  );
  const { products, totalCount } = useSelector(
    (state) => state.subcategory.selectedSubcategoryProducts
  );

  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const { subcategoryId } = useParams();

  useEffect(() => {
    dispatch(getSubcategoryAction(subcategoryId));
  }, [dispatch, subcategoryId]);

  useEffect(() => {
    dispatch(getSubcategoryProductsAction({ subcategoryId, params: { page } }));
  }, [dispatch, subcategoryId, page]);

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  return (
    <Box>
      {subcategory && (
        <ProductsList
          header={`${totalCount} products in ${subcategory.name} subcategory`}
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

export default SubcategoryProductsPage;
