import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common'
import { StatusProductService } from './status-product.service'
import { CreateStatusProductDto } from './dto/create-status-product.dto'
import { UpdateStatusProductDto } from './dto/update-status-product.dto'

@Controller('status-product')
export class StatusProductController {
	constructor(private readonly statusProductService: StatusProductService) {}

	@Post()
	create(@Body() createStatusProductDto: CreateStatusProductDto) {
		return this.statusProductService.create(createStatusProductDto)
	}

	@Get()
	findAll() {
		return this.statusProductService.findAll()
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.statusProductService.remove(id)
	}
}
