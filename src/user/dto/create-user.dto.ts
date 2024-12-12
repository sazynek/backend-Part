import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsStrongPassword,
	MinLength,
} from 'class-validator'

export class CreateUserDto {
	@IsOptional()
	@IsString()
	id?: string

	@IsNotEmpty()
	@IsString()
	@MinLength(1)
	@IsEmail({}, { message: 'Not a Email' })
	email: string

	@IsNotEmpty()
	@IsString()
	@IsStrongPassword({}, { message: 'Is not good password' })
	password: string

	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	supportComment?: string

	@IsOptional()
	@IsString()
	updatedAt?: Date

	@IsOptional()
	@IsString()
	createdAt?: Date
}
