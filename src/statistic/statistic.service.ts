import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prismaControl/prisma.service'

@Injectable()
export class StatisticService {
	constructor(private readonly prisma: PrismaService) {}

	async findOne(id: string) {
		return await this.prisma.statistic.findFirst({
			where: { id },
			include: {
				articles: true,
				products: true,
				user: true,
			},
		})
	}
	async findAll() {
		const stat = await this.prisma.statistic.findMany({
			include: {
				articles: true,
				products: true,
				user: true,
			},
		})
		console.log(stat)
		return stat
	}
}
