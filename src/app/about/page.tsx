/* eslint-disable @next/next/no-img-element */
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { TbBriefcase, TbHistory, TbSchool, TbTrophy } from 'react-icons/tb';

import { Separator } from '@/components/ui/separator';
import { TF_YEAR, TUES_AGE } from '@/constants/event';

export const metadata = {
	title: 'За ТУЕС',
	description: `Научете повече за най-доброто училище в България - Технологично училище "Електронни системи", което през 2024 беше с втори най-висок бал за страната. ТУЕС е училище с ${TUES_AGE} години история, което е специализирано в областта на ИТ и единствено в България подготвя специалисти в областта на системно програмиране.`,
	keywords: [
		'туес',
		'туес фест',
		`туес фест ${TF_YEAR}`,
		'технологично училище електронни системи',
		'технологично',
		'училище',
		'електронни',
		'системи',
		`туес ${TF_YEAR}`,
		'кандидатстване',
		'училища софия',
		'училища',
		'софия',
		'софия туес',
		'най-добро училище',
		'най-добро училище в българия',
		'най-добро училище в софия',
		'висок бал',
		'елитно училище',
		'елитно',
		'училище в софия',
		'минимален бал',
		'минимален бал за туес',
		'минимален бал софия',
	],
} satisfies Metadata;

