import { Provider } from 'react-redux';
import { store } from '../../store/store';

// preloadedState is used in case we want to provide initial state for the tests
const StoreProvider = ({ children, preloadedState = {} }) => {
  return <Provider store={store(preloadedState)}>{children}</Provider>;
};

export default StoreProvider;
