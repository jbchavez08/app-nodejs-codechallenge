import { IsString, IsDecimal, IsUUID} from "class-validator";

export class CreateTransactionDto {


    @IsString()
    @IsUUID()
    readonly accountExternalIdDebit: string;

    @IsString()
    @IsUUID()
    readonly accountExternalIdCredit: string;

    @IsDecimal()
    readonly tranferTypeId: number;

    @IsDecimal()
    readonly value: number;

}