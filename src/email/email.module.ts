import { Module } from '@nestjs/common'
import { EmailService } from './email.service'
import { EmailController } from './email.controller'
import { MailerModule } from '@nestjs-modules/mailer'

@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				port: +process.env.GOOGLE_EMAIL_PORT!,
				host: process.env.GOOGLE_EMAIL_HOST,
				secure: false,
				auth: {
					user: process.env.GOOGLE_EMAIL_USER,
					pass: process.env.GOOGLE_EMAIL_PASS,
				},
			},
		}),
	],
	controllers: [EmailController],
	providers: [EmailService],
})
export class EmailModule {}
