import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Giftcard } from './giftcard.entity';
import { Repository } from 'typeorm';
import {
  crearGiftcard,
  obtenerGiftcard,
  obtenerGifUsuario,
} from './dto/giftcard.dto';
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

  async obtenerGiftcardsXUsuario(data: obtenerGifUsuario) {
    try {
      /**
       * * Condicionales
       */

      let condicion = '';

      if (data.gifNombre) {
        condicion += ` AND gif_nombre LIKE '%${data.gifNombre}%' `;
      }

      // if (data.uuidOrigen) {
      //   condicion += ` AND gif_uuid = '${data.uuidOrigen}' `;
      // }

      if (data.gifMoneda && data.gifMoneda !== 'TODO') {
        condicion += ` AND gif_moneda = '${data.gifMoneda}' `;
      }

      if (data.estado && data.estado !== 'todo') {
        // if (estado === "transferir") filtros.push(`mostrar = 1`);
        // if (estado === "expirado") filtros.push(`mostrar = 0`);
        // if (estado === "por_expirar") filtros.push(`a_tiempo = 0 AND expired = 0`);
        // if (estado === "a_tiempo") filtros.push(`a_tiempo = 1`);
        // if (data.estado === 'transferir') {
        //   if (data.estado === 'expirado') {
        //     //filtros.push(`mostrar = 1 AND gif.currency = '${moneda}'`);
        //     filtros.push(`gif.expired = 1`);
        // if (data.estado === 'por_expirar')
        //   filtros.push(`a_tiempo = 0 AND gif.expired = 0`);
        // if (data.estado === 'a_tiempo') filtros.push(`a_tiempo = 1`);
      }

      const giftcards = await this._giftcardRepository.query(`
        WITH giftcards AS (
          SELECT gif_uuid, gif_nombre, gif_saldo, gif_moneda, 
            TO_CHAR(gif_expiracion::DATE, 'YYYY-MM-DD')::DATE gif_expiracion,
            usu_uuid,
            CASE
              WHEN TO_CHAR(gif_expiracion::DATE, 'YYYY-MM-DD')::DATE > date('now') THEN FALSE
              ELSE TRUE
            END AS expired,
            CASE
              WHEN gif_expiracion::DATE BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days' THEN FALSE
              WHEN TO_CHAR(gif_expiracion::DATE, 'YYYY-MM-DD')::DATE > date('now') THEN TRUE
              ELSE FALSE
          END AS a_tiempo
          FROM giftcard
          WHERE usu_uuid = '${data.usuUuid}' ${condicion}
        ), num_moneda AS (
          SELECT COUNT(*) total, gif_moneda FROM giftcard GROUP BY gif_moneda
        ), datos AS (
          SELECT gif.gif_uuid, gif.gif_nombre, gif.gif_saldo, gif.gif_moneda, 
            gif.gif_expiracion, gif.usu_uuid, gif.expired, gif.a_tiempo,
            CASE 
              WHEN gif.expired = TRUE THEN FALSE
              WHEN mon.total <= 1 THEN FALSE
              WHEN mon.total > 1 THEN TRUE
              ELSE FALSE
            END AS mostrar
          FROM giftcards gif
          LEFT JOIN num_moneda mon ON mon.gif_moneda = gif.gif_moneda
        
        )
        SELECT * FROM datos ORDER BY gif_nombre  
      `);

      return giftcards;
    } catch (error) {
      if (error.driverError) {
        throw new HttpException(
          'Error al obtener los Giftcards',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async obtenerGiftcard(data: obtenerGiftcard) {
    try {
      const giftcard = await this._giftcardRepository
        .createQueryBuilder('gif')
        .select([
          'gif.gifUuid',
          'gif.gifNombre',
          'gif.gifSaldo',
          'gif.gifMoneda',
          'gif.gifExpiracion',
          'gif.usuUuid',
        ])
        .where('gif.gif_uuid = :uuid', { uuid: data.gifUuid })
        .getOne();

      return giftcard;
    } catch (error) {
      if (error.driverError) {
        throw new HttpException(
          'Error al obtener el Giftcard',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
