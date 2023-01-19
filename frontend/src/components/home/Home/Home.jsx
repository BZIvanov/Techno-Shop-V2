import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../../../store/hooks';
import { Box } from '@mui/material';
import TypeWriterText from '../../common/texts/TypeWriter/TypeWriterText';
import ProductsList from '../../product/ProductsList/ProductsList';
import ChipsList from '../../common/lists/ChipsList/ChipsList';
import ApiCallAlert from '../../common/async/ApiCallAlert/ApiCallAlert';
import ApiCallLoader from '../../common/async/ApiCallLoader/ApiCallLoader';
import { getAllCategoriesAction } from '../../../store/features/category/categorySlice';
import { getSubcategoriesAction } from '../../../store/features/subcategory/subcategorySlice';
import { getProductsAction } from '../../../store/features/product/productSlice';
import { PRODUCTS_LIST_TYPES } from '../../product/constants';
import { TYPEWRITER_TEXTS } from '../../common/constants';

const PRODUCTS_PER_PAGE = 3;

const Home = () => {
  const { products: newestProducts, totalCount: newestProductsTotalCount } =
    useSelector((state) => state.product.newest);
  const {
    products: bestsellingProducts,
    totalCount: bestsellingProductsTotalCount,
  } = useSelector((state) => state.product.bestselling);
  const { categories } = useSelector((state) => state.category);
  const { subcategories } = useSelector((state) => state.subcategory);

  const [latestProductsPage, setLatestProductsPage] = useState(1);
  const [bestsellingProductsPage, setBestsellingProductsPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getProductsAction({
        productsType: PRODUCTS_LIST_TYPES.newest,
        sortColumn: 'createdAt',
        page: latestProductsPage,
        perPage: PRODUCTS_PER_PAGE,
      })
    );
  }, [dispatch, latestProductsPage]);

  useEffect(() => {
    dispatch(
      getProductsAction({
        productsType: PRODUCTS_LIST_TYPES.bestselling,
        sortColumn: 'sold',
        page: bestsellingProductsPage,
        perPage: PRODUCTS_PER_PAGE,
      })
    );
  }, [dispatch, bestsellingProductsPage]);

  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(getSubcategoriesAction());
  }, [dispatch]);

  const handleLatestPageChange = (_, value) => {
    setLatestProductsPage(value);
  };

  const handleBestsellingPageChange = (_, value) => {
    setBestsellingProductsPage(value);
  };

  return (
    <>
      <TypeWriterText texts={TYPEWRITER_TEXTS} />

      <ProductsList
        header={TYPEWRITER_TEXTS[0]}
        products={newestProducts}
        page={latestProductsPage}
        handlePageChange={handleLatestPageChange}
        totalCount={newestProductsTotalCount}
        productsPerPage={PRODUCTS_PER_PAGE}
      />

      <ProductsList
        header={TYPEWRITER_TEXTS[1]}
        products={bestsellingProducts}
        page={bestsellingProductsPage}
        handlePageChange={handleBestsellingPageChange}
        totalCount={bestsellingProductsTotalCount}
        productsPerPage={PRODUCTS_PER_PAGE}
      />

      <Box sx={{ padding: 2 }}>
        <ChipsList
          title='Categories'
          parameter='category'
          chipsList={categories}
        />
      </Box>

      <Box sx={{ padding: 2 }}>
        <ChipsList
          title='Subcategories'
          parameter='subcategory'
          chipsList={subcategories}
        />
      </Box>

      <ApiCallLoader />

      <ApiCallAlert />
    </>
  );
};

export default Home;
