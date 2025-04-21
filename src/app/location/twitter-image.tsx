import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

import { TF_DATE_STRING_SHORT, TF_LOCATION, TF_YEAR } from '@/constants/event';

// Image metadata
export const alt = 'Локация';
export const size = {
	width: 1200,
	height: 600, // Optimized for Twitter's 2:1 aspect ratio
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
	const [geistFontData, glitchFontData, rubikMonoOneData, waveImage] = await Promise.all([
		readFile(join(process.cwd(), 'src/assets/fonts/Geist-Bold.otf')),
		readFile(join(process.cwd(), 'src/assets/fonts/glitch.otf')),
		readFile(join(process.cwd(), 'src/assets/fonts/RubikMonoOne-Regular.ttf')),
		readFile(join(process.cwd(), 'src/assets/wave-37.jpg')).then((buffer) => {
			const base64 = buffer.toString('base64');
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
					<h1 tw="flex flex-col items-center">
						<span style={{ fontFamily: 'Glitch' }} tw="text-[#e11d48] block text-8xl">
							TUES FEST
						</span>
						<span style={{ fontFamily: 'Glitch' }} tw="text-7xl text-[#6366f1]">
							{TF_YEAR}
						</span>
					</h1>

					<p style={{ fontFamily: 'Rubik Mono One' }} tw="text-[#f8fafc]/90 mt-12 text-4xl tracking-widest">
						{alt}
					</p>

					{/* Twitter-specific call to action */}
					<p style={{ fontFamily: 'Rubik Mono One' }} tw="mt-16 text-2xl text-[#f8fafc]/80 tracking">
						{TF_DATE_STRING_SHORT}, {TF_LOCATION}
					</p>
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
