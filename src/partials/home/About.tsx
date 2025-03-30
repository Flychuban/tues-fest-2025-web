import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ABOUT_BUTTON, ABOUT_IMAGE, ABOUT_TITLE } from '@/constants/home/about';

const About = () => (
	<section id="about" className="px-4 py-12 md:px-8">
		<div className="flex flex-col gap-8 lg:flex-row">
			{/* Text info */}
			<div className="flex w-full flex-col gap-4">
				<h2 className="text-primary font-title text-4xl font-bold sm:text-5xl">{ABOUT_TITLE}</h2>

				<p className="text-foreground">
					Денят на отворените врати на Технологично училище „Електронни системи“ към Техническия университет -
					София, познат като ТУЕС ФЕСТ, наближава. Той ще се проведе на 20 и 21 април 2024 година на
					територията на София Тех Парк в Иновационен Форум „Джон Атанасов“.
				</p>

				<p className="text-foreground">
					Ще имате възможност да се запознаете с ТУЕС към ТУ-София отблизо и с това какво ни прави различното
					училище:
				</p>

				<ul className="text-foreground">
					<li>✔️ Връзката ни с ИТ бизнеса; </li>
					<li>✔️ Образователния ни модел;</li>
					<li>✔️ Силната и задружна общност;</li>
					<li>✔️ Връзката между настоящи и завършили възпитаници; </li>
					<li>✔️ Специалностите и предметите, които се изучават в ТУЕС към ТУ-София.</li>
				</ul>

				<p className="text-foreground">
					TUES FEST 2024 &quot;Expand your horizon & Celebration through Innovation&quot; се организира от
					ученици за ученици! Доброволческият екип на организаторите вярват, че за поредна година ще покажат
					на света какво е да си ученик в ТУЕС към ТУ - София.
				</p>

				<p className="text-foreground">
					Следете страницата на събитието{' '}
					<Link
						href="https://www.facebook.com/HackTUES"
						target="_blank"
						className="text-primary hover:text-primary/80 font-medium underline underline-offset-4"
					>
						Hack TUES § TUES FEST
					</Link>
					!
				</p>

				<Button asChild variant="default" size="lg" className="font-bold uppercase">
					<Link href="https://elsys-bg.org" target="_blank" className="flex items-center gap-2">
						{ABOUT_BUTTON}
						<ExternalLink className="h-4 w-4" />
					</Link>
				</Button>
			</div>

			{/* Image */}
			<div className="w-full">
				<div className="overflow-hidden rounded-lg">
					<img
						src={ABOUT_IMAGE || '/placeholder.svg'}
						alt="TUES FEST"
						className="aspect-video w-full rounded-lg object-cover object-bottom shadow-md transition-all duration-300 hover:scale-105"
					/>
				</div>
			</div>
		</div>

		{/* <div className="mt-8 flex justify-center">
					<Button asChild variant="default" size="lg" className="font-bold uppercase">
						<Link href="https://elsys-bg.org" target="_blank" className="flex items-center gap-2">
							{ABOUT_BUTTON}
							<ExternalLink className="h-4 w-4" />
						</Link>
					</Button>
				</div> */}
	</section>
);

export default About;
