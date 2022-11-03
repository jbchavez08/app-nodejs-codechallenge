import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller('antifraud')
export class AntifraudController {

    @EventPattern('order_created')
    handleOrderCreated(data: any) {
        //this.appService.handleOrderCreated(data.value);
    }

}
