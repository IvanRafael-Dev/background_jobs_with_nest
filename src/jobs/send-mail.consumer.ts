import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { CreateUserDto } from 'src/create-user/create-user.dto';

@Processor('send-mail-queue') // nome da fila
export class SendMailConsumer {
  constructor(private mailService: MailerService) {}
  @Process('send-mail-job') // nome do job
  async sendMail(job: Job<CreateUserDto>) {
    const { data } = job;
    await this.mailService.sendMail({
      from: 'me@mail.com',
      to: data.email,
      subject: 'Bem-vindo ao sistema',
      text: `Olá ${data.name}, seja bem-vindo ao sistema.`,
    });
  }

  @OnQueueActive()
  onWaiting(job: Job<CreateUserDto>) {
    console.log(`Envio para ${job.data.email} está esperando na fila`);
  }

  @OnQueueCompleted()
  onCompleted(job: Job<CreateUserDto>) {
    console.log(`Email enviado para ${job.data.email}`);
  }
}
