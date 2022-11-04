import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('antifraud')
export class AntifraudController {

    @MessagePattern('send_antifraud')
    getAntifraud(value: number) {
        console.log('value is '+value);
        return value>1000 ? 'REJECTED' : 'APPROVED';
    }
}
