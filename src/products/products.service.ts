import { Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { PrismaService } from '../prismaControl/prisma.service'

@Injectable()
export class ProductsService {
	constructor(private readonly prisma: PrismaService) {}
	create(createProductDto: CreateProductDto) {
		return this.prisma.products.create({
			data: {
				title: createProductDto.title,
				imgUrl: createProductDto.imgUrl,
				time: createProductDto.time,
				id: createProductDto.id,
			},
			include: {
				categories: true,
				praise: true,
				productCollections: true,
				statistic: true,
				statusProduct: true,
				user: true,
			},
		})
	}

	findAll() {
		return this.prisma.products.findMany({
			include: {
				categories: true,
				praise: true,
				productCollections: true,
				statusProduct: true,
				user: true,
			},
		})
	}

	findOne(id: string) {
		return this.prisma.products.findFirst({
			where: { id },
			include: {
				categories: true,
				praise: true,
				productCollections: true,
				statusProduct: true,
				user: true,
			},
		})
	}

	remove(id: string) {
		return this.prisma.products.delete({
			where: { id },
		})
	}
}
