import { Body, Controller, Post } from '@nestjs/common';
import { GiftcardService } from './giftcard.service';
import { crearGiftcard } from './dto/giftcard.dto';

@Controller('giftcard')
export class GiftcardController {
  constructor(private readonly _giftcardService: GiftcardService) {}

  @Post()
  async crearGiftcard(@Body() giftcard: crearGiftcard) {
    return await this._giftcardService.crearGiftcard(giftcard);
  }
}
