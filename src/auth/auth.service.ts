import { Injectable, UnauthorizedException } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(
		private readonly user: UserService,
		private readonly jwt: JwtService,
	) {}

	async login(createUserDto: CreateAuthDto) {
		const resultUser = await this.user.existUser(createUserDto)
		if (!resultUser || resultUser === null || resultUser === undefined)
			throw new UnauthorizedException('user is not login in account')
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = resultUser as CreateAuthDto
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { acc_token, rf_token } = await this.generateTokens(resultUser)
		return { ...user, acc_token }
	}

	async register(createUserDto: CreateAuthDto) {
		const userCheck = await this.user.existUser(createUserDto)
		if (userCheck) throw new UnauthorizedException('user is has account')
		const resultUser = await this.user.create(createUserDto)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = resultUser
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { acc_token, rf_token } = await this.generateTokens(resultUser)

		return { ...user, acc_token }
		// return undefined
	}

	async logout() {
		return
	}
	private async generateTokens(payload: CreateAuthDto | any) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...rest } = payload as CreateAuthDto
		const tokens = [
			{ rf_token: await this.jwt.signAsync(rest) },
			{ acc_token: await this.jwt.signAsync(rest) },
		]
		const result = { ...tokens[1], ...tokens[0] }
		return result
	}
}
