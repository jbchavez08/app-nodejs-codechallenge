import {TransactionTypeResponseDto} from './transaction-type-response.dto';
import {TransactionStatusResponseDto} from './transaction-status-response.dto';
 
export class TransactionRepsonseDto {
    constructor(
        public transactionExternalId: string,
        public value: number,
        public createdAt: Date,
        public transactionType: TransactionTypeResponseDto,
        public transactionStatus: TransactionStatusResponseDto,
        ) {}  
    
  }