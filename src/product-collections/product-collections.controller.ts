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
	create(@Body() createProductCollectionDto: CreateProductCollectionDto) {
		return this.productCollectionsService.create(createProductCollectionDto)
	}

	@Get()
	findAll() {
		return this.productCollectionsService.findAll()
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.productCollectionsService.remove(id)
	}
}
