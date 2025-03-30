import type { ReactElement } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EXPECTATIONS } from '@/constants/home/expectations';

const Expectation = ({ icon, title, text }: { icon: ReactElement; title: string; text: string }) => (
	<Card className="bg-card/80 border-border h-full backdrop-blur-sm transition-all duration-300 hover:scale-105">
		<CardHeader>
			<div className="bg-primary/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
				<div className="text-primary">{icon}</div>
			</div>
			<CardTitle className="text-xl">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<p className="text-muted-foreground">{text}</p>
		</CardContent>
	</Card>
);

const Expectations = () => (
	<section id="expectations" className="px-4 py-12 md:px-8">
		<h2 className="text-primary font-title mb-8 text-4xl font-black sm:text-5xl">На ТУЕС Фест очаквайте</h2>
		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{EXPECTATIONS.map((expectation) => (
				<Expectation key={expectation.title} {...expectation} />
			))}
		</div>
	</section>
);

export default Expectations;
