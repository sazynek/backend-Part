import { EnumStatus } from '@prisma/client'
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

export class CreateStatusProductDto {
	@IsOptional()
	@IsString()
	id?: string

	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	famous?: EnumStatus

	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	rating?: string

	@IsOptional()
	@IsString()
	userLike?: boolean

	@IsOptional()
	@IsString()
	updatedAt?: Date

	@IsOptional()
	@IsString()
	createdAt?: Date
}
