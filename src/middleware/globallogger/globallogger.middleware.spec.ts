import { GloballoggerMiddleware } from './globallogger.middleware';

describe('GloballoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new GloballoggerMiddleware()).toBeDefined();
  });
});
