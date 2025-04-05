import { ImageResponse } from 'next/og';

import { TF_DATE_STRING_SHORT, TF_LOCATION } from '@/constants/event';
import { OpengraphTitleImage } from '@/partials/opengraph/title-image';

export const runtime = 'edge';

// Image metadata
export const alt = 'Локация';
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

	return new ImageResponse(
		(
			<OpengraphTitleImage
				title={alt}
				subtitle={`${TF_DATE_STRING_SHORT}, ${TF_LOCATION}`}
				waveImageUrl={waveImage}
				showCallToAction={true}
				callToActionText="ПРИСЪЕДИНИ СЕ"
			/>
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
