import { Module } from '@nestjs/common';
import { AntifraudController } from './antifraud/antifraud.controller';

@Module({
  imports: [],
  controllers: [AntifraudController],
})
export class AppModule {}
