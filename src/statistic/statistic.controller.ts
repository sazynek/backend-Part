import { Controller, Get, Param } from '@nestjs/common'
import { StatisticService } from './statistic.service'

@Controller('statistic')
export class StatisticController {
	constructor(private readonly statisticService: StatisticService) {}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.statisticService.findOne(id)
	}

	@Get()
	findAll() {
		return this.statisticService.findAll()
	}
}
