import { render, screen } from '../../../utils/test-utils';
import ManageSubcategory from './ManageSubcategory';

describe('ManageSubcategory component', () => {
  describe('Title element', () => {
    test('render the title with correct text and styles', () => {
      render(<ManageSubcategory />);

      const titleElement = screen.getByRole('heading', {
        name: /manage subcategories/i,
      });
      expect(titleElement).toHaveStyle({
        'font-family': 'Roboto,Helvetica,sans-serif',
        'font-weight': '400',
      });
    });
  });
});
