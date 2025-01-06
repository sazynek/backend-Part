import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor() {
		console.log('google guard')

		super({
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
			scope: ['email', 'profile'],
		})
	}

	async validate(
		acc_token: string,
		rf_token: string,
		profile: unknown,
		done: VerifyCallback,
	) {
		if (profile) {
			//@ts-ignore
			const { name, emails, photos } = profile
			const user = {
				email: emails[0].value,
				name: name.familyName + ' ' + name.givenName,
				picture: photos[0].value,
			}
			// console.log(user)

			return user
		}
	}
}
