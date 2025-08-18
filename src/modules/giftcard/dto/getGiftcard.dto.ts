import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class getGiftcardDto {
  @Expose({ name: 'gif_uuid' })
  gifUuid: string;

  @Expose({ name: 'gif_nombre' })
  gifNombre: string;

  @Expose({ name: 'gif_saldo' })
  @Transform(({ value }) => (value ? Number(Number(value).toFixed(2)) : 0))
  gifSaldo: number;

  @Expose({ name: 'gif_moneda' })
  gifMoneda: string;

  @Expose({ name: 'gif_expiracion' })
  gifExpiracion: string;

  @Expose({ name: 'usu_uuid' })
  usuUuid: string;

  @Expose({ name: 'expired' })
  expired: string;

  @Expose({ name: 'a_tiempo' })
  aTiempo: string;

  @Expose({ name: 'mostrar' })
  mostrar: string;
}
