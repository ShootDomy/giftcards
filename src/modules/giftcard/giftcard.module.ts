import { Module } from '@nestjs/common';
import { GiftcardService } from './giftcard.service';
import { GiftcardController } from './giftcard.controller';
import { Giftcard } from './giftcard.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [GiftcardController],
  providers: [GiftcardService],
  imports: [TypeOrmModule.forFeature([Giftcard])],
  exports: [GiftcardService],
})
export class GiftcardModule {}
