import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
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
	@Put(':id')
	update(
		@Param('id') id: string,
		@Body() createStatusProductDto: UpdateStatusProductDto,
	) {
		return this.statusProductService.update(id, createStatusProductDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.statusProductService.remove(id)
	}
}
