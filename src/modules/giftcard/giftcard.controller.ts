import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GiftcardService } from './giftcard.service';
import {
  actualizarGiftcard,
  crearGiftcard,
  obtenerGifUsuario,
  transferirGiftcard,
} from './dto/giftcard.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('giftcard')
@UseGuards(AuthGuard('jwt'))
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

  @Delete(':gifUuid')
  async eliminarGiftcard(@Param('gifUuid') gifUuid: string) {
    return await this._giftcardService.eliminarGiftcard(gifUuid);
  }

  @Post('transferir')
  async transferirGiftcard(@Body() data: transferirGiftcard) {
    return await this._giftcardService.transferirGiftcard(data);
  }

  @Get(':gifUuid')
  async obtenerGiftcard(@Param('gifUuid') gifUuid: string) {
    return await this._giftcardService.obtenerGiftcard(gifUuid);
  }
}
