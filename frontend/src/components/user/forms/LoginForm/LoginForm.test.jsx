import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../../utils/test-utils';
import LoginForm from './LoginForm';

describe('LoginForm component', () => {
  describe('Renders form elements successfully', () => {
    test('renders the form title with correct styles', () => {
      render(<LoginForm />);

      const formTitleElement = screen.getByText(/login form/i);
      expect(formTitleElement).toHaveStyle({
        'font-family': 'Roboto,Helvetica,sans-serif',
        'font-size': '1.5rem',
        'font-weight': 400,
      });
    });

    test('renders form fields with correct label texts', () => {
      render(<LoginForm />);

      screen.getByLabelText(/email/i);
      screen.getByLabelText(/password/i);

      const usernameField = screen.queryByLabelText(/username/i);
      expect(usernameField).not.toBeInTheDocument();
    });

    test('renders forgot password button', () => {
      render(<LoginForm />);

      screen.getByRole('button', { name: /forgot password\?/i });
    });
  });

  describe('Password field icon', () => {
    test('clicking the visibility icon should change the type to text and make the text visible', async () => {
      render(<LoginForm />);

      const passwordField = screen.getByLabelText(/password/i);

      expect(passwordField).toHaveAttribute('type', 'password');

      const passwordTextHiddenIcon = screen.getByTestId('VisibilityOffIcon');
      await userEvent.click(passwordTextHiddenIcon);

      expect(passwordField).toHaveAttribute('type', 'text');
    });
  });
});
