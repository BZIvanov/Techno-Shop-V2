import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../../../utils/test-utils';
import ForgotPasswordDialog from './ForgotPasswordDialog';

const handlers = [
  rest.post(
    `${process.env.REACT_APP_API}/users/forgot-password`,
    (req, res, ctx) => {
      return res(
        ctx.json({ success: true, message: 'some text' }),
        ctx.delay(100)
      );
    }
  ),
];

const server = setupServer(...handlers);

describe('ForgotPasswordDialog component', () => {
  describe('Renders dialog elements successfully', () => {
    test('renders the dialog texts and buttons', () => {
      render(<ForgotPasswordDialog showForgotPasswordModal={true} />);

      screen.getByText('Forgot Password');
      screen.getByRole('textbox', { name: /email/i });
      screen.getByRole('button', { name: /cancel/i });
      screen.getByRole('button', { name: /send/i });
    });
  });

  describe('Visibility of the modal', () => {
    test('should not be visible if show modal is false', async () => {
      const { rerender } = render(
        <ForgotPasswordDialog showForgotPasswordModal={true} />
      );

      screen.getByText('Forgot Password');

      rerender(<ForgotPasswordDialog showForgotPasswordModal={false} />);

      await waitFor(() => {
        const dialogTitle = screen.queryByText('Forgot Password');
        expect(dialogTitle).not.toBeInTheDocument();
      });
    });

    test('should call close modal function if cancel is clicked', async () => {
      const handleShowForgotModal = jest.fn();

      render(
        <ForgotPasswordDialog
          showForgotPasswordModal={true}
          handleShowForgotModal={handleShowForgotModal}
        />
      );

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      await userEvent.click(cancelButton);

      expect(handleShowForgotModal).toHaveBeenCalledTimes(1);
    });
  });

  describe('Submit the dialog form', () => {
    beforeAll(() => server.listen());

    afterEach(() => server.resetHandlers());

    afterAll(() => server.close());

    test('send email', async () => {
      const handleShowForgotModal = jest.fn();

      render(
        <ForgotPasswordDialog
          showForgotPasswordModal={true}
          handleShowForgotModal={handleShowForgotModal}
        />
      );

      const emailField = screen.getByRole('textbox', { name: /email/i });
      await userEvent.type(emailField, 'iva@mail.com');

      const sendButton = screen.getByRole('button', { name: /send/i });
      await userEvent.click(sendButton);
    });
  });
});
