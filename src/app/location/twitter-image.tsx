import { ImageResponse } from 'next/og';

import { TF_DATE_STRING_SHORT, TF_LOCATION, TF_YEAR } from '@/constants/event';

export const runtime = 'edge';

// Image metadata
export const alt = 'Локация';
export const size = {
	width: 1200,
	height: 600, // Optimized for Twitter's 2:1 aspect ratio
};

export const contentType = 'image/jpeg';

// Image generation
export default async function Image() {
	const [geistFontData, glitchFontData, rubikMonoOneData, waveImage] = await Promise.all([
		fetch(new URL('../../assets/fonts/Geist-Bold.otf', import.meta.url)).then((res) => res.arrayBuffer()),
		fetch(new URL('../../assets/fonts/glitch.otf', import.meta.url)).then((res) => res.arrayBuffer()),
		fetch(new URL('../../assets/fonts/RubikMonoOne-Regular.ttf', import.meta.url)).then((res) => res.arrayBuffer()),
		fetch(new URL('../../assets/wave-37.jpg', import.meta.url))
			.then((res) => res.arrayBuffer())
			.then((buffer) => {
				const base64 = Buffer.from(buffer).toString('base64');
				return `data:image/jpeg;base64,${base64}`;
			}),
	]);

	return new ImageResponse(
		(
			<div
				tw="flex flex-col items-center justify-center w-full h-full relative"
				style={{
					backgroundImage: `url(${waveImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundColor: '#020817',
					backgroundRepeat: 'no-repeat',
				}}
			>
				{/* Enhanced overlay for better text contrast */}
				<div tw="absolute inset-0 bg-[#020817]/70" />

				{/* Content - All centered for Twitter */}
				<div tw="flex flex-col items-center justify-center text-center relative z-10 px-8">
					{/* Logo with enhanced visibility */}
					<div tw="flex flex-col items-center mb-4">
						<span style={{ fontFamily: 'Glitch' }} tw="text-[#e11d48] block text-7xl">
							TUES FEST
						</span>
						<span style={{ fontFamily: 'Glitch' }} tw="text-6xl text-[#6366f1]">
							{TF_YEAR}
						</span>
					</div>

					{/* Main Title - Larger and more prominent with enhanced gradient */}
					<h1
						style={{
							fontFamily: 'Rubik Mono One',
							backgroundImage: 'linear-gradient(to right, #ff1b6b, #45caff)',
							color: 'transparent',
							backgroundClip: 'text',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							textShadow: '0 0 30px rgba(255,27,107,0.3), 0 0 25px rgba(69,202,255,0.3)',
						}}
						tw="font-black leading-tight mb-4 text-8xl"
					>
						{alt}
					</h1>

					{/* Location subtitle */}
					<p tw="text-4xl text-[#f8fafc]/90 tracking-widest mb-6">
						{TF_LOCATION}, {TF_DATE_STRING_SHORT}
					</p>

					{/* Enhanced call to action with visual element */}
					<div tw="flex flex-col items-center">
						<div tw="flex items-center justify-center bg-[#6366f1] px-6 py-3 rounded-lg shadow-lg transform rotate-1">
							<p style={{ fontFamily: 'Rubik Mono One' }} tw="text-2xl text-white tracking-wider">
								Научете повече
							</p>
						</div>
					</div>
				</div>
			</div>
		),
		{
			...size,
			fonts: [
				{
					name: 'Geist',
					data: geistFontData,
					style: 'normal',
					weight: 700,
				},
				{
					name: 'Glitch',
					data: glitchFontData,
					style: 'normal',
					weight: 400,
				},
				{
					name: 'Rubik Mono One',
					data: rubikMonoOneData,
					style: 'normal',
					weight: 400,
				},
			],
		}
	);
}
