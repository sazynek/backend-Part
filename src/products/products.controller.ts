import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Query,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { EnumProductCategories } from '@prisma/client'

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	create(@Body() createProductDto: CreateProductDto) {
		return this.productsService.create(createProductDto)
	}

	@Get()
	findAll() {
		return this.productsService.findAll()
	}

	@Get('filter')
	findByParams(
		@Query()
		query: {
			search?: string
			categ?: EnumProductCategories
			praise?: string
		},
	) {
		// console.log({...query,praise: +query?.praise!})

		return this.productsService.findOne({
			...query,
			praise: +query?.praise!,
		})
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.productsService.remove(id)
	}

	@Post('filter')
	filter(@Query() query: any) {
		return this.productsService.filter(query)
	}
}
