import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'

import { Request } from 'express'
import { PrismaService } from '../prismaControl/prisma.service'

@Injectable()
export class CommentsService {
	constructor(private readonly prisma: PrismaService) {}
	create(req: Request, createCommentDto: CreateCommentDto) {
		const { id } = req.user as any
		return this.prisma.comments.create({
			data: createCommentDto,
			include: {
				user: {
					where: { id },
				},
			},
		})
	}

	findAll() {
		const comments = this.prisma.comments.findMany()
		if (!comments || comments === undefined || comments === null)
			throw new NotFoundException('you comments is not find')
		return comments
	}

	remove(req: Request) {
		const { id } = req.user as any
		const a = this.prisma.comments.findFirst({
			where: {
				user: {
					id,
				},
			},
		})
		return this.prisma.comments.delete({
			where: id,
		})
	}
}