const AboutPage = () => {
	return (
		<div className="m-auto min-h-screen max-w-screen-2xl p-8 !pt-28 md:p-12">
			<div className="rounded-xl border border-[#F2F2F2] bg-opacity-0 bg-clip-padding p-10 drop-shadow-lg backdrop-blur-sm backdrop-filter  sm:border-2">
				<h2 className="bg-gradient bg-clip-text pb-4 text-3xl font-black text-transparent sm:text-5xl">
					За ТУЕС
					{/* <Separator className="bg-black h-1 rounded-lg mt-2 w-auto" /> */}
				</h2>

				<div className="flex flex-col items-center gap-8 !pt-0 md:pt-12 lg:flex-row">
					<div className="flex flex-col gap-4">
						<p className="text-md text-justify">
							Технологично училище „Електронни системи“ към Технически Университет - София е
							специализирано технологично училище от национално значение, което вече {TUES_AGE} годин
							подготвя бъдещите лидери на ИТ сектора в България и отвъд.
						</p>
						<p className="text-md text-justify">
							Възпитаниците на ТУЕС преминават през задълбочена и специализирана 5-годишна програма, която
							им позволява да се позиционират възможно най-бързо в технологичния сектор.
						</p>
						<div className="flex flex-col gap-4">
							<h3 className="text-3xl font-bold">Специалности</h3>
							<div className="flex flex-col gap-4 sm:flex-row">
								<div className="relative overflow-hidden rounded-xl border border-[#F2F2F2] bg-opacity-0 bg-clip-padding p-[2px] drop-shadow-lg backdrop-blur-sm backdrop-filter sm:border-2">
									<Link
										href="https://elsys-bg.org/priem/specialnost-sistemno-programirane"
										className="relative flex h-full flex-col gap-2 rounded-xl bg-transparent p-3 backdrop-blur-md"
									>
										<h4 className="text-xl font-bold">Системно програмиране</h4>
										<div className="h-[1px] w-full bg-stroke" />
										<p className="text-md">
											Най-задълбочената училищна програма по програмиране в България, която е
											незаменим трамплин за всеки с амбиции за кариера в ИТ сектора.
										</p>
									</Link>
								</div>
								<div className="relative overflow-hidden rounded-xl border border-[#F2F2F2] bg-opacity-0 bg-clip-padding p-[2px] drop-shadow-lg backdrop-blur-sm backdrop-filter sm:border-2">
									<Link
										href="https://elsys-bg.org/priem/specialnost-komputyrni-mreji"
										className="relative flex h-full flex-col gap-2 rounded-xl bg-transparent p-3 backdrop-blur-md"
									>
										<h4 className="text-xl font-bold">Компютърни мрежи</h4>
										<div className="h-[1px] w-full bg-stroke" />
										<p className="text-md">
											Първата крачка към вълнуващата инженерна професия. Ще учите за проектиране
											на електроника, комуникации, мрежи, роботика и IoT.
										</p>
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="w-full max-w-3xl shrink-0 overflow-hidden rounded-xl border border-[#F2F2F2] bg-bg-color bg-transparent sm:border-2 lg:block lg:w-2/5">
						<img
							src="/assets/about/about.png"
							alt="Ученици на ТУЕС (Технологично училище “Електронни системи” към Технически Университет - София)"
							className="w-full max-w-3xl object-center"
						/>
					</div>
				</div>
				<div className="flex flex-col gap-4 pt-8 md:pt-12">
					<h3 className="-mb-2 bg-gradient bg-clip-text pb-2 text-3xl font-black text-transparent sm:text-5xl">
						Обучение
						{/* <Separator className="bg-black h-1 rounded-lg mt-2 w-auto" /> */}
					</h3>

					<p className="text-lg opacity-100">Освен специализирания учебен план ТУЕС предлага:</p>
					<ul className="flex w-full flex-col gap-4">
						<li className="text-md rounded-xl border border-[#F2F2F2] bg-opacity-0 bg-clip-padding p-4 drop-shadow-lg backdrop-blur-md backdrop-filter sm:border-2">
							Разширено изучаване на английски език.
						</li>
						<li className="text-md rounded-xl border border-[#F2F2F2] bg-opacity-0 bg-clip-padding p-4 drop-shadow-lg backdrop-blur-md backdrop-filter sm:border-2">
							Учебни програми, които покриват изискванията за задължителна подготовка по
							общообразователните предмети.
						</li>
						<li className="text-md flex flex-col gap-4 rounded-xl border border-[#F2F2F2] bg-opacity-0 bg-clip-padding p-4 drop-shadow-lg backdrop-blur-md backdrop-filter sm:border-2">
							<p className="text-lg">Извънкласни занимания:</p>
							<ul className="flex w-full flex-col gap-4">
								<li className="text-md rounded-xl border border-[#F2F2F2] bg-transparent p-4 sm:border-2">
									Cisco академия за обучение в актуалните мрежови технологии
								</li>
								<li className="text-md rounded-xl border border-[#F2F2F2] bg-transparent p-4 sm:border-2">
									Вградени микроконтролерни системи на базата на ардуино
								</li>
								<li className="text-md rounded-xl border border-[#F2F2F2] bg-transparent p-4 sm:border-2">
									Участие в национални и международни състезания по програмиране, компютърни мрежи и
									роботика
								</li>
								<li className="text-md rounded-xl border border-[#F2F2F2] bg-transparent p-4 sm:border-2">
									Възможност за изява на ежегодното състезание по програмиране HackTUES и изложението
									на ученически проекти ТУЕС Фест
								</li>
								<li className="text-md rounded-xl border border-[#F2F2F2] bg-transparent p-4 sm:border-2">
									Работилници и лекции на различни теми, водени от професионалисти, завършили ТУЕС
								</li>
								<li className="text-md rounded-xl border border-[#F2F2F2] bg-transparent p-4 sm:border-2">
									Участие в много различни извънкласни клубове
								</li>
							</ul>
						</li>
						{/* <li className="p-4 rounded-xl text-md border sm:border-2 border-[#F2F2F2] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 drop-shadow-lg">
							Възможност за участие в зелено и бяло училище.{' '}
						</li> */}
					</ul>
				</div>
				<div className="pt-8 md:pt-12">
					{/* TODO: extract stats to config file */}
					<div className="flex flex-col gap-4 rounded-xl border border-[#F2F2F2] bg-bg-color bg-transparent p-8 sm:border-2 md:flex-row">
						<div className="flex w-full flex-col items-center gap-4 rounded-xl border border-[#F2F2F2] bg-[#353444] bg-transparent p-4 sm:border-2">
							<TbSchool size={64} className="opacity-100" />
							<p className="bg-gradient bg-clip-text text-5xl font-black text-transparent">2846</p>
							<p className="text-md text-center font-semibold opacity-100">завършили ученици</p>
						</div>
						<div className="flex w-full flex-col items-center gap-4 rounded-xl border border-[#F2F2F2] bg-[#353444] bg-transparent p-4 sm:border-2">
							<TbTrophy size={64} className="opacity-100" />
							<p className="bg-gradient bg-clip-text text-5xl font-black text-transparent">87</p>
							<p className="text-md text-center font-semibold opacity-100">награди и отличия</p>
						</div>
						<div className="flex w-full flex-col items-center gap-4 rounded-xl border border-[#F2F2F2] bg-[#353444] bg-transparent p-4 sm:border-2">
							<TbBriefcase size={64} className="opacity-100" />
							<p className="bg-gradient bg-clip-text text-5xl font-black text-transparent">140</p>
							<p className="text-md text-center font-semibold opacity-100">стажа на година</p>
						</div>
						<div className="flex w-full flex-col items-center gap-4 rounded-xl border border-[#F2F2F2] bg-[#353444] bg-transparent p-4 sm:border-2">
							<TbHistory size={64} className="opacity-100" />
							<p className="bg-gradient bg-clip-text text-5xl font-black text-transparent">{TUES_AGE}</p>
							<p className="text-md text-center font-semibold opacity-100">годишна история</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-4 pt-8 md:pt-12">
					<h3 className="-mb-2 bg-gradient bg-clip-text pb-2 text-3xl font-black text-transparent sm:text-5xl">
						ТУЕС постига успехите си благодарение на
						{/* <Separator className="bg-black h-1 rounded-lg mt-2 w-auto" /> */}
					</h3>

					<ul className="flex w-full flex-col gap-4">
						<li className="text-md rounded-xl border border-[#F2F2F2] bg-opacity-0 bg-clip-padding p-4 drop-shadow-lg backdrop-blur-sm backdrop-filter sm:border-2">
							Тясната интеграция с Технически университет - София
						</li>
						<li className="text-md rounded-xl border border-[#F2F2F2] bg-opacity-0 bg-clip-padding p-4 drop-shadow-lg backdrop-blur-sm backdrop-filter sm:border-2">
							Гъвкавия си специализиран учебен план
						</li>
						<li className="text-md rounded-xl border border-[#F2F2F2] bg-opacity-0 bg-clip-padding p-4 drop-shadow-lg backdrop-blur-sm backdrop-filter sm:border-2">
							Преподаватели от университета и ИТ практици
						</li>
						<li className="text-md rounded-xl border border-[#F2F2F2] bg-opacity-0 bg-clip-padding p-4 drop-shadow-lg backdrop-blur-sm backdrop-filter sm:border-2">
							Активната роля на завършилите в живота на училището
						</li>
						<li className="text-md rounded-xl border border-[#F2F2F2] bg-opacity-0 bg-clip-padding p-4 drop-shadow-lg backdrop-blur-sm backdrop-filter sm:border-2">
							Тясната връзка с реалния бизнес за учебни и извънучебни занимания, практики по
							специалността, дипломни проекти и др.
						</li>
					</ul>
				</div>
				<div className="flex flex-col gap-6 pt-8 md:pt-12">
					<h2 className="bg-gradient bg-clip-text text-3xl font-black text-transparent sm:text-5xl">
						Hack TUES
						{/* <Separator className="bg-black h-1 rounded-lg mt-2 w-auto" /> */}
					</h2>

					<p className="text-justify">
						HackTUES е едно от ключовите събития за ТУЕС, в което ученици от училището в отбори от по 3 - 5
						участници в рамките на два дни създават от нулата свой ИТ проект по зададена тема и след това го
						представят пред професионално жури от преподаватели и ИТ специалисти.
					</p>
					<p className="text-justify">
						Хакатонът дава възможност на участниците да усъвършенстват уменията си по програмиране, работа в
						екип и презентация на готовия проект. Те работят под менторството на специалисти от ИТ бизнеса,
						като понякога тези познанства прерастват в предложения за практика и стаж. Организаторите, от
						своя страна, научават много за процеса на организиране на подобно събитие и силно развиват
						своите меки умения. Общувайки със спонсорите, журито, менторите и доброволците, те си изграждат
						ясна представа за реалната работна обстановка.
					</p>
					<img
						src="/assets/about/hacktuesX.png"
						alt="HackTUES 9 организатори"
						className="m-auto w-full max-w-3xl rounded-xl border border-[#F2F2F2] bg-transparent sm:border-2"
					/>
					<p className="text-justify">
						Това е първият и единствен по рода си хакатон в България, организиран от ученици за ученици.
						Събитието стартира през 2015 г. и досега има десет издания. Всяка година Hack TUES се организира
						от координационен екип ученици от 11. клас, който се грижи за цялостната организация на
						събитието под менторството на АЗТУЕС и ръководството на ТУЕС.
					</p>
					<p className="text-justify">
						Емблематичният за ТУЕС към ТУ – София хакатон, организиран от ученици за ученици, Hack TUES,
						намери своето място сред иновативните и обещаващи практики на ЮНЕСКО за Техническо и
						професионално образование и обучение. Това прави Hack TUES единствената образователна практика в
						България, която е включена в тази глобална инициатива.{' '}
					</p>
					<p className="text-justify">
						Тази година се проведе{' '}
						<span className="bg-gradient bg-clip-text font-semibold text-transparent">
							десетото юбилейно издание
						</span>
						. Можете да видите повече информация{' '}
						<Link href="https://hacktues.bg" target="_blank">
							<u>тук</u>
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	);
};

export default AboutPage;
