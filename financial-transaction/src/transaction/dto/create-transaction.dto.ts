import { IsString, IsDecimal} from "class-validator";

export class CreateTransactionDto {

    //@IsString()
    //readonly id: string;

    @IsString()
    readonly status: string;
    
    @IsDecimal()
    readonly amount: number;

    @IsString()
    readonly accountExternalIdDebit: string;

    @IsString()
    readonly accountExternalIdCredit: string;

    @IsDecimal()
    readonly tranferTypeId: number;

    @IsDecimal()
    readonly value: number;

}