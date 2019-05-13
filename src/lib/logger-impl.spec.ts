import { LoggerImpl } from './logger-impl';

describe('LoggerImpl', () => {
  it('should create an instance', () => {
    expect(new LoggerImpl(name)).toBeTruthy();
  });
});
