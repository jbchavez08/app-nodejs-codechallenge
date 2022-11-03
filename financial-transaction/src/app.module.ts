import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [TransactionModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true
    }),

    
    /*ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'antifraud-consumer',
          },
        },
      },
    ]),*/
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
