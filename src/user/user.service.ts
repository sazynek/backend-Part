import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from '../prismaControl/prisma.service'
import { CreateUserGoogleDto } from './dto/create-user-google.dto.'
import { uniqueId } from 'lodash-es'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		return this.prisma.user.create({
			data: createUserDto,
		})
	}
	async createFromGoogle(createUserDto: CreateUserGoogleDto) {
		return this.prisma.user.create({
			data: { ...createUserDto, password: uniqueId('google__') },
		})
	}

	findAll() {
		return this.prisma.user.findMany()
	}
	findOne(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
		})
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		const user = await this.existUser({ id })
		if (!user || user === null || user === undefined)
			throw new BadRequestException('user is not exist')

		return this.prisma.user.update({
			where: { id },
			data: updateUserDto,
		})
	}

	async remove(id: string) {
		const user = await this.existUser({ id })
		if (!user || user === null || user === undefined)
			throw new BadRequestException('user is not exist')

		return this.prisma.user.delete({
			where: { id: id },
			include: { statistic: {} },
		})
	}
	async existUser(createUserDto: UpdateUserDto) {
		return await this.prisma.user.findFirst({
			where: {
				OR: [
					{ id: createUserDto.id },
					{ email: createUserDto.email },
					{ password: createUserDto.password },
				],
			},
		})
	}
}
