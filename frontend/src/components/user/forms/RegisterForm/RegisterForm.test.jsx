import { render, screen } from '../../../../utils/test-utils';
import RegisterForm from './RegisterForm';

describe('RegisterForm component', () => {
  test('renders the form title successfully', () => {
    render(<RegisterForm />);

    const formTitleElement = screen.getByText(/register form/i);
    expect(formTitleElement).toBeInTheDocument();
  });
});
