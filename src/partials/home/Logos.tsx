'use client';

import { useEffect, useState } from 'react';
import LocationModal from '@/components/LocationModal';
import { TbClockHour4, TbMapPin } from 'react-icons/tb';

export default function Logos() {
	const [showLocationModal, setShowLocationModal] = useState(false);

	return (
		<div className="w-11/12 sm:w-2/3 md:w-3/4 lg:w-1/2">
			<div className="m-10 hidden rounded-xl border border-[#F2F2F2] bg-opacity-0 bg-clip-padding p-8 drop-shadow-lg backdrop-blur-sm backdrop-filter sm:m-0 sm:border-2 md:block">
				<div className="flex w-full">
					<img src={'/35.png'} alt="35elsys" className="h-1/12 w-2/6" />
					<img src="moto1.png" alt="tues-fest-moto" className="h-1/12 w-2/3" />
				</div>
			</div>
			<div className="m-2 mt-16 block rounded-xl border border-[#F2F2F2] bg-opacity-0 bg-clip-padding p-3 drop-shadow-lg backdrop-blur-sm backdrop-filter sm:m-0 sm:border-2 md:hidden">
				<img src={'/assets/TitleMobile.webp'} alt="titleMobile" className="w-full" />
				<div className="flex w-full">
					<img src={'/35.png'} alt="35elsys" className="h-1/12 w-2/6" />
					<img src="moto1.png" alt="tues-fest-moto" className="h-1/12 w-2/3" />
				</div>
			</div>

			<div className="relative z-20 mx-1/6 mt-8 flex flex-col items-stretch gap-4 text-center sm:mx-auto sm:max-w-md sm:items-center sm:justify-center">
				<button
					onClick={() => setShowLocationModal(true)}
					className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#FEFEFE] bg-opacity-0 px-4 py-2 text-lg backdrop-blur-sm backdrop-filter sm:hidden sm:border-2"
				>
					<TbMapPin size={24} />
					<p>{'Ларго'}</p>
				</button>
				<LocationModal isOpen={showLocationModal} onClose={() => setShowLocationModal(false)} />
				<div className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#FEFEFE] bg-opacity-0 px-4 py-2 text-lg  backdrop-blur-sm backdrop-filter sm:border-2">
					<TbClockHour4 size={24} />
					<p>20 и 21 април</p>
				</div>
			</div>
		</div>
	);
}
