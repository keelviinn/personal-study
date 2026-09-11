import { describe, expect, it } from 'vitest';
import { formatMillisecToDate } from './formatMillisecToDate';
describe('Format miliseconds to date', () => {
  it('Should return the time formated', () => {
    const miliseconds = 1789161077876
    const expectDate = '11/09/2026, 21:11:17'
    const formatedDate = formatMillisecToDate(miliseconds)

    expect(formatedDate).toBe(expectDate)
  })
})