import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common'
import { PraiseService } from './praise.service'
import { CreatePraiseDto } from './dto/create-praise.dto'
import { UpdatePraiseDto } from './dto/update-praise.dto'

@Controller('praise')
export class PraiseController {
	constructor(private readonly praiseService: PraiseService) {}

	@Post()
	create(@Body() createPraiseDto: CreatePraiseDto) {
		return this.praiseService.create(createPraiseDto)
	}

	@Get()
	findAll() {
		return this.praiseService.findAll()
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.praiseService.remove(id)
	}
}
