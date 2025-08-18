import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity('giftcard', { schema: 'public' })
export class Giftcard {
  @Column({
    type: 'uuid',
    primary: true,
    name: 'gif_uuid',
    default: () => 'gen_random_uuid()',
  })
  gifUuid: string;

  @Column('character varying', { name: 'gif_nombre' })
  gifNombre: string;

  @Column('numeric', { name: 'gif_saldo' })
  gifSaldo: number;

  @Column('character varying', { name: 'gif_moneda' })
  gifMoneda: string;

  @Column('timestamp with time zone', { name: 'gif_expiracion' })
  gifExpiracion: Date;

  @Column('uuid', { name: 'usu_uuid' })
  usuUuid: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt: Date | null;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
    type: 'timestamp with time zone',
  })
  updatedAt: Date | null;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
    type: 'timestamp with time zone',
  })
  deletedAt: Date | null;

  @JoinColumn([{ name: 'usu_uuid', referencedColumnName: 'usuUuid' }])
  usuario: Usuario;
}
