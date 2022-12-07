import {
  render,
  screen,
  within,
  fireEvent,
} from '../../../../test-utils/test-utils';
import { withReactHookForm } from '../../../../test-utils/withReactHookForm';
import SelectDropdownAdapter from './SelectDropdownAdapter';

describe('SelectDropdownAdapter component', () => {
  describe('Renders the form field', () => {
    test('should change to the selected value', () => {
      const Wrapped = withReactHookForm(SelectDropdownAdapter, {
        name: 'categoryId',
        label: 'Category',
        options: ['one', 'two', 'three'],
        defaultValues: { categoryId: '' },
      });
      render(<Wrapped />);

      const selectField = screen.getByTestId('categoryId');
      const button = within(selectField).getByRole('button');
      fireEvent.mouseDown(button);

      const presentationWrapper = screen.getByRole('presentation');
      const listbox = within(presentationWrapper).getByRole('listbox');

      const options = within(listbox).getAllByRole('option');
      const optionValues = options.map((li) => li.getAttribute('data-value'));
      expect(optionValues).toEqual(['one', 'two', 'three']);

      fireEvent.click(options[1]);
      within(selectField).getByRole('button', { name: /two/i });
    });
  });
});
