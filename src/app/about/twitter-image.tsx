import { ImageResponse } from 'next/og';

import { TwitterTitleImage } from '@/partials/opengraph/title-image';

export const runtime = 'edge';

// Image metadata
export const alt = 'За ТУЕС';
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
	const [glitchFontData, rubikMonoOneData, waveImage] = await Promise.all([
		fetch(new URL('../../assets/fonts/glitch.otf', import.meta.url)).then((res) => res.arrayBuffer()),
		fetch(new URL('../../assets/fonts/RubikMonoOne-Regular.ttf', import.meta.url)).then((res) => res.arrayBuffer()),
		fetch(new URL('../../assets/wave-37.jpg', import.meta.url))
			.then((res) => res.arrayBuffer())
			.then((buffer) => {
				const base64 = Buffer.from(buffer).toString('base64');
				return `data:image/jpeg;base64,${base64}`;
			}),
	]);

	return new ImageResponse(<TwitterTitleImage title={alt} waveImageUrl={waveImage} />, {
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
	});
}
