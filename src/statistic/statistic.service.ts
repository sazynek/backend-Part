import { Injectable } from '@nestjs/common'
import { UpdateStatisticDto } from './dto/update-statistic.dto'
import { CreateStatisticDto } from './dto/create-statistic.dto'

@Injectable()
export class StatisticService {
	create(createStatisticDto: CreateStatisticDto) {
		return 'This action adds a new statictic'
	}

	findAll() {
		return `This action returns all statictic`
	}

	findOne(id: number) {
		return `This action returns a #${id} statictic`
	}

	update(id: number, updateStatisticDto: UpdateStatisticDto) {
		return `This action updates a #${id} statictic`
	}

	remove(id: number) {
		return `This action removes a #${id} statictic`
	}
}
