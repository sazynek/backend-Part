import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { Injectable } from '@nestjs/common'

@Injectable()
export class Google extends PassportStrategy(Strategy, 'google') {
	constructor() {
		console.log('ah');
		
		super({
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.CALLBACK_URL,
			scope: ['email', 'profile'],
		})
	}

	async validate(
		acc_token: string,
		rf_token: string,
		email: string,
		profile: unknown,
		done: VerifyCallback,
	): Promise<unknown> {
		console.log('bb');
		//@ts-ignore
		const { name, emails, photos } = profile
		const user = {
			email: emails[0].value,
			firstName: name.givenName,
			lastName: name.familyName,
			picture: photos[0].value,
			acc_token,
		}

		console.log(user)
		return
	}
}
