import {Entity, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn} from 'typeorm'
import {v4 as uuid} from 'uuid';

@Entity()
export class TransactionDb {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        default: 'PENDING'
    })
    status: string;

    @Column('numeric',{
        default: 0
    })
    amount: number;
    
    @Column('text')
    @Generated('uuid')
    accountExternalIdDebit: string;
    
    @Column('text')
    @Generated('uuid')
    accountExternalIdCredit: string;
    
    @Column('numeric',{
        default: 1
    })
    tranferTypeId: number;
    
    @Column('numeric', {
        default: 0
    })
    value: number;

    @CreateDateColumn()
    createdAt: Date;

}