import { IsString, IsDecimal, IsUUID, IsOptional} from "class-validator";
import { CreateTransactionDto } from "./create-transaction.dto";
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto){

    @IsString()
    @IsUUID()
    @IsOptional()
    readonly id?: string;

    @IsString()
    @IsOptional()
    readonly status?: string;
    
    @IsDecimal()
    @IsOptional()
    readonly amount?: number;

    @IsString()
    @IsOptional()
    readonly accountExternalIdDebit?: string;

    @IsString()
    @IsOptional()
    readonly accountExternalIdCredit?: string;

    @IsDecimal()
    @IsOptional()
    readonly tranferTypeId?: number;

    @IsDecimal()
    @IsOptional()
    readonly value?: number;

}