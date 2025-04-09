import { ImageResponse } from 'next/og';

import { TF_YEAR } from '@/constants/event';
import { TF_TITLE } from '@/constants/seo';

export const runtime = 'edge';

// Image metadata
export const alt = TF_TITLE;
export const size = {
	width: 760,
	height: 325,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
	const [glitchFontData, rubikMonoOneData] = await Promise.all([
		fetch(new URL('../assets/fonts/glitch.otf', import.meta.url)).then((res) => res.arrayBuffer()),
		fetch(new URL('../assets/fonts/RubikMonoOne-Regular.ttf', import.meta.url)).then((res) => res.arrayBuffer()),
	]);

	return new ImageResponse(
		(
			<div tw="flex flex-col items-center justify-center w-full h-full bg-[#060c16] p-3">
				<div tw="flex flex-col items-center justify-center text-center">
					<h1 tw="flex flex-col items-center">
						<span style={{ fontFamily: 'Glitch' }} tw="text-[#e11d48] block text-7xl">
							TUES FEST
						</span>
						<span style={{ fontFamily: 'Glitch' }} tw="text-6xl text-[#6366f1]">
							{TF_YEAR}
						</span>
					</h1>
					<p style={{ fontFamily: 'Rubik Mono One' }} tw="text-[#f8fafc]/90 mt-8 text-3xl tracking-widest">
						IT ALL STARTS HERE
					</p>
				</div>
			</div>
		),
		{
			...size,
			fonts: [
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
