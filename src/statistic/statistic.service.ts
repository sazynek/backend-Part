import { Injectable } from '@nestjs/common'
import { CreateStatisticDto } from './dto/create-statistic.dto'
import { PrismaService } from '../prismaControl/prisma.service'

@Injectable()
export class StatisticService {
	constructor(private readonly prisma: PrismaService) {}

	findOne(id: string, createStatisticDto: CreateStatisticDto) {
		return this.prisma.statistic.findFirst({
			where: {
				OR: [{ id }, { id: createStatisticDto.id }],
			},
			include: {
				articles: true,
				products: true,
				user: true,
			},
		})
	}
	findAll() {
		return this.prisma.statistic.findMany({
			include: {
				articles: true,
				products: true,
				user: true,
			},
		})
	}
}
