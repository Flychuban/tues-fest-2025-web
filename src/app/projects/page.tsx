import Link from 'next/link';
import { Rocket } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { GradientHeading } from '@/components/ui/gradient-heading';
import { PROJECT_REGISTRATION_FORM_URL } from '@/constants/projects';
import { TF_TITLE } from '@/constants/seo';

export default function ProjectsComingSoonPage() {
	return (
		<div className="flex h-full w-full items-center justify-center p-4 md:p-12">
			<Card className="w-full max-w-3xl gap-7 p-10 sm:text-center">
				<CardHeader>
					<GradientHeading size="md" className="text-center">
						<CardTitle>Проектите все още се регистрират!</CardTitle>
					</GradientHeading>
					<CardDescription>
						<p>
							Все още можеш да участваш в {TF_TITLE} със свой проект. Регистрирай се сега! Регистрацията
							затваря на <time dateTime="06.04.2025 23:59">06.04.2025 23:59</time>
						</p>
					</CardDescription>
				</CardHeader>
				<CardFooter className="flex justify-center">
					<Button size="xl" className="font-bold uppercase" asChild>
						<Link href={PROJECT_REGISTRATION_FORM_URL} target="_blank">
							<Rocket className="mr-2 size-5" />
							<span>Участвай с проект</span>
						</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
