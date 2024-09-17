import { TokenLoggerInterceptor } from './token-logger-interceptor.interceptor';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';

describe('TokenLoggerInterceptor', () => {
  let interceptor: TokenLoggerInterceptor;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService({ secret: 'test-secret' });
    interceptor = new TokenLoggerInterceptor(jwtService);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should log user info when token is valid', () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer valid-token',
      },
    };

    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as ExecutionContext;

    const mockCallHandler = {
      handle: jest.fn().mockReturnValue(of(null)),
    } as CallHandler;

    jest.spyOn(jwtService, 'decode').mockReturnValue({
      id: 'user-id',
      email: 'user@example.com',
      exp: Math.floor(Date.now() / 1000) + 3600,
    });

    console.log = jest.fn();

    interceptor.intercept(mockExecutionContext, mockCallHandler);

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining(
        'Usuario ID: user-id, Email: user@example.com, Tiempo restante del TOKEN:',
      ),
    );
  });

  it('should log an error message when no token is provided', () => {
    const mockRequest = {
      headers: {},
    };

    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as ExecutionContext;

    const mockCallHandler = {
      handle: jest.fn().mockReturnValue(of(null)),
    } as CallHandler;

    console.log = jest.fn();

    interceptor.intercept(mockExecutionContext, mockCallHandler);

    expect(console.log).toHaveBeenCalledWith('No se proporcionó token.');
  });

  it('should log an error message when token is invalid', () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer invalid-token',
      },
    };

    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as ExecutionContext;

    const mockCallHandler = {
      handle: jest.fn().mockReturnValue(of(null)),
    } as CallHandler;

    jest.spyOn(jwtService, 'decode').mockReturnValue(null);

    console.log = jest.fn();

    interceptor.intercept(mockExecutionContext, mockCallHandler);

    expect(console.log).toHaveBeenCalledWith(
      'Token no válido o no se pudo decodificar.',
    );
  });
});
