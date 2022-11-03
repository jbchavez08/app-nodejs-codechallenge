import { Controller, Get, Post, Patch, Delete, Body, Param, ParseUUIDPipe, ValidationPipe} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transaction')
//@UsePipes(ValidationPipe)
export class TransactionController {

    constructor(
        private readonly transactionService: TransactionService
    ) {}

    @Get()
    getAllTransaction() {
        return this.transactionService.findAllTransaction();
    }

    @Get(':id')
    getTrasactionById(@Param('id', ParseUUIDPipe) id: string ) {
        console.log({id})
        return this.transactionService.findTransactionById(id);
    }

    @Post()    
    createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
        return this.transactionService.create(createTransactionDto);
    }


    @Patch(':id')
    updateTransaction(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateTransactionDto: UpdateTransactionDto) {
        return this.transactionService.update(id, updateTransactionDto);
    }

    @Delete(':id')
    deleteTrasactionById(@Param('id', ParseUUIDPipe) id: string ) {
        console.log({id})
        return this.transactionService.delete(id);
    }

}
