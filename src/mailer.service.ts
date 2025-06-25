import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    // In production, integrate with a real email provider
    this.logger.log(`Sending email to ${to}: [${subject}] ${text}`);
    // Simulate async
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}
