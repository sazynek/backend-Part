import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateEmailDto } from './dto/create-email.dto'
import { MailerService } from '@nestjs-modules/mailer'
const inf = {
	subject: 'Welcome to our website Eatly!!!',
	html: `
	<ul style="display:flex;flex-direction:column;list-style-type: none;">
		<h1>Мы рады приветствовать вас в <u>Eatly</u>!!!</h1>
		<img style="width:700px;margin:0px auto;height:auto;" src="https://77.rospotrebnadzor.ru/images/pitanie_2.jpg" alt="logo" />
		</br>
		<li>
			Поздравляем с успешной регистрацией! Теперь вы являетесь частью нашего кулинарного мира, наполненного вкуснейшими блюдами, уютной атмосферой и незабываемыми моментами. Мы надеемся, что ваше путешествие вместе с нами будет ярким и насыщенным.
		</li>
		<br/>
		<li>Как наш новенький гость, вы получите:</li>
		<li>Персонализированные рекомендации для выбора блюд</li>
		<li>Возможность предварительного бронирования столиков на любимые даты</li>
		<li>Не забудьте заглянуть на наш сайт <b><a href="http://localhost:3000/home">eatly</a></b>, где вы можете ознакомиться с нашим меню, новыми акциями и мероприятиями.</li>
		<li>Если у вас возникнут вопросы или пожелания, не стесняйтесь обратиться к нашей команде по электронной почте <b><a href="https://mail.ru/">example@gmail.com</a></b> или по телефону <b>+7 (863) 732-84-21</b>. Мы всегда рады помочь!</li>
		<li>Спасибо, что выбрали нас. Мы с нетерпением ждем встречи с вами в <b>eatly</b>!</li>
		<li>С уважением,</li>
		<li>Команда <b>eatly</b></li>
		<br/>  
		<br/>
		<li>P.S. Подпишитесь на наши социальные сети, чтобы быть в курсе всех новостей и акций!</li>
	</ul>
	`,
}
@Injectable()
export class EmailService {
	constructor(private readonly mailer: MailerService) {}
	async create({ html, subject, text, to }: CreateEmailDto) {
		if (to !== '' || undefined || null) {
			try {
				// console.log(`Success`)
				return await this.mailer.sendMail({
					from: 'Eatly  ' + `<${process.env.GOOGLE_EMAIL_USER}>`,
					to: to,
					subject: subject ?? inf.subject,
					html: html ?? inf.html,
					text: text ?? '',
				})
			} catch (e) {
				console.log(`Error: ${e?.message ?? e}   `, e)
				throw new BadRequestException(
					`your email is not valid. Error: ${e?.message}`,
				)
			}
		}
	}
}
