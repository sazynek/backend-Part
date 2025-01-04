import { Controller, Get, Body } from '@nestjs/common'
import { EmailService } from './email.service'
import { CreateEmailDto } from './dto/create-email.dto'

@Controller('email')
export class EmailController {
	constructor(private readonly emailService: EmailService) {}

	@Get()
	create(@Body() createEmailDto: CreateEmailDto) {
		return this.emailService.create(createEmailDto)
	}
}
