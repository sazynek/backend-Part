import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'

import { Request } from 'express'
import { PrismaService } from '../prismaControl/prisma.service'

@Injectable()
export class CommentsService {
	constructor(private readonly prisma: PrismaService) {}
	async create(req: Request, createCommentDto: CreateCommentDto) {
		const { id } = req.user as any
		return await this.prisma.comments.create({
			data: { ...createCommentDto, userId: id },
			include: {
				user: {
					where: { id },
				},
			},
		})
	}

	async findAll() {
		const comments = await this.prisma.comments.findMany()
		if (!comments || comments === undefined || comments === null)
			throw new NotFoundException('you comments is not find')
		return comments
	}

	async remove(req: Request, id: string) {
		const { id: userId } = req?.user as any
		console.log(userId, '---id is equal')
		if (userId === undefined || userId === null)
			throw new NotFoundException('you are not logged in')

		return await this.prisma.comments.delete({
			where: { id },
		})
	}
}
