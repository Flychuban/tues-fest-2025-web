import Link from 'next/link';

import { Card } from '@/components/ui/card';
import { GradientHeading } from '@/components/ui/gradient-heading';
import { TF_YEAR, TUES_AGE } from '@/constants/event';
import Calculator from '@/partials/apply/Calculator';

export const metadata = {
	title: 'Кандидатстване в ТУЕС',
	description:
		'Научете как може да кандидатствате в ТУЕС след НВО на 7ми клас в ТУЕС - Технологично училище "Електронни системи"',
	keywords: [
		'туес',
		'туес фест',
		'кандидатстване',
		'калкулатор',
		'калкулатор на бал',
		'изчисли бал',
		`изчисли бал ${TF_YEAR}`,
		'изчисли си бала',
		`изчисли си бала ${TF_YEAR}`,
		`изчисли бал ${TF_YEAR} туес`,
		'кандидатстване в туес',
		`кандидатстване в туес ${TF_YEAR}`,
		'нво',
		`нво ${TF_YEAR}`,
		`нво ${TF_YEAR} туес`,
		'матури',
		`матури ${TF_YEAR}`,
		'матури 7ми клас',
		'матури 7 клас',
		`матури ${TF_YEAR} туес`,
		'матури 7ми клас туес',
		'матури 7 клас туес',
		'седми клас',
		'седми клас туес',
		'осми клас',
		'гимназия',
		'гимназии',
		'топ гимназии',
		`топ гимназии ${TF_YEAR}`,
		'топ училища',
		`топ училища ${TF_YEAR}`,
		'софия',
		'софия туес',
		'минимален бал',
		'минимален бал туес',
		'висок бал',
		'най-висок бал',
	],
};

const ApplyPage = () => (
	<div className="flex w-full flex-col gap-8 p-8 md:grid md:grid-cols-5 md:p-12">
		<Card className="p-10 md:col-span-5">
			<GradientHeading>Защо ТУЕС?</GradientHeading>
			<p className="text-justify">
				Технологично училище „Електронни системи“ към Технически Университет - София е специализирано
				технологично училище от национално значение, което вече {TUES_AGE} години подготвя бъдещите лидери на ИТ
				сектора в България и отвъд.
			</p>
			<p className="text-justify">
				За 2024 година, ТУЕС се нареди на второ място по минимален бал на първо класиране в 7-и клас!
			</p>
			<div className="relative flex w-full flex-col items-start gap-8 lg:flex-row">
				<div className="flex w-full flex-col gap-4">
					<p className="text-lg">Кое прави ТУЕС уникално училище?</p>
					<ul className="flex w-full flex-col gap-4">
						<li className="text-md rounded-xl border p-4 backdrop-blur-sm sm:backdrop-blur-md">
							Специализиран учебен план
						</li>
						<li className="text-md rounded-xl border p-4 backdrop-blur-sm sm:backdrop-blur-md">
							Училище интегрирано във ВУЗ
						</li>
						<li className="text-md rounded-xl border p-4 backdrop-blur-sm sm:backdrop-blur-md">
							Преподават завършили ТУЕС
						</li>
						<li className="text-md rounded-xl border p-4 backdrop-blur-sm sm:backdrop-blur-md">
							Тясна връзка с ИТ бранша
						</li>
					</ul>
				</div>
				<div className="border- w-full shrink-0 overflow-hidden rounded-xl border lg:w-3/5 xl:w-2/5">
					<img src="/assets/apply/whytues.png" alt="Защо ТУЕС?" />
				</div>
			</div>
			<i>
				Научете повече за приема в ТУЕС и образователния модел на училището{' '}
				<Link href="https://elsys-bg.org/priem/red-i-uslovija-za-priem">
					<u>тук.</u>
				</Link>
			</i>
		</Card>

		<Card className="p-10 md:col-span-3">
			<GradientHeading size="md">Как да кандидатст&shy;вам?</GradientHeading>
			<p className="text-justify">
				За учебната 2025/2026 година в ТУЕС към ТУ-София ще се приемат ученици по следните специалности:
			</p>
			<ul className="flex flex-col gap-4">
				<li className="text-md rounded-xl border p-4 backdrop-blur-sm sm:backdrop-blur-md">
					Системно програмиране – 2 паралелки, всяка по 26 ученици
				</li>
				<li className="text-md rounded-xl border p-4 backdrop-blur-sm sm:backdrop-blur-md">
					Компютърни мрежи – 1 паралелка от 26 ученици
				</li>
				<li className="text-md rounded-xl border p-4 backdrop-blur-sm sm:backdrop-blur-md">
					Програмиране на изкуствен интелект – 1 паралелка от 26 ученици
				</li>
			</ul>
			<p>Балът се образува от сбора на:</p>
			<ul className="flex flex-col gap-4">
				<li className="text-md rounded-xl border p-4 backdrop-blur-sm sm:backdrop-blur-md">
					резултата по <b>български език и литература от НВО</b>
				</li>
				<li className="text-md rounded-xl border p-4 backdrop-blur-sm sm:backdrop-blur-md">
					3 пъти резултата по <b>математика от НВО</b>
				</li>
				<li className="text-md rounded-xl border p-4 backdrop-blur-sm sm:backdrop-blur-md">
					оценката по <b>математика</b> от свидетелството за завършен 7. клас
				</li>
				<li className="text-md rounded-xl border p-4 backdrop-blur-sm sm:backdrop-blur-md">
					оценката по <b>физика</b> от свидетелството за завършен 7. клас
				</li>
			</ul>
			<i>
				Научете повече за приема в ТУЕС{' '}
				<Link href="https://elsys-bg.org/priem/red-i-uslovija-za-priem">
					<u>тук.</u>
				</Link>
			</i>
		</Card>

		<Calculator className="md:col-span-2" />
	</div>
);

export default ApplyPage;
