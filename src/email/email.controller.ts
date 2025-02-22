import { Controller, Get, Body, Post } from '@nestjs/common'
import { EmailService } from './email.service'
import { CreateEmailDto } from './dto/create-email.dto'

@Controller('email')
export class EmailController {
	constructor(private readonly emailService: EmailService) {}

	@Post()
	create(@Body() createEmailDto: CreateEmailDto) {
		return this.emailService.create(createEmailDto)
	}
}
