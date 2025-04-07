import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { GradientHeading } from '@/components/ui/gradient-heading';
import { TF_TITLE } from '@/constants/seo';

export default function ProjectComingSoonPage({ params }: { params: { id: string } }) {
	return (
		<div className="flex h-full w-full items-center justify-center p-4 md:p-12">
			<Card className="w-full max-w-3xl gap-7 p-10 sm:text-center">
				<CardHeader>
					<GradientHeading size="md" className="text-center">
						<CardTitle>Очаквайте скоро!</CardTitle>
					</GradientHeading>
					<CardDescription>
						<p>Детайлите за този проект от {TF_TITLE} скоро ще бъдат достъпни тук. Проверете по-късно!</p>
					</CardDescription>
				</CardHeader>
				<CardFooter className="flex justify-center">
					<Button variant="secondary" asChild>
						<Link href="/projects">
							<ArrowLeft className="mr-2 size-5" />
							<span>Към всички проекти</span>
						</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
