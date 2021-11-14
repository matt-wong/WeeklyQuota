import { QuotaFractionPipe } from './quota-fraction.pipe';

describe('QuotaFractionPipe', () => {
  it('create an instance', () => {
    const pipe = new QuotaFractionPipe();
    expect(pipe).toBeTruthy();
  });
});
