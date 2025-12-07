import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ParseEmojiIndexPipe } from './common/pipes/parse-emoji-index.pipe';

@Controller()
export class AppController {
  private readonly numOfEmojis: number;
  constructor(private readonly appService: AppService) {
    this.numOfEmojis = this.appService.emojis.length;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('emoji')
  getEmoji(
    @Query('index', ParseEmojiIndexPipe)
    index?: number,
  ) {
    return { emoji: this.appService.getEmoji(index) };
  }
}
