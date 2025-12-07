import { Injectable } from '@nestjs/common';
import { EMOJIS } from './constants';

@Injectable()
export class AppService {
  public readonly emojis: string[] = EMOJIS;

  getHello(): string {
    return 'Hello World!';
  }

  getEmoji(index?: number): string {
    return index === undefined || index < 0 || index >= this.emojis.length
      ? this.emojis[Math.floor(Math.random() * this.emojis.length)]
      : this.emojis[index];
  }
}
