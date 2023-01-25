import userEvent from '@testing-library/user-event';
import { Routes, Route } from 'react-router-dom';
import { render, screen } from '../../../../test-utils/test-utils';
import ChipsList from './ChipsList';

const chipsList = [
  { _id: '101', name: 'First chip' },
  { _id: '102', name: 'Second chip' },
  { _id: '103', name: 'Third chip' },
];

const TestRoutes = ({ children }) => {
  return (
    <Routes>
      <Route path='/' element={children} />
      <Route
        path='/category/:categoryId'
        element={
          <div>
            <h1>Category page</h1>
          </div>
        }
      />
      <Route
        path='/subcategory/:subcategoryId'
        element={
          <div>
            <h1>Subcategory page</h1>
          </div>
        }
      />
    </Routes>
  );
};

describe('ChipsList component', () => {
  test('renders the correct chips list title', async () => {
    render(
      <ChipsList title='My chips' parameter='category' chipsList={chipsList} />
    );
    screen.getByText('My chips');
  });

  test('renders the correct amount of chips', async () => {
    render(
      <ChipsList title='My chips' parameter='category' chipsList={chipsList} />
    );
    const chips = screen.getAllByRole('button');
    expect(chips).toHaveLength(3);
  });

  test('clickin the chip should redirect the user to the respective page', async () => {
    const initialEntries = ['/'];

    render(
      <ChipsList title='My chips' parameter='category' chipsList={chipsList} />,
      {
        initialEntries,
        TestRoutes,
      }
    );

    const user = userEvent.setup();

    const firstChip = screen.getByRole('button', {
      name: chipsList[0].name,
    });

    await user.click(firstChip);

    screen.getByText('Category page');
    expect(firstChip).not.toBeInTheDocument();
  });
});
