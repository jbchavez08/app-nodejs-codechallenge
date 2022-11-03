export interface Transaction {

    id: string;
    status: string;
    amount: number;
    accountExternalIdDebit: string;
    accountExternalIdCredit: string;
    tranferTypeId: number;
    value: number;

}