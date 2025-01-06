import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateEmailDto {
	@IsNotEmpty()
	@IsEmail()
	@IsString()
	to: string

	@IsEmail()
	@IsOptional()
	from?: string

	@IsString()
	@IsOptional()
	html?: string

	@IsString()
	@IsOptional()
	text?: string

	@IsString()
	@IsOptional()
	subject?: string
}
