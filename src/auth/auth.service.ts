import { Injectable } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
	constructor(private readonly user: UserService) {}

	async login(createUserDto: CreateAuthDto) {
		return this.user.create(createUserDto)
	}

	async register(createUserDto: CreateAuthDto) {
		return this.user.create(createUserDto)
	}

	async logout() {
		return
	}

	// async remove(id: string) {}
}
