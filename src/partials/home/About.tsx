import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GradientHeading } from '@/components/ui/gradient-heading';
import { ABOUT_BUTTON, ABOUT_IMAGE, ABOUT_TITLE } from '@/constants/home/about';

const About = () => (
	<section id="about" className="px-4 py-12 md:px-8">
		<div className="flex flex-col gap-8 lg:flex-row">
			{/* Text info */}
			<div className="flex w-full flex-col gap-4">
				<GradientHeading size="lg">{ABOUT_TITLE}</GradientHeading>

				<p className="text-foreground">
					Денят на отворените врати на Технологично училище &quot;Електронни системи&quot; към Техническия университет -
					София, познат като ТУЕС ФЕСТ, наближава. Той ще се проведе на 27 Април 2025 година на
					територията на площад &quot;Независимост&quot; под куполите на &quot;Ларгото&quot;.
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
					TUES FEST 2025 &quot;IT ALL STARTS HERE&quot; се организира от
					ученици за ученици, под менторството на АЗТУЕС! Доброволческият екип на организаторите вярват, че за поредна година ще покажат
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
