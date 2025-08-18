import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';
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
