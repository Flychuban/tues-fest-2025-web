import { Metadata } from 'next';

import { GradientHeading } from '@/components/ui/gradient-heading';
import { TF_TITLE } from '@/constants/seo';

const LOCATION_MAP_URL =
	'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d733.0729700320611!2d23.32159637614092!3d42.6975400791878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa856ee63f96cf%3A0xa6d65ce76c5bbe5f!2sSofia%20Center%2C%20pl.%20%22Nezavisimost%22%2C%201000%20Sofia!5e0!3m2!1sen!2sbg!4v1742839905608!5m2!1sen!2sbg';

export const metadata = {
	title: 'Локация',
	description: `Информация за локацията ${TF_TITLE} - Ларго, пл. Независимост, София и как да стигнете до там.`,
} satisfies Metadata;

// TODO: change the page content in a future pull request. THIS IS PLACEHOLDER TEXT

// export default function Location() {
// 	return (
// 		<div className="m-auto min-h-screen max-w-screen-2xl p-8 !pt-28 md:p-12">
// 			<div className="rounded-xl border  bg-opacity-0 bg-clip-padding p-10 drop-shadow-lg backdrop-blur-sm backdrop-filter">
// 				<GradientHeading size="lg">Локация</GradientHeading>

// 				<div className="flex flex-col gap-8 pt-0 sm:flex-row md:pt-12 lg:flex-row">
// 					<div className="flex w-full flex-col gap-8 sm:w-[50%]">
// 						<p className="text-justify text-xl">
// 							TUES Fest 2025 ще се проведе на 27ми Април 2025 от 10:00 на площад "Независимост" под куполите на "Ларгото", София. До там може да се
// 							стигне лесно с обществен транспорт, като метростанция "Сердика" се намира на минута пеша от локацията. Има и множество автобусни линии, които минават в близост.
// 							До площад "Независимост" може да се стигне и с автомобил, като има паркинг в близост. Друга опция е да дойдете пеша.
// 						</p>
// 						<p className="text-justify text-xl">
// 							Над 150 проекта ще бъдат представени на тазгодишното издание на TUES Fest. Ще имате възможност да се запознаете с учениците и техните проекти, както и да гласувате за най-добрия проект.
// 							Всички проекти ще бъдат изложени на място. Ще се потопите в духа на ТУЕС докато се разхождате из лабиринта от проекти. Ще може да се започнаете и със компаниите спонсори на TUES Fest.
// 						</p>
// 					</div>
					// <div className="w-full overflow-hidden rounded-lg border border-gray-300 sm:w-[50%]">
					// 	<iframe
					// 		src={LOCATION_MAP_URL}
					// 		title="Карта на локацията - Ларго, пл. Независимост, София"
					// 		width="100%"
					// 		height="400"
					// 		className="border-0"
					// 		allowFullScreen={true}
					// 		loading="lazy"
					// 		referrerPolicy="no-referrer-when-downgrade"
					// 	></iframe>
					// </div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

export default function Location() {
	return (
		<div className="m-auto min-h-screen max-w-screen-2xl p-8 !pt-28 md:p-12">
			<div className="rounded-xl border bg-opacity-0 bg-clip-padding p-10 drop-shadow-lg backdrop-blur-sm backdrop-filter">
				<GradientHeading size="lg">Локация</GradientHeading>

				<div className="flex flex-col gap-8 pt-0 sm:flex-row md:pt-12 lg:flex-row">
					<div className="flex w-full flex-col gap-8 sm:w-[50%]">
						<p className="text-justify text-xl">
							TUES Fest 2025 ще се проведе на 27 април 2025 г. от 10:00 часа на площад "Независимост" в София. 
							Локацията се намира в подлеза на метростанция "Сердика", в закритото пространство под стъклените куполи на Ларгото, 
							в самия център на града. Мястото е емблематично за София със своите впечатляващи стъклени куполи и археологически останки.
						</p>
						<p className="text-justify text-xl">
							Достъпът до мястото е изключително удобен - метростанция "Сердика" се намира буквално на входа на локацията. 
							В близост минават и множество автобусни и трамвайни линии. За пристигащите с автомобил има няколко платени паркинга 
							в радиус от 5-10 минути пеша.
						</p>
						<p className="text-justify text-xl">
							На тазгодишното издание на TUES Fest ще бъдат представени над 150 ученически проекта. Посетителите ще имат възможност 
							да разговарят директно с учениците, които са създали проектите, да разгледат техните разработки и да гласуват за най-добрите сред тях. 
							Ще можете да се потопите в творческата атмосфера на ТУЕС, разхождайки се между различните изложбени щандове, както и да 
							осъществите контакт с представителите на компаниите спонсори на събитието.
						</p>
						<p className="text-justify text-xl">
							<a href="https://maps.app.goo.gl/j2Q4m2hV6aXeUWGG8" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
								Разгледайте 3D изглед на локацията в Google Maps
							</a>, за да се ориентирате по-лесно и да планирате вашето посещение предварително.
						</p>
					</div>
					<div className="w-full overflow-hidden rounded-lg border border-gray-300 sm:w-[50%] sm:h-[50%]">
						<iframe
							src={LOCATION_MAP_URL}
							title="Карта на локацията - Ларго, пл. Независимост, София"
							width="100%"
							height="400"
							className="border-0"
							allowFullScreen={true}
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						></iframe>
					</div>
				</div>
			</div>
		</div>
	);
}
