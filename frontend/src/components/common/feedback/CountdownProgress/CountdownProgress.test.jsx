import { render, screen } from '../../../../utils/test-utils';
import CountdownProgress from './CountdownProgress';

describe('CountdownProgress component', () => {
  describe('Renders elements successfully', () => {
    test('renders redirect text', async () => {
      render(<CountdownProgress redirectTo='/' />);

      await screen.findByText(
        /redirecting you to \/ page in 2 seconds!/i,
        {},
        { timeout: 3000 } // wait 3 seconds, which is enough for the timer to countdown from 3 to 2
      );
    });

    test('renders bigger seconds number if bigger that the default value is provided', async () => {
      render(<CountdownProgress redirectTo='/' seconds={8} />);

      await screen.findByText(
        /redirecting you to \/ page in 6 seconds!/i,
        {},
        { timeout: 3000 }
      );
    });
  });
});
