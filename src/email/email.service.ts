import { Injectable } from '@nestjs/common'
import { CreateEmailDto } from './dto/create-email.dto'
import { UpdateEmailDto } from './dto/update-email.dto'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class EmailService {
	constructor(private readonly mailer: MailerService) {}
	async create(email: CreateEmailDto) {
		const a = await this.mailer.verifyAllTransporters()
		console.log(a.valueOf(), ' mailer')
		console.log(email, ' email')

		return 'This action adds a new email'
	}
}
