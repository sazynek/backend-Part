import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { PrismaService } from '../prismaControl/prisma.service'
import { UpdateProductDto } from './dto/update-product.dto'
import { EnumProductCategories } from '@prisma/client'

@Injectable()
export class ProductsService {
	constructor(private readonly prisma: PrismaService) {}
	async create(createProductDto: CreateProductDto) {
		return await this.prisma.products.create({
			data: {
				title: createProductDto.title,
				imgUrl: createProductDto.imgUrl,
				time: createProductDto.time,
				id: createProductDto.id,
				praiseId: createProductDto.praiseId ?? '',
				productCollectionsId:
					createProductDto.productCollectionsId ?? '',
				statusProductId: createProductDto.statusProductId ?? '',
				userId: createProductDto.userId ?? '', // TODO: get user id
			},
		})
	}

	async findAll() {
		return JSON.stringify(
			await this.prisma.products.findMany({
				orderBy: { createdAt: 'asc' },
				include: {
					categories: {
						select: {
							productCategories: true,
						},
					},
					praise: {
						select: {
							cost: true,
							praiseStatus: true,
						},
					},
					statusProduct: {
						select: {
							famous: true,
							rating: true,
							userLike: true,
						},
					},
					user: {
						select: {
							id: true,
							name: true,
							email: true,
						},
					},
				},
			}),
		)
	}

	async findOne(query: {
		search?: string
		categ?: EnumProductCategories
		praise?: number
	}) {
		return await this.prisma.products.findMany({
			where: {
				AND: [
					{
						title: {
							contains: query?.search === '' ? '' : query?.search,
						},
					},
					{
						praise: {
							cost: {
								gte: query.praise ?? 0,
							},
						},
					},
					{
						categories: {
							some: {
								productCategories: {
									equals:
										//@ts-ignore
										query?.categ === ''
											? 'chicken'
											: query.categ,
								},
							},
						},
					},
				],
			},
			orderBy: { createdAt: 'asc' },
			include: {
				categories: {
					select: {
						productCategories: true,
					},
				},
				praise: {
					select: {
						cost: true,
						praiseStatus: true,
					},
				},
				statusProduct: {
					select: {
						famous: true,
						rating: true,
						userLike: true,
					},
				},
				user: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
			},
		})
	}

	async remove(id: string) {
		return await this.prisma.products.delete({
			where: { id },
		})
	}

	async filter(query: UpdateProductDto) {
		{
		}
		console.log(Object.entries(query))
		if (
			Object.keys(query).length === 0 ||
			Object.values(query).includes('')
		)
			throw new NotFoundException("we don't have query params")
		return await this.prisma.products.findMany({
			where: {
				id: query.id,
			},
		})
	}
}
