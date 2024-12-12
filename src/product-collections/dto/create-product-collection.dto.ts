import { IsArray, IsOptional, IsString } from 'class-validator'

export class CreateProductCollectionDto {
	@IsOptional()
	@IsString()
	id?: string

	@IsOptional()
	@IsArray()
	allProductsUserBuy?: string[]

	@IsOptional()
	@IsString()
	updatedAt?: Date

	@IsOptional()
	@IsString()
	createdAt?: Date
}
