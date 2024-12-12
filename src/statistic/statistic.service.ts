import { Injectable } from '@nestjs/common'
import { UpdateStatisticDto } from './dto/update-statistic.dto'
import { CreateStatisticDto } from './dto/create-statistic.dto'
import { PrismaService } from '../prismaControl/prisma.service'

@Injectable()
export class StatisticService {
	constructor(private readonly prisma: PrismaService) {}
	create(createStatisticDto: CreateStatisticDto) {
		return this.prisma.statistic
	}
	findOne(id: number) {
		return this.prisma.statistic
	}

	update(id: number, updateStatisticDto: UpdateStatisticDto) {
		return this.prisma.statistic
	}

	remove(id: number) {
		return this.prisma.statistic
	}
}
