import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetAntifraudRequestDto } from './dto/get-antifraud-validation.dto';
import { TransactionRepsonseDto } from './dto/transaction-response.dto';
import { TransactionTypeResponseDto } from './dto/transaction-type-response.dto';
import { TransactionStatusResponseDto } from './dto/transaction-status-response.dto';
import { AntifraudEvent } from './antifraud.event';

import { TransactionDb } from './entities/Transaction.entity';

import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class TransactionService {

    constructor(
        @InjectRepository(TransactionDb) private readonly transactionDbRepository: Repository<TransactionDb>,
        @Inject('ANTIFRAUD_SERVICE') private readonly antiFraudClient: ClientKafka,    
    ){}

    /**
     * Method create on database, and send to service AntiFroud, then update status
     * @param createTransactionDto CreateTransactionDto
     * @returns TransactionRepsonseDto
     */
    async create(createTransactionDto: CreateTransactionDto) {
        try {
            const transx = this.transactionDbRepository.create(createTransactionDto);
            await this.transactionDbRepository.save(transx);

            this.handleAntiFraud(new AntifraudEvent(transx.status, transx.id, transx.value))
            return new TransactionRepsonseDto(transx.id,
                                                transx.value, 
                                                transx.createdAt,
                                                new TransactionTypeResponseDto(''),
                                                new TransactionStatusResponseDto(''));
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Help me!')
        }
    }


    private async updateStatusById(id: string, status: string) {
        const trsUp = await this.transactionDbRepository.preload(
            {
                id: id,
                status: status,
            }
        );
        if (!trsUp) {
            throw new NotFoundException(`Transaction with id: ${id} not found`)
        }
        return  this.transactionDbRepository.save(trsUp);
       
    }

    /**
     * Send to Anti Fraud service for validate amount (value)
     * @param antifraudEvent AntifraudEvent
     */
    private handleAntiFraud(antifraudEvent: AntifraudEvent) {
    this.antiFraudClient
        .send('send_antifraud', antifraudEvent.value)
        .subscribe((antifraud) => {
            this.updateStatusById(antifraudEvent.id, antifraud);
            console.log(`transaction ID ${antifraud} with status ${antifraudEvent.status}...`,);

        });
    }
      

}
