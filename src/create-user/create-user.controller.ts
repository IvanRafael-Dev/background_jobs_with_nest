import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { SendMailProducerService } from 'src/jobs/send-mail-producer.service';

@Controller('create-user')
export class CreateUserController {
  constructor(private mailService: SendMailProducerService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<CreateUserDto> {
    await this.mailService.sendMail(body);

    return body;
  }
}
