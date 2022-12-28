import { render, screen } from '../../../../test-utils/test-utils';
import AverageRating from './AverageRating';

describe('AverageRating component', () => {
  describe('No user ratings', () => {
    test('renders no ratings text if none of the users rated', async () => {
      render(<AverageRating ratings={[]} />);

      screen.getByText('Not rated yet');
    });
  });

  describe('With user ratings', () => {
    test('renders the ratings for 1 user rated', async () => {
      render(<AverageRating ratings={[{ stars: 4 }]} />);

      const noRatingsText = screen.queryByText('Not rated yet');
      expect(noRatingsText).not.toBeInTheDocument();

      screen.getByText('(1)');
      const filledStars = screen.getAllByTestId('StarIcon');
      expect(filledStars.length).toBe(4);
      const emptyStars = screen.getAllByTestId('StarBorderIcon');
      expect(emptyStars.length).toBe(1);
    });

    test('renders average calculated rating for multiple ratings', async () => {
      render(<AverageRating ratings={[{ stars: 2 }, { stars: 4 }]} />);

      const noRatingsText = screen.queryByText('Not rated yet');
      expect(noRatingsText).not.toBeInTheDocument();

      screen.getByText('(2)');
      const filledStars = screen.getAllByTestId('StarIcon');
      expect(filledStars.length).toBe(3);
      const emptyStars = screen.getAllByTestId('StarBorderIcon');
      expect(emptyStars.length).toBe(2);
    });

    test('renders average calculated rating for ratings not rounding to round number', async () => {
      render(<AverageRating ratings={[{ stars: 2 }, { stars: 3 }]} />);

      const noRatingsText = screen.queryByText('Not rated yet');
      expect(noRatingsText).not.toBeInTheDocument();

      screen.getByText('(2)');
      const filledStars = screen.getAllByTestId('StarIcon');
      expect(filledStars.length).toBe(3);
      const emptyStars = screen.getAllByTestId('StarBorderIcon');
      expect(emptyStars.length).toBe(2);
    });

    test('renders average calculated rating for many ratings', async () => {
      render(
        <AverageRating
          ratings={[{ stars: 1 }, { stars: 2 }, { stars: 3 }, { stars: 1 }]}
        />
      );

      const noRatingsText = screen.queryByText('Not rated yet');
      expect(noRatingsText).not.toBeInTheDocument();

      screen.getByText('(4)');
      const filledStars = screen.getAllByTestId('StarIcon');
      expect(filledStars.length).toBe(2);
      const emptyStars = screen.getAllByTestId('StarBorderIcon');
      expect(emptyStars.length).toBe(3);
    });
  });
});
