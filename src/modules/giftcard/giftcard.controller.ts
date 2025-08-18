import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GiftcardService } from './giftcard.service';
import {
  actualizarGiftcard,
  crearGiftcard,
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

  @Patch()
  async actualizarGiftcard(@Body() giftcard: actualizarGiftcard) {
    return await this._giftcardService.actualizarGiftcard(giftcard);
  }

  @Get(':gifUuid')
  async obtenerGiftcard(@Param('gifUuid') gifUuid: string) {
    return await this._giftcardService.obtenerGiftcard(gifUuid);
  }
}
