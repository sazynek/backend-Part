import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	await app.listen(process.env.PORT ?? 3100)
	app.use(cookieParser())
	app.setGlobalPrefix('api')
	app.enableCors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
}
bootstrap()
