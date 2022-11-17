import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { ProductsList } from '../../components/products-list';
import {
  getSubcategoryAction,
  getSubcategoryProductsAction,
} from '../../store/features/subcategory/subcategorySlice';

const SubcategoryProductsPage = () => {
  const subcategory = useSelector(
    (state) => state.subcategory.selectedSubcategory
  );
  const { products, totalCount } = useSelector(
    (state) => state.subcategory.selectedSubcategoryProducts
  );

  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getSubcategoryAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(
      getSubcategoryProductsAction({ subcategoryId: id, params: { page } })
    );
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
