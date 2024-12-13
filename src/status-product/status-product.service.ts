import { Injectable } from '@nestjs/common'
import { CreateStatusProductDto } from './dto/create-status-product.dto'
import { PrismaService } from '../prismaControl/prisma.service'
import { UpdateStatusProductDto } from './dto/update-status-product.dto'

@Injectable()
export class StatusProductService {
	constructor(private readonly prisma: PrismaService) {}
	async create(createProductDto: CreateStatusProductDto) {
		return await this.prisma.statusProducts.create({
			data: {
				famous: createProductDto.famous!,
				rating: createProductDto.rating!,
				userLike: createProductDto.userLike ?? false,
			},
		})
	}

	async findAll() {
		return await this.prisma.statusProducts.findMany()
	}

	update(id: string, updateStatisticDto: UpdateStatusProductDto) {
		return this.prisma.statusProducts.update({
			where: { id },
			data: {
				...updateStatisticDto,
				userLike: updateStatisticDto.userLike,
			},
		})
	}
	async remove(id: string) {
		return await this.prisma.statusProducts.delete({
			where: { id },
		})
	}
}
