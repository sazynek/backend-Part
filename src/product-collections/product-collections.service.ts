import { Injectable } from '@nestjs/common'
import { CreateProductCollectionDto } from './dto/create-product-collection.dto'
import { PrismaService } from '../prismaControl/prisma.service'

@Injectable()
export class ProductCollectionsService {
	constructor(private readonly prisma: PrismaService) {}
	create(createProductDto: CreateProductCollectionDto) {
		return this.prisma.productsCollections.create({
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