import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true })
	await app.listen(process.env.PORT ?? 3100)
	app.use(cookieParser())
	app.enableCors({
		origin: 'http://localhost:3000',
		credentials: true,
		allowedHeaders: '*',
		optionsSuccessStatus: 204,
	})
}
bootstrap()
