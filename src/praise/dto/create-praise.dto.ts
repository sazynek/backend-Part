import { EnumPraiseStatus } from '@prisma/client'
import {
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MinLength,
} from 'class-validator'

export class CreatePraiseDto {
	@IsOptional()
	@IsString()
	id?: string

	@IsNumber()
	@IsNotEmpty()
	@MinLength(1)
	cost: number

	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	praiseStatus: EnumPraiseStatus

	@IsOptional()
	@IsString()
	updatedAt?: Date

	@IsOptional()
	@IsString()
	createdAt?: Date
}
