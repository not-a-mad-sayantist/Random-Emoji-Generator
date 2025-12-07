import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { AllExceptionsFilter } from './all-exceptions.filter';

describe('AllExceptionsFilter', () => {
  let filter: AllExceptionsFilter<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllExceptionsFilter],
    }).compile();

    filter = module.get<AllExceptionsFilter<any>>(AllExceptionsFilter);
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  describe('catch', () => {
    let mockJson: jest.Mock;
    let mockStatus: jest.Mock;
    let mockGetResponse: jest.Mock;
    let mockGetRequest: jest.Mock;
    let mockHost: ArgumentsHost;

    beforeEach(() => {
      mockJson = jest.fn();
      mockStatus = jest.fn().mockReturnValue({ json: mockJson });
      mockGetResponse = jest.fn().mockReturnValue({
        status: mockStatus,
      } as unknown as Response);
      mockGetRequest = jest.fn().mockReturnValue({
        url: '/test-url',
      } as unknown as Request);

      const mockHttpArgumentsHost = {
        getResponse: mockGetResponse,
        getRequest: mockGetRequest,
      };

      mockHost = {
        switchToHttp: jest.fn().mockReturnValue(mockHttpArgumentsHost),
      } as unknown as ArgumentsHost;
    });

    it('should catch HttpException and send parsed response', () => {
      const exception = new HttpException('Test error', HttpStatus.BAD_REQUEST);

      filter.catch(exception, mockHost);

      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Test error',
          statusCode: HttpStatus.BAD_REQUEST,
          path: '/test-url',
        }),
      );
    });

    it('should catch generic Error and send Internal Server Error response', () => {
      const exception = new Error('Generic error');

      filter.catch(exception, mockHost);

      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Generic error',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          path: '/test-url',
        }),
      );
    });

    it('should catch unknown exception and send Internal Server Error response', () => {
      const exception = 'Unknown error';

      filter.catch(exception, mockHost);

      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Internal server error',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          path: '/test-url',
        }),
      );
    });
  });
});
