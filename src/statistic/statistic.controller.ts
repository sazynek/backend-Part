import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common'
import { StatisticService } from './statistic.service'
import { CreateStatisticDto } from './dto/create-statistic.dto'
import { UpdateStatisticDto } from './dto/update-statistic.dto'

@Controller('statistic')
export class StatisticController {
	constructor(private readonly statisticService: StatisticService) {}

	@Get(':id')
	findOne(
		@Param() id: string,
		@Body() createStatisticDto: CreateStatisticDto,
	) {
		return this.statisticService.findOne(id, createStatisticDto)
	}

	@Get()
	findAll() {
		return this.statisticService.findAll()
	}
}
