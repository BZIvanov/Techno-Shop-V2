import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Jumbotron } from '../../components/jumbotron';
import { getProductsAction } from '../../store/action-creators';

const JUMBOTRON_TEXTS = ['Latest Products', 'New Arrivals', 'Best Sellers'];

const HomePage = () => {
  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAction());
  }, [dispatch]);

  return (
    <>
      <Jumbotron texts={JUMBOTRON_TEXTS} />
      {JSON.stringify(products)}
    </>
  );
};

export default HomePage;
