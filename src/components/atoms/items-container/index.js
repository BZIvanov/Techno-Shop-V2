import styled from 'styled-components';

const ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1.5rem 5rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding: 1.5rem 3rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding: 1rem;
  }
`;

export default ItemsContainer;
