import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateArticleDto {
	@IsOptional()
	@IsString()
	id?: string

	@IsString()
	@IsNotEmpty()
	title: string

	@IsString()
	@IsNotEmpty()
	publicDate: string

	@IsString()
	@IsNotEmpty()
	imgUrl: string

	@IsOptional()
	@IsString()
	author?: string

	@IsOptional()
	@IsString()
	updatedAt?: Date

	@IsOptional()
	@IsString()
	createdAt?: Date
}
