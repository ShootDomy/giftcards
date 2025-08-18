import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GiftcardService } from './giftcard.service';
import {
  crearGiftcard,
  obtenerGiftcard,
  obtenerGifUsuario,
} from './dto/giftcard.dto';

@Controller('giftcard')
export class GiftcardController {
  constructor(private readonly _giftcardService: GiftcardService) {}

  @Post()
  async crearGiftcard(@Body() giftcard: crearGiftcard) {
    return await this._giftcardService.crearGiftcard(giftcard);
  }

  @Get()
  async obtenerGiftcardsXUsuario(@Query() data: obtenerGifUsuario) {
    return await this._giftcardService.obtenerGiftcardsXUsuario(data);
  }

  @Get(':gifUuid')
  async obtenerGiftcard(@Param() data: obtenerGiftcard) {
    return await this._giftcardService.obtenerGiftcard(data);
  }
}
