import { Injectable } from '@nestjs/common'
import { CreateStatusProductDto } from './dto/create-status-product.dto'
import { UpdateStatusProductDto } from './dto/update-status-product.dto'
import { PrismaService } from '../prismaControl/prisma.service'

@Injectable()
export class StatusProductService {
	constructor(private readonly prisma: PrismaService) {}
	create(createProductDto: CreateStatusProductDto) {
		return this.prisma.statusProducts.create({
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
