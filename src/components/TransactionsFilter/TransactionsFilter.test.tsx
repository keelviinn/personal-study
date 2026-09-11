import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { TransactionsFilter } from './TransactionsFilter';

describe('TransactionsFilter Component', () => {
  it('calls onChangeState with PENDING when selected', async () => {
    const onChangeState = vi.fn();
    const user = userEvent.setup();

    render(
      <TransactionsFilter state="COMPLETED" onChangeState={onChangeState} />,
    );

    await user.click(screen.getByLabelText('PENDING'));

    expect(onChangeState).toHaveBeenCalledWith('PENDING');
  });
});
