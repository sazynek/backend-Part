import { EnumProductCategories } from '@prisma/client'
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'


export class CreateCategoryDto {
	@IsOptional()
	@IsString()
	id?: string

	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	productCategories: EnumProductCategories

	@IsOptional()
	@IsString()
	updatedAt?: Date

	@IsOptional()
	@IsString()
	createdAt?: Date
}
