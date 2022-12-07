import {
  render,
  screen,
  within,
  fireEvent,
} from '../../../../test-utils/test-utils';
import { withReactHookForm } from '../../../../test-utils/withReactHookForm';
import SelectDropdownMultichipAdapter from './SelectDropdownMultichipAdapter';

describe('SelectDropdownMultichipAdapter component', () => {
  describe('Renders the form field', () => {
    test('should select the second and third options', () => {
      const Wrapped = withReactHookForm(SelectDropdownMultichipAdapter, {
        name: 'subcategories',
        label: 'Subcategory',
        options: [
          { _id: '123', name: 'one' },
          { _id: '124', name: 'two' },
          { _id: '125', name: 'three' },
        ],
        defaultValues: { subcategories: [] },
      });
      render(<Wrapped />);

      const selectField = screen.getByTestId('subcategories');
      const button = within(selectField).getByRole('button');
      fireEvent.mouseDown(button);

      const presentationWrapper = screen.getByRole('presentation');
      const listbox = within(presentationWrapper).getByRole('listbox');

      const options = within(listbox).getAllByRole('option');
      const optionValues = options.map((li) => li.getAttribute('data-value'));
      expect(optionValues).toEqual(['123', '124', '125']);

      fireEvent.click(options[1]);
      fireEvent.click(options[2]);
      const firstOption = within(selectField).queryByText('one');
      expect(firstOption).not.toBeInTheDocument();
      within(selectField).getByText('two');
      within(selectField).getByText('three');
    });
  });
});
