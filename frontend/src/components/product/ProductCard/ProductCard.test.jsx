import { render, screen } from '../../../test-utils/test-utils';
import ProductCard from './ProductCard';

const commonProduct = {
  _id: '123',
  title: 'Winter Trousers',
  price: 12.4,
  description: 'Comfy and wamry clothes for the cold winter months.',
  images: [],
};

const longDescProduct = {
  _id: '124',
  title: 'Summer glasses',
  price: 345.11,
  description:
    'Amaizng looking glasses, best choice, best price. Limited eddition and wide choice of colors',
  images: [],
};

describe('ProductCard component', () => {
  describe('Component texts', () => {
    test('renders the title and the subtitle', () => {
      render(<ProductCard product={commonProduct} />);

      const productTitle = screen.getByText(commonProduct.title);
      expect(productTitle).toHaveStyle({
        'font-weight': 400,
        'line-height': 1.5,
      });

      const productDescription = screen.getByText(commonProduct.description);
      expect(productDescription).toHaveStyle({
        'font-weight': 400,
        'line-height': 1.43,
        color: 'rgba(0, 0, 0, 0.6)',
      });
    });

    test('the price should be formatted to 2 decimal places', () => {
      render(<ProductCard product={commonProduct} />);

      screen.getByText('Winter Trousers');
      screen.getByText('$12.40');
    });

    test('long description text is displayed as ellipsis', () => {
      render(<ProductCard product={longDescProduct} />);

      screen.getByText(
        'Amaizng looking glasses, best choice, best price. Limited eddition and wide choi...'
      );
    });
  });

  describe('Children elements', () => {
    test('renders the children elements', () => {
      render(
        <ProductCard product={commonProduct}>
          <button type='button'>Edit</button>
        </ProductCard>
      );

      screen.getByRole('button', { name: /edit/i });
    });
  });
});
