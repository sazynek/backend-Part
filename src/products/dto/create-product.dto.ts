import { Praise, User } from '@prisma/client'
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsStrongPassword,
	MinLength,
} from 'class-validator'

export class CreateProductDto {
	@IsOptional()
	@IsString()
	id?: string

	@IsNotEmpty()
	@IsString()
	@MinLength(1)
	title: string

	@IsNotEmpty()
	@IsString()
	@MinLength(1)
	imgUrl: string

	@IsNotEmpty()
	@IsString()
	@MinLength(1)
	time: string

	@IsOptional()
	@IsString()
	updatedAt?: Date

	@IsOptional()
	@IsString()
	createdAt?: Date

	@IsOptional()
	@IsString()
	praiseId?: string

	@IsOptional()
	@IsString()
	productCollectionsId?: string

	@IsOptional()
	@IsString()
	statusProductId?: string

	@IsOptional()
	@IsString()
	userId?: string
}
