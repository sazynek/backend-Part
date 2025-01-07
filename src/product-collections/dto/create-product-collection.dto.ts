import {
	IsArray,
	IsNumber,
	IsOptional,
	isString,
	IsString,
} from 'class-validator'

export class CreateProductCollectionDto {
	@IsOptional()
	@IsString()
	id?: string

	@IsOptional()
	@IsString()
	alt?: string

	@IsNumber()
	cost?: number
	@IsString()
	famous?: string

	@IsString()
	@IsOptional()
	idProduct?: string

	@IsString()
	@IsOptional()
	imgUrl?: string

	@IsString()
	@IsOptional()
	rating?: string

	@IsString()
	@IsOptional()
	time?: string

	@IsString()
	@IsOptional()
	title?: string

	@IsString()
	@IsOptional()
	userLike?: boolean

	@IsOptional()
	@IsString()
	updatedAt?: Date

	@IsOptional()
	@IsString()
	createdAt?: Date
}
