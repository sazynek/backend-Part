import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator'

export class CreateStatisticDto {
	@IsOptional()
	@IsString()
	id?: string

	@IsOptional()
	@IsNumber()
	@MinLength(1)
	cost?: number

	@IsOptional()
	@IsString()
	@MinLength(1)
	popular?: string

	@IsOptional()
	@IsString()
	@MinLength(1)
	quality?: string

	@IsOptional()
	@IsString()
	updatedAt?: Date

	@IsOptional()
	@IsString()
	createdAt?: Date
}
