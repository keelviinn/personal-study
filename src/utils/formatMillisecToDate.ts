export function formatMillisecToDate(value: number): string {
  return new Date(value).toLocaleString('en-GB', { timeZone: 'UTC' });
}