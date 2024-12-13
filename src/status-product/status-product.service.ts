import { Injectable } from '@nestjs/common'
import { CreateStatusProductDto } from './dto/create-status-product.dto'
import { PrismaService } from '../prismaControl/prisma.service'

@Injectable()
export class StatusProductService {
	constructor(private readonly prisma: PrismaService) {}
	async create(createProductDto: CreateStatusProductDto) {
		return await this.prisma.statusProducts.create({
			data: createProductDto,
		})
	}

	async findAll() {
		return await this.prisma.statusProducts.findMany()
	}

	async remove(id: string) {
		return await this.prisma.statusProducts.delete({
			where: { id },
		})
	}
}
