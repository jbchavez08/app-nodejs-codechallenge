import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('antifraud')
export class AntifraudController {

    @MessagePattern('send_antifraud')
    getAntifraud(data: any) {
        console.log(data.value + JSON.stringify(data.value));
        return 'APPROVED';
    }
}
