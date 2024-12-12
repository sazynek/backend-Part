import { IsOptional, IsString, MinLength } from 'class-validator'

export class CreateCommentDto {
	@IsOptional()
	@IsString()
	id?: string

	@IsOptional()
	@MinLength(1)
	content?: string

	@IsOptional()
	@IsString()
	updatedAt?: Date

	@IsOptional()
	@IsString()
	createdAt?: Date
}
