import { Controller, Get, Post, Patch, Delete, Body, Param, ParseUUIDPipe, ValidationPipe, Inject} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

import { ClientKafka, EventPattern } from '@nestjs/microservices';

@Controller('transaction')
export class TransactionController {

    constructor(
        private readonly transactionService: TransactionService,
        @Inject('ANTIFRAUD_SERVICE') private readonly antiFraudClient: ClientKafka,
    ) {}

    @Post()    
    createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
        return this.transactionService.create(createTransactionDto);
    }

    onModuleInit() {
        this.antiFraudClient.subscribeToResponseOf('send_antifraud');
    }

}
