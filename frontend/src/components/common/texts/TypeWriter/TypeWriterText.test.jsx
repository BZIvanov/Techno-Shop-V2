import { render, screen } from '../../../../utils/test-utils';
import TypeWriterText from './TypeWriterText';

describe('TypeWriterText component', () => {
  describe('Renders correct texts with styles', () => {
    jest.setTimeout(15000); // increase the default time per test of 5 seconds to 15 seconds to give time for the typewriter to type and remove texts

    test('renders trailing cursor text symbol', () => {
      render(<TypeWriterText texts={['amazing']} />);

      screen.getByText('|');
    });

    test('types and removes the provided text', async () => {
      render(<TypeWriterText texts={['My cool product', 'Amazing deals']} />);

      const firstTextElement = await screen.findByText(
        'My cool product',
        {},
        { timeout: 4000 } // increase the timeout so typewriter have enough time to type all the letters
      );
      expect(firstTextElement).toBeVisible();

      const secondTextElement = await screen.findByText(
        'Amazing deals',
        {},
        { timeout: 8000 }
      );
      expect(secondTextElement).toBeVisible();
    });
  });
});
