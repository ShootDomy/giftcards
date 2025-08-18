import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Giftcard } from './giftcard.entity';
import { Repository } from 'typeorm';
import { crearGiftcard } from './dto/giftcard.dto';
import { DateTime } from 'luxon';

@Injectable()
export class GiftcardService {
  constructor(
    @InjectRepository(Giftcard)
    private readonly _giftcardRepository: Repository<Giftcard>,
  ) {}

  async crearGiftcard(giftcard: crearGiftcard) {
    try {
      /**
       * * Validaciones
       */
      //Validacion de fecha de expiracion
      const fechaActual = DateTime.now();
      if (giftcard.gifExpiracion < fechaActual.toISO()) {
        throw new HttpException(
          'La fecha de expiración no puede ser menor a la fecha actual',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Validacion de saldo mayor a 0
      if (giftcard.gifSaldo <= 0) {
        throw new HttpException(
          'El saldo debe ser mayor a 0',
          HttpStatus.BAD_REQUEST,
        );
      }

      const nuevoGiftcard: Partial<Giftcard> = {
        gifNombre: giftcard.gifNombre,
        gifSaldo: giftcard.gifSaldo,
        gifMoneda: giftcard.gifMoneda,
        gifExpiracion: giftcard.gifExpiracion,
        usuUuid: giftcard.usuUuid,
      };

      return await this._giftcardRepository.save(nuevoGiftcard);
    } catch (error) {
      if (error.driverError) {
        throw new HttpException(
          'Error al crear el Giftcard',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
