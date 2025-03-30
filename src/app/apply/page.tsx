import Link from 'next/link';

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
	<div className="m-auto min-h-screen max-w-screen-2xl pt-28">
		<div className="">
			<div className="p-8 !pt-0 md:p-12">
				<div className="flex flex-col gap-4 rounded-xl border  bg-opacity-0 bg-clip-padding p-8  drop-shadow-lg backdrop-blur-sm backdrop-filter sm:p-10  sm:backdrop-blur-sm">
					<h2 className="bg-gradient bg-clip-text text-3xl font-black text-transparent sm:text-5xl">
						Защо ТУЕС?
					</h2>
					<p className="text-justify">
						Технологично училище „Електронни системи“ към Технически Университет - София е специализирано
						технологично училище от национално значение, което вече {TUES_AGE} години подготвя бъдещите
						лидери на ИТ сектора в България и отвъд.
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
				</div>
			</div>
			<div className="px-8 pb-8 md:px-12 md:pb-12">
				<div className="flex flex-col items-stretch gap-8 lg:flex-row">
					<div className="flex flex-col gap-4 rounded-xl border  bg-opacity-0  bg-clip-padding p-8 drop-shadow-lg backdrop-blur-sm backdrop-filter sm:p-10 sm:backdrop-blur-sm">
						<h2 className="bg-gradient bg-clip-text text-3xl font-black text-transparent sm:text-5xl">
							Как да кандидатствам?
						</h2>
						<p className="text-justify">
							За учебната 2024/2025 година в ТУЕС към ТУ-София ще се приемат ученици по следните
							специалности:
						</p>
						<ul className="flex flex-col gap-4">
							<li className="text-md rounded-xl border   p-4 backdrop-blur-sm sm:backdrop-blur-md">
								Системно програмиране с код 4810201 – 3 паралелки, всяка по 26 ученици
							</li>
							<li className="text-md rounded-xl border   p-4 backdrop-blur-sm sm:backdrop-blur-md">
								Компютърни мрежи с код 5230502 – 1 паралелка от 26 ученици
							</li>
						</ul>
						<p>Балът се образува от сбора на:</p>
						<ul className="flex flex-col gap-4">
							<li className="text-md rounded-xl border   p-4 backdrop-blur-sm sm:backdrop-blur-md">
								резултата по <b>български език и литература от НВО</b>
							</li>
							<li className="text-md rounded-xl border   p-4 backdrop-blur-sm sm:backdrop-blur-md">
								3 пъти резултата по <b>математика от НВО</b>
							</li>
							<li className="text-md rounded-xl border   p-4 backdrop-blur-sm sm:backdrop-blur-md">
								оценката по <b>математика</b> от свидетелството за завършен 7. клас
							</li>
							<li className="text-md rounded-xl border   p-4 backdrop-blur-sm sm:backdrop-blur-md">
								оценката по <b>физика</b> от свидетелството за завършен 7. клас
							</li>
						</ul>
						<i>
							Научете повече за приема в ТУЕС{' '}
							<Link href="https://elsys-bg.org/priem/red-i-uslovija-za-priem">
								<u>тук.</u>
							</Link>
						</i>
					</div>
					<Calculator />
				</div>
			</div>
		</div>
	</div>
);

export default ApplyPage;
