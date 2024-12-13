import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { PrismaService } from '../prismaControl/prisma.service'

@Injectable()
export class CategoriesService {
	constructor(private readonly prisma: PrismaService) {}
	async create(createProductDto: CreateCategoryDto) {
		return await this.prisma.categories.create({
			data: createProductDto,
		})
	}

	async findAll() {
		return await this.prisma.categories.findMany()
	}

	async remove(id: string) {
		return await this.prisma.categories.delete({
			where: { id },
		})
	}
}
