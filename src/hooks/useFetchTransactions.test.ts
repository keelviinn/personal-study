import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

import { useFetchTransactions } from './useFetchTransactions';
import { getTransactions } from '../api/transactions';
import { mockTransactions } from '../mock/transactions';

vi.mock('../api/transactions', () => ({
  getTransactions: vi.fn(),
}));

describe('useFetchTransactions', () => {
  it('fetches transactions successfully', async () => {
    vi.mocked(getTransactions).mockResolvedValue(mockTransactions);

    const { result } = renderHook(() => useFetchTransactions());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.transactions).toEqual(mockTransactions);
    expect(result.current.error).toBe('');
  });

  it('handles fetch error', async () => {
    vi.mocked(getTransactions).mockRejectedValue(
      new Error('Failed to fetch transactions'),
    );

    const { result } = renderHook(() => useFetchTransactions());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.transactions).toEqual([]);
    expect(result.current.error).toBe(
      'Failed to fetch transactions',
    );
  });
});