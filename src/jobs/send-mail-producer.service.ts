import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateUserDto } from 'src/create-user/create-user.dto';

@Injectable()
export class SendMailProducerService {
  constructor(
    @InjectQueue('send-mail-queue')
    private mailQueue: Queue<CreateUserDto>,
  ) {}
  async sendMail(data: CreateUserDto) {
    await this.mailQueue.add('send-mail-job', data);
  }
}
