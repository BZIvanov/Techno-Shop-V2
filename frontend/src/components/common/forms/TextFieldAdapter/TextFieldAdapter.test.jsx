import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../../test-utils/test-utils';
import { withReactHookForm } from '../../../../test-utils/withReactHookForm';
import TextFieldAdapter from './TextFieldAdapter';

describe('TextFieldAdapter component', () => {
  describe('Renders the form field', () => {
    test('render form field successfully', () => {
      const Wrapped = withReactHookForm(TextFieldAdapter, {
        name: 'category',
        label: 'Category',
        defaultValues: { category: '' },
      });
      render(<Wrapped />);

      screen.getByRole('textbox', { name: /category/i });
    });
  });

  describe('Type text', () => {
    test('should be able to provide text value', async () => {
      const Wrapped = withReactHookForm(TextFieldAdapter, {
        name: 'category',
        label: 'Category',
        defaultValues: { category: '' },
      });
      render(<Wrapped />);

      const textField = screen.getByRole('textbox', { name: /category/i });
      await userEvent.type(textField, 'Hello!');

      expect(textField.value).toBe('Hello!');
    });
  });
});
