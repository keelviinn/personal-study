import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Transactions } from './Transactions';
import { useFetchTransactions } from '../../hooks/useFetchTransactions';
import { mockTransactions } from '../../mock/transactions';

vi.mock('../../hooks/useFetchTransactions', () => ({
  useFetchTransactions: vi.fn(),
}));

describe('Transactions component', () => {
  it('renders transactions', () => {
    vi.mocked(useFetchTransactions).mockReturnValue({
      transactions: mockTransactions,
      isLoading: false,
      error: '',
    });

    render(<Transactions />);

    const items = screen.getAllByRole('listitem');

    expect(items).toHaveLength(
      mockTransactions.filter((t) => t.state === 'COMPLETED').length,
    );
  });
});
