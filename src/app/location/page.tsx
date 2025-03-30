import { Metadata } from 'next';

import { TF_TITLE } from '@/constants/seo';

const LOCATION_MAP_URL =
	'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d733.0729700320611!2d23.32159637614092!3d42.6975400791878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa856ee63f96cf%3A0xa6d65ce76c5bbe5f!2sSofia%20Center%2C%20pl.%20%22Nezavisimost%22%2C%201000%20Sofia!5e0!3m2!1sen!2sbg!4v1742839905608!5m2!1sen!2sbg';

export const metadata = {
	title: 'Локация',
	description: `Информация за локацията ${TF_TITLE} - Ларго, пл. Независимост, София и как да стигнете до там.`,
} satisfies Metadata;

// TODO: change the page content in a future pull request. THIS IS PLACEHOLDER TEXT

export default function Location() {
	return (
		<div className="m-auto min-h-screen max-w-screen-2xl p-8 !pt-28 md:p-12">
			<div className="rounded-xl border  bg-opacity-0 bg-clip-padding p-10 drop-shadow-lg backdrop-blur-sm backdrop-filter">
				<h2 className="bg-gradient bg-clip-text pb-4 text-3xl font-black text-transparent sm:text-5xl">
					Локация
				</h2>

				<div className="flex flex-col gap-8 pt-0 sm:flex-row md:pt-12 lg:flex-row">
					<div className="flex w-full flex-col gap-8 sm:w-[50%]">
						<p className="text-justify text-xl">
							Събитието ще се проведе на Х ден от 9:30 в Ларго, пл. Независимост, София. До там може да се
							стигне с частен самолет, хеликоптер, автомобил, велосипед или пеша.Събитието ще се проведе
							на Х ден от 9:30 в Ларго, пл. Независимост, София. До там може да се стигне с частен
							самолет, хеликоптер, автомобил, велосипед или пеша.
						</p>
						<p className="text-justify text-xl">
							Възпитаниците на ТУЕС преминават през задълбочена и специализирана 5-годишна програма, която
							им позволява да се позиционират възможно най-бързо в технологичния сектор.
						</p>
					</div>
					<div className="border-gray-300 w-full overflow-hidden rounded-lg border sm:w-[50%]">
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
