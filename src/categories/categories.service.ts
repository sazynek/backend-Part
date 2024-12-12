import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { PrismaService } from '../prismaControl/prisma.service'

@Injectable()
export class CategoriesService {
	constructor(private readonly prisma: PrismaService) {}
	create(createProductDto: CreateCategoryDto) {
		return this.prisma.categories.create({
			data: createProductDto,
		})
	}

	findAll() {
		return this.prisma.categories.findMany()
	}

	remove(id: string) {
		return this.prisma.categories.delete({
			where: { id },
		})
	}
}
