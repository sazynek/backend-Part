import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common'
import { ProductCollectionsService } from './product-collections.service'
import { CreateProductCollectionDto } from './dto/create-product-collection.dto'
import { UpdateProductCollectionDto } from './dto/update-product-collection.dto'

@Controller('product-collections')
export class ProductCollectionsController {
	constructor(
		private readonly productCollectionsService: ProductCollectionsService,
	) {}

	@Post()
	async create(
		@Body() createProductCollectionDto: CreateProductCollectionDto,
	) {
		return await this.productCollectionsService.create(
			createProductCollectionDto,
		)
	}

	@Get()
	async findAll() {
		return await this.productCollectionsService.findAll()
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return await this.productCollectionsService.remove(id)
	}
}
