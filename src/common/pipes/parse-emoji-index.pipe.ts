import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { AppService } from '../../app.service';

@Injectable()
export class ParseEmojiIndexPipe implements PipeTransform {
  constructor(private readonly appService: AppService) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (value === undefined || value === '') {
      return undefined;
    }

    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        'Validation failed (numeric string is expected)',
      );
    }

    const max = this.appService.emojis.length;
    if (val < 0 || val >= max) {
      throw new BadRequestException(`Index must be between 0 and ${max - 1}`);
    }

    return val;
  }
}
