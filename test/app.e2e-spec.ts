import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';

import { AppModule } from './../src/app.module';
import { EMOJIS } from './../src/constants';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let apiKey: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const configService = app.get(ConfigService);
    apiKey = configService.get<string>('API_KEY') || '';
  });

  describe('/ (GET)', () => {
    it('should return Hello World', () => {
      return request(app.getHttpServer())
        .get('/')
        .set('x-api-key', apiKey)
        .expect(200)
        .expect({ data: 'Hello World!' });
    });

    it('should return 403 for unauthorized access (missing key)', () => {
      return request(app.getHttpServer()).get('/').expect(403);
    });

    it('should return 403 for unauthorized access (invalid key)', () => {
      return request(app.getHttpServer())
        .get('/')
        .set('x-api-key', 'invalid-key')
        .expect(403);
    });
  });

  describe('/emoji (GET)', () => {
    it('should return a random emoji', async () => {
      const response = await request(app.getHttpServer())
        .get('/emoji')
        .set('x-api-key', apiKey)
        .expect(200);

      const { emoji }: { emoji: string } = response.body.data;
      expect(EMOJIS).toContain(emoji);
    });

    it('should return specific emoji for valid index', async () => {
      const response = await request(app.getHttpServer())
        .get('/emoji?index=0')
        .set('x-api-key', apiKey)
        .expect(200);

      expect(response.body.data.emoji).toBe(EMOJIS[0]);
    });

    it('should return 400 for invalid index (negative)', () => {
      return request(app.getHttpServer())
        .get('/emoji?index=-1')
        .set('x-api-key', apiKey)
        .expect(400);
    });

    it('should return 400 for invalid index (out of range)', () => {
      return request(app.getHttpServer())
        .get(`/emoji?index=${EMOJIS.length}`)
        .set('x-api-key', apiKey)
        .expect(400);
    });

    it('should return 400 for non-numeric index', () => {
      return request(app.getHttpServer())
        .get('/emoji?index=abc')
        .set('x-api-key', apiKey)
        .expect(400);
    });

    it('should return 403 for unauthorized access (missing key)', () => {
      return request(app.getHttpServer()).get('/emoji').expect(403);
    });

    it('should return 403 for unauthorized access (invalid key)', () => {
      return request(app.getHttpServer())
        .get('/emoji')
        .set('x-api-key', 'invalid-key')
        .expect(403);
    });
  });
});
