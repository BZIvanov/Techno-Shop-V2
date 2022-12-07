import { render, screen } from '../../../../test-utils/test-utils';
import { withReactHookForm } from '../../../../test-utils/withReactHookForm';
import ImagesFieldAdapter from './ImagesFieldAdapter';

describe('ImagesFieldAdapter component', () => {
  describe('Renders the form field', () => {
    test('render the form field with correct text and icon', () => {
      const Wrapped = withReactHookForm(ImagesFieldAdapter, {
        name: 'images',
        defaultValues: { images: [] },
      });
      render(<Wrapped />);

      screen.getByTestId('CloudUploadIcon');
      screen.getByText(/drag and drop images here, or click to select/i);
    });
  });
});
