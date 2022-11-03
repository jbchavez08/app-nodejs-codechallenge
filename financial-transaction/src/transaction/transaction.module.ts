import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionDb } from './entities/Transaction.entity';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [
    TypeOrmModule.forFeature([TransactionDb])
  ]
})
export class TransactionModule {}
