import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../../app.service';
import { ParseEmojiIndexPipe } from './parse-emoji-index.pipe';

describe('ParseEmojiIndexPipe', () => {
  let pipe: ParseEmojiIndexPipe;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParseEmojiIndexPipe,
        {
          provide: AppService,
          useValue: {
            emojis: ['😀', '😃', '😄'],
          },
        },
      ],
    }).compile();

    pipe = module.get<ParseEmojiIndexPipe>(ParseEmojiIndexPipe);
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should return undefined for undefined input', () => {
    expect(pipe.transform(undefined, { type: 'query' })).toBeUndefined();
  });

  it('should return undefined for empty string input', () => {
    expect(pipe.transform('', { type: 'query' })).toBeUndefined();
  });

  it('should throw BadRequestException for non-numeric input', () => {
    expect(() => pipe.transform('abc', { type: 'query' })).toThrow(
      BadRequestException,
    );
  });

  it('should throw BadRequestException for index < 0', () => {
    expect(() => pipe.transform('-1', { type: 'query' })).toThrow(
      BadRequestException,
    );
  });

  it('should throw BadRequestException for index >= length', () => {
    expect(() => pipe.transform('3', { type: 'query' })).toThrow(
      BadRequestException,
    );
  });

  it('should return parsed integer for valid input', () => {
    expect(pipe.transform('0', { type: 'query' })).toBe(0);
    expect(pipe.transform('2', { type: 'query' })).toBe(2);
  });
});
