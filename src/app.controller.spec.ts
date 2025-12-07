import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      jest
        .spyOn(appService, 'getHello')
        .mockImplementation(() => 'Hello World!');
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('getEmoji', () => {
    it('should return an object with an emoji', () => {
      const mockEmoji = '😎';
      jest.spyOn(appService, 'getEmoji').mockReturnValue(mockEmoji);

      const result = appController.getEmoji();
      expect(result).toEqual({ emoji: mockEmoji });
      expect(appService.getEmoji).toHaveBeenCalled();
    });

    it('should pass the index to the service', () => {
      const mockEmoji = '😎';
      const index = 5;
      jest.spyOn(appService, 'getEmoji').mockReturnValue(mockEmoji);

      const result = appController.getEmoji(index);
      expect(result).toEqual({ emoji: mockEmoji });
      expect(appService.getEmoji).toHaveBeenCalledWith(index);
    });
  });
});
