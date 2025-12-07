import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { EMOJIS } from './constants';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(service.getHello()).toBe('Hello World!');
    });
  });

  describe('getEmoji', () => {
    it('should return a random emoji when no index is provided', () => {
      const emoji = service.getEmoji();
      expect(EMOJIS).toContain(emoji);
    });

    it('should return a specific emoji when a valid index is provided', () => {
      const index = 0;
      const emoji = service.getEmoji(index);
      expect(emoji).toBe(EMOJIS[0]);
    });

    it('should return a random emoji when index is out of bounds', () => {
      const index = EMOJIS.length + 1;
      const emoji = service.getEmoji(index);
      expect(EMOJIS).toContain(emoji);
    });

    it('should return a random emoji when index is negative', () => {
      const index = -1;
      const emoji = service.getEmoji(index);
      expect(EMOJIS).toContain(emoji);
    });
  });
});
