import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from '../prismaControl/prisma.service'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		const user = await this.existUser(createUserDto.id)
		if (user) throw new BadRequestException('user is also exist')

		return this.prisma.user.create({
			data: createUserDto,
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
		const user = await this.existUser(id)
		if (!user || user === null || user === undefined)
			throw new BadRequestException('user is not exist')

		return this.prisma.user.update({
			where: { id },
			data: updateUserDto,
		})
	}

	async remove(id: string) {
		const user = await this.existUser(id)
		if (!user || user === null || user === undefined)
			throw new BadRequestException('user is not exist')

		return this.prisma.user.delete({
			where: { id },
		})
	}

	private async existUser(id: string) {
		return await this.prisma.user.findFirst({
			where: { id },
		})
	}
}
