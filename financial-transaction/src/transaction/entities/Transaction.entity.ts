import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity()
export class TransactionDb {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    status: string;

    @Column('numeric',{
        default: 0
    })
    amount: number;
    
    @Column('text')
    accountExternalIdDebit: string;
    
    @Column('text')
    accountExternalIdCredit: string;
    
    @Column('numeric')
    tranferTypeId: number;
    
    @Column('numeric', {
        default: 0
    })
    value: number;
    
    @Column('numeric', {
        default: new Date().getTime()
    })
    createdAt: number;

}