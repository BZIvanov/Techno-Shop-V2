import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '../../../../test-utils/test-utils';
import PasswordUpdateForm from './PasswordUpdateForm';

const handlers = [
  rest.put(
    `${process.env.REACT_APP_API}/users/update-password`,
    (req, res, ctx) => {
      return res(ctx.json({ success: true }), ctx.delay(500));
    }
  ),
];

const server = setupServer(...handlers);

describe('PasswordUpdateForm component', () => {
  describe('Renders elements successfully', () => {
    test('renders form fields and buttons', () => {
      render(<PasswordUpdateForm />);

      screen.getByRole('heading', { name: /password update form/i });

      // get by label, because password fields don't have a role
      screen.getByLabelText(/old password/i);
      screen.getByLabelText(/^new password$/i);
      screen.getByLabelText(/^confirm new password$/i);

      screen.getByRole('button', { name: /reset/i });
      screen.getByRole('button', { name: /submit/i });
    });
  });

  describe('Form field validations', () => {
    test('focus and bulr after that will not trigger error message', async () => {
      render(<PasswordUpdateForm />);

      const oldPasswordField = screen.getByLabelText(/old password/i);
      await userEvent.click(oldPasswordField);

      const formTitle = screen.getByRole('heading', {
        name: /password update form/i,
      });
      await userEvent.click(formTitle);

      const errorMessage = screen.queryByText(
        /oldpassword must be at least 8 characters/i
      );
      expect(errorMessage).not.toBeInTheDocument();
    });

    test('focus, then bulr, then submit will result in error message with red text color', async () => {
      render(<PasswordUpdateForm />);

      const oldPasswordField = screen.getByLabelText(/old password/i);
      await userEvent.click(oldPasswordField);

      const formTitle = screen.getByRole('heading', {
        name: /password update form/i,
      });
      await userEvent.click(formTitle);

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await userEvent.click(submitButton);

      await waitFor(() => {
        const errorMessage = screen.getByText(
          /oldpassword must be at least 8 characters/i
        );
        expect(errorMessage).toHaveStyle({ color: 'rgb(211, 47, 47)' });
      });
    });

    test("displays error message if passwords don't match", async () => {
      render(<PasswordUpdateForm />);

      const newPasswordField = screen.getByLabelText(/^new password$/i);
      await userEvent.type(newPasswordField, '12345678');
      const confirmPasswordField = screen.getByLabelText(
        /^confirm new password$/i
      );
      await userEvent.type(confirmPasswordField, '123456789');

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await userEvent.click(submitButton);

      await waitFor(() => {
        screen.getByText(/passwords should match/i);
      });
    });
  });

  describe('Reset button', () => {
    test('clicking reset button will clear the errors', async () => {
      render(<PasswordUpdateForm />);

      const oldPasswordField = screen.getByLabelText(/old password/i);
      await userEvent.type(oldPasswordField, 'a');
      const newPasswordField = screen.getByLabelText(/^new password$/i);
      await userEvent.type(newPasswordField, 'a');
      const confirmPasswordField = screen.getByLabelText(
        /^confirm new password$/i
      );
      await userEvent.type(confirmPasswordField, 'a');

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await userEvent.click(submitButton);

      await waitFor(() => {
        screen.getByText(/oldpassword must be at least 8 characters/i);
        screen.getByText(/^newPassword must be at least 8 characters$/i);
        screen.getByText(/^confirmNewPassword must be at least 8 characters$/i);
      });

      const resetButton = screen.getByRole('button', { name: /reset/i });
      await userEvent.click(resetButton);

      await waitFor(() => {
        const errorMessage = screen.queryByText(
          /oldpassword must be at least 8 characters/i
        );
        expect(errorMessage).not.toBeInTheDocument();
      });
    });
  });

  describe('Submit button', () => {
    beforeAll(() => server.listen());

    afterEach(() => server.resetHandlers());

    afterAll(() => server.close());

    test('clicking reset button will clear the errors', async () => {
      render(<PasswordUpdateForm />);

      const oldPasswordField = screen.getByLabelText(/old password/i);
      await userEvent.type(oldPasswordField, '12345678');
      const newPasswordField = screen.getByLabelText(/^new password$/i);
      await userEvent.type(newPasswordField, '123456789');
      const confirmPasswordField = screen.getByLabelText(
        /^confirm new password$/i
      );
      await userEvent.type(confirmPasswordField, '123456789');

      const submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).not.toBeDisabled();
      await userEvent.click(submitButton);
      expect(submitButton).toBeDisabled();
    });
  });
});
