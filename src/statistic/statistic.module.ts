import { Module } from '@nestjs/common'
import { StatisticService } from './statistic.service'
import { StatisticController } from './statistic.controller'
import { PrismaModule } from '../prismaControl/prisma.module'

@Module({
	imports: [PrismaModule],
	controllers: [StatisticController],
	providers: [StatisticService],
})
export class StatisticModule {}
