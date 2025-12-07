import { ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const config: Record<string, string> = {
                API_KEY: 'test-api-key',
              };

              if (key in config) {
                return config[key];
              }

              throw new Error(`Unexpected config key requested: ${key}`);
            }),
          },
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return false if the API key is missing', () => {
    const request = {
      headers: {},
      header: jest.fn().mockReturnValue(undefined),
    };
    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    };
    expect(guard.canActivate(context as unknown as ExecutionContext)).toBe(
      false,
    );
  });

  it('should return true if the API key is valid', () => {
    const request = {
      headers: {
        'x-api-key': 'test-api-key',
      },
      header: jest.fn().mockReturnValue('test-api-key'),
    };
    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    };
    expect(guard.canActivate(context as unknown as ExecutionContext)).toBe(
      true,
    );
  });

  it('should return false if the API key is invalid', () => {
    const request = {
      headers: {
        'x-api-key': 'invalid-api-key',
      },
      header: jest.fn().mockReturnValue('invalid-api-key'),
    };
    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    };
    expect(guard.canActivate(context as unknown as ExecutionContext)).toBe(
      false,
    );
  });
});
