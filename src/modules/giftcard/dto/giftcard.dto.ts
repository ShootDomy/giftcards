import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { DateTime } from 'luxon';

@Expose()
export class crearGiftcard {
  @IsNotEmpty()
  gifNombre: string;

  @IsNotEmpty()
  gifSaldo: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  gifMoneda: string;

  @Transform(({ value }) => {
    const dt = DateTime.fromISO(value);
    if (!dt.isValid) {
      return null;
    }
    return dt;
  })
  gifExpiracion: DateTime;

  @IsNotEmpty()
  usuUuid: string;
}

@Expose()
export class obtenerGifUsuario {
  @IsNotEmpty()
  usuUuid: string;

  @IsOptional()
  gifNombre: string;

  @IsOptional()
  uuidOrigen: string;

  @IsOptional()
  gifMoneda: string;

  @IsOptional()
  estado: string;
}

@Expose()
export class obtenerGiftcard {
  @IsNotEmpty()
  gifUuid: string;
}

@Expose()
export class actualizarGiftcard {
  @IsNotEmpty()
  gifUuid: string;

  @IsOptional()
  gifNombre: string;

  @IsOptional()
  gifSaldo: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  gifMoneda: string;

  @Transform(({ value }) => {
    const dt = DateTime.fromISO(value);
    if (!dt.isValid) {
      return null;
    }
    return dt;
  })
  gifExpiracion: DateTime;
}

@Expose()
export class transferirGiftcard {
  @IsNotEmpty()
  usuUuid: string;

  @IsNotEmpty()
  gifUuidOrigen: string;

  @IsNotEmpty()
  gifUuidDestino: string;

  @IsNotEmpty()
  monto: number;
}
