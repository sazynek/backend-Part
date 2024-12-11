import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

interface IJwt {
	id?: string
	email?: string
	name?: string
	supportComment?: string
	updatedAt?: string
	createdAt?: string
	iat: string
	exp: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET,
		})
	}

	async validate(payload: IJwt) {
		return payload
	}
}
