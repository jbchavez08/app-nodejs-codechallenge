import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {v4 as uuid} from 'uuid';

import { Transaction } from './interfaces/transaction.interface';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { GetAntifraudRequestDto } from './dto/get-antifraud-validation.dto';
import { AntifraudEvent } from './antifraud.event';
import { TransactionDb } from './entities/Transaction.entity';

import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class TransactionService {

    constructor(
        @InjectRepository(TransactionDb)
        private readonly transactionDbRepository: Repository<TransactionDb>,

        //@Inject('AUTH_SERVICE')
        //private readonly authClient: ClientKafka,
    
    ){}

    private txs: Transaction[] = [
        {            
            id: uuid(),
            status: 'pending',
            amount: 4,
            accountExternalIdDebit: '1b6c73ad-2b6e-46c4-8364-fd7bdfc15894',
            accountExternalIdCredit: '1b6c73ad-2b6e-46c4-8364-fd7bdfc15895',
            tranferTypeId: 1,
            value: 2
        },
        {            
            id: uuid(),
            status: 'approved',
            amount: 4,
            accountExternalIdDebit: '1b6c73ad-2b6e-46c4-8364-fd7bdfc15894',
            accountExternalIdCredit: '1b6c73ad-2b6e-46c4-8364-fd7bdfc15895',
            tranferTypeId: 1,
            value: 2
        },
        {            
            id: uuid(),
            status: 'rejected',
            amount: 4,
            accountExternalIdDebit: '1b6c73ad-2b6e-46c4-8364-fd7bdfc15894',
            accountExternalIdCredit: '1b6c73ad-2b6e-46c4-8364-fd7bdfc15895',
            tranferTypeId: 1,
            value: 2
        }
    ];

    findAllTransaction() {
        return this.txs;
    }

    findTransactionById(id: string) {

        const txValue = this.txs.find( tx => tx.id === id);

        if (!txValue) {
            throw new NotFoundException(`Transaction by id ${id} not found`);
        }

        return txValue;
    }

    /*create(createTransactionDto: CreateTransactionDto) {

        const txValue: Transaction = {
            id: uuid(),            
            status: createTransactionDto.status,
            amount: createTransactionDto.amount,
            //accountExternalIdDebit: uuid(),
            //accountExternalIdCredit: uuid(),
            //tranferTypeId: createTransactionDto.tranferTypeId,
            //value: createTransactionDto.value
            ...createTransactionDto
        }

        this.txs.push(txValue);

        return txValue;
    }*/

    async create(createTransactionDto: CreateTransactionDto) {
        try {

            const transx = this.transactionDbRepository.create(createTransactionDto);
            //transx.createdAt == new Date().getTime();
            await this.transactionDbRepository.save(transx);
            
            return transx;
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Help me!')
        }
    }

    async update(id: string, updateTransactionDto: UpdateTransactionDto) {
        let transactionDB = this.findTransactionById(id);

        if (updateTransactionDto.id && updateTransactionDto.id!==id) {
            throw new BadRequestException(`Transaction is not valid`);
        }

        this.txs = this.txs.map( tx => {
            if ( tx.id === id ) {
                transactionDB = {...transactionDB,...updateTransactionDto,id}
                return transactionDB;
            }
            return transactionDB;
        })
        return transactionDB;
    }


    /*update(id: string, updateTransactionDto: UpdateTransactionDto) {
        let transactionDB = this.findTransactionById(id);

        if (updateTransactionDto.id && updateTransactionDto.id!==id) {
            throw new BadRequestException(`Transaction is not valid`);
        }

        this.txs = this.txs.map( tx => {
            if ( tx.id === id ) {
                transactionDB = {...transactionDB,...updateTransactionDto,id}
                return transactionDB;
            }
            return transactionDB;
        })
        return transactionDB;
    }*/

    delete(id: string) {

        const transactionDB = this.findTransactionById(id);
        this.txs = this.txs.filter( tx => tx.id!==id);

    }

    handleOrderCreated(antifraudEvent: AntifraudEvent) {
        /*this.authClient
          .send('get_user', "new GetUserRequest(orderCreatedEvent.userId)")
          .subscribe((anti) => {
            console.log(
              `The transaction is  ${antifraudEvent.id} with status $${antifraudEvent.status}...`,
            );
          });*/
      }


}
