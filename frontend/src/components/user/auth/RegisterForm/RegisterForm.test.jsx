import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../../../utils/test-utils';
import RegisterForm from './RegisterForm';

describe('RegisterForm component', () => {
  describe('Renders form elements successfully', () => {
    test('renders the form title with correct styles', () => {
      render(<RegisterForm />);

      // with the below debug example we can print the whole text content. If undefined is first parameter, it will take the whole body and second parameter is characters length of the printed content
      // screen.debug(undefined, 300000);

      const formTitleElement = screen.getByText(/register form/i);
      expect(formTitleElement).toBeInTheDocument();
      expect(formTitleElement).toHaveStyle({
        'font-family': 'Roboto,Helvetica,sans-serif',
        'font-size': '1.5rem',
        'font-weight': 400,
      });
    });

    test('renders the form fields', () => {
      render(<RegisterForm />);

      screen.getByRole('textbox', { name: /username/i });
      screen.getByRole('textbox', { name: /email/i });
      // input type password doesn't have a role so we get it by label
      screen.getByLabelText(/^password$/i);
      screen.getByLabelText(/confirm password/i);
    });

    test('renders the form buttons', () => {
      render(<RegisterForm />);

      screen.getByRole('button', { name: /reset/i });
      screen.getByRole('button', { name: /register/i });
    });

    test('renders the username field icon', () => {
      render(<RegisterForm />);

      screen.getByTestId('FaceIcon');
    });
  });

  describe('Triggers form field validations', () => {
    test('username is required text is displayed if it was focused and no value was provided', async () => {
      render(<RegisterForm />);

      const usernameField = screen.getByRole('textbox', { name: /username/i });
      await userEvent.click(usernameField);

      const registerButton = screen.getByRole('button', { name: /register/i });
      await userEvent.click(registerButton);

      // the validation state will not appear immediately so we need to await it
      await waitFor(() => {
        screen.getByText(/username is required/i);
      });
    });

    test('focuses the email field if username name is provided and register button is clicked', async () => {
      render(<RegisterForm />);

      const usernameField = screen.getByRole('textbox', { name: /username/i });
      await userEvent.click(usernameField);
      await userEvent.type(usernameField, 'Iva');

      const registerButton = screen.getByRole('button', { name: /register/i });
      await userEvent.click(registerButton);

      const emailField = screen.getByRole('textbox', { name: /email/i });

      expect(usernameField).not.toHaveFocus();
      expect(emailField).toHaveFocus();
    });

    test('email is required with red color text is displayed after trying to click again register button', async () => {
      render(<RegisterForm />);

      const usernameField = screen.getByRole('textbox', { name: /username/i });
      await userEvent.click(usernameField);
      await userEvent.type(usernameField, 'Iva');

      const registerButton = screen.getByRole('button', { name: /register/i });
      // the first register click will focus the email field so the user can type in it
      await userEvent.click(registerButton);
      // after no email is provided and register is clicked again, an error is displayed
      await userEvent.click(registerButton);

      const emailTextError = screen.getByText(/email is required/i);
      expect(emailTextError).toHaveStyle('color: rgb(211, 47, 47)');
    });

    test('the provided email should be valid email', async () => {
      render(<RegisterForm />);

      const emailField = screen.getByRole('textbox', { name: /email/i });
      await userEvent.type(emailField, 'invalidEmailText');

      const registerButton = screen.getByRole('button', { name: /register/i });
      await userEvent.click(registerButton);

      const usernameField = screen.getByRole('textbox', { name: /username/i });
      expect(usernameField).toHaveFocus();

      await waitFor(() => {
        screen.getByText(/email must be a valid email/i);
      });
    });
  });

  describe('Reset button', () => {
    test('clicking the reset button clears field values and errors', async () => {
      render(<RegisterForm />);

      const usernameField = screen.getByRole('textbox', { name: /username/i });
      await userEvent.click(usernameField);
      const emailField = screen.getByRole('textbox', { name: /email/i });
      await userEvent.type(emailField, 'invalidEmail');

      expect(emailField.value).toBe('invalidEmail');

      const registerButton = screen.getByRole('button', { name: /register/i });
      await userEvent.click(registerButton);

      await waitFor(() => {
        screen.getByText(/email must be a valid email/i);
      });

      const resetButton = screen.getByRole('button', { name: /reset/i });
      await userEvent.click(resetButton);

      expect(usernameField.value).toBe('');
      expect(emailField.value).toBe('');

      await waitFor(() => {
        const emailErrorText = screen.queryByText(
          /email must be a valid email/i
        );
        expect(emailErrorText).not.toBeInTheDocument();
      });
    });
  });
});
