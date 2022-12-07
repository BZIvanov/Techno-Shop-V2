import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../../test-utils/test-utils';
import { withReactHookForm } from '../../../../test-utils/withReactHookForm';
import PasswordTextFieldAdapter from './PasswordTextFieldAdapter';

describe('PasswordTextFieldAdapter component', () => {
  describe('Renders the form field', () => {
    test('render form field successfully', () => {
      const Wrapped = withReactHookForm(PasswordTextFieldAdapter, {
        name: 'password',
        label: 'Password',
        defaultValues: { password: '' },
      });
      render(<Wrapped />);

      screen.getByLabelText(/password/i);
    });
  });

  describe('Type text', () => {
    test('should be able to provide text value', async () => {
      const Wrapped = withReactHookForm(PasswordTextFieldAdapter, {
        name: 'password',
        label: 'Password',
        defaultValues: { password: '' },
      });
      render(<Wrapped />);

      const passwordField = screen.getByLabelText(/password/i);
      await userEvent.type(passwordField, '12345');

      expect(passwordField.value).toBe('12345');
    });
  });

  describe('Icon button', () => {
    test('should be able to change the visibility of the text by clicking the icon button', async () => {
      const Wrapped = withReactHookForm(PasswordTextFieldAdapter, {
        name: 'password',
        label: 'Password',
        defaultValues: { password: '' },
      });
      render(<Wrapped />);

      const passwordField = screen.getByLabelText(/password/i);
      await userEvent.type(passwordField, '12345');
      expect(passwordField.value).toBe('12345');
      expect(passwordField).toHaveAttribute('type', 'password');

      const passwordTextHiddenIcon = screen.getByTestId('VisibilityOffIcon');
      await userEvent.click(passwordTextHiddenIcon);
      expect(passwordField).toHaveAttribute('type', 'text');
    });
  });
});
