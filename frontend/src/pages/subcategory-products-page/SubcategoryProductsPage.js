import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { ProductsList } from '../../components/products-list';
import {
  getSubcategoryAction,
  getSubcategoryProductsAction,
} from '../../store/action-creators';

const SubcategoryProductsPage = () => {
  const subcategory = useSelector(
    ({ subcategory: { selectedSubcategory } }) => selectedSubcategory
  );
  const { products, totalCount } = useSelector(
    ({ subcategory: { selectedSubcategoryProducts } }) =>
      selectedSubcategoryProducts
  );

  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getSubcategoryAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getSubcategoryProductsAction(id, { page }));
  }, [dispatch, id, page]);

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  return (
    <Box>
      {subcategory && (
        <ProductsList
          header={`${products.length} Products in ${subcategory.name} subcategory`}
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
