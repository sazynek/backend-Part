import { Module } from '@nestjs/common'
import { EmailService } from './email.service'
import { EmailController } from './email.controller'
import { MailerModule } from '@nestjs-modules/mailer'

@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				host: process.env.EMAIL_HOST,
				auth: {
					user: process.env.EMAIL_USER!,
					pass: process.env.EMAIL_PASSWORD!,
				},
			},
		}),
	],
	controllers: [EmailController],
	providers: [EmailService],
})
export class EmailModule {}
