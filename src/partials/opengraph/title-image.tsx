import { TF_YEAR } from '@/constants/event';
import { cn } from '@/lib/utils';

const headingSizes = {
	sm: {
		twitter: 'text-7xl',
		opengraph: 'text-8xl',
	},
	md: {
		twitter: 'text-8xl',
		opengraph: 'text-9xl',
	},
} as const;

type HeadingSize = keyof typeof headingSizes;

export function OpengraphTitleImage(props: {
	title: string;
	subtitle?: string;
	waveImageUrl: string;
	headingSize?: HeadingSize;
	showCallToAction?: boolean;
	callToActionText?: string;
}) {
	const headingSize = props.headingSize ?? 'md';
	const showCallToAction = props.showCallToAction ?? false;
	const callToActionText = props.callToActionText ?? 'JOIN US NOW';

	return (
		<div
			tw="flex flex-col items-stretch w-full h-full relative"
			style={{
				backgroundImage: `url(${props.waveImageUrl})`,
				backgroundSize: '100% 100%',
				backgroundPosition: 'center',
				backgroundColor: '#020817',
				backgroundRepeat: 'no-repeat',
			}}
		>
			{/* Overlay for better text contrast */}
			<div tw="absolute inset-0 bg-[#020817]/50" />

			{/* Top section - Logo */}
			<div tw="absolute top-0 left-0 right-0 flex flex-col items-center pt-12">
				<span style={{ fontFamily: 'Glitch' }} tw="text-[#e11d48] block text-6xl">
					TUES FEST
				</span>
				<span style={{ fontFamily: 'Glitch' }} tw="text-5xl text-[#6366f1]">
					{TF_YEAR}
				</span>
			</div>

			{/* Middle section - Main Title */}
			<div tw="flex flex-1 items-center text-center justify-center">
				<h1
					style={{
						fontFamily: 'Rubik Mono One',
						backgroundImage: 'linear-gradient(to right, #ff1b6b, #45caff)',
						color: 'transparent',
						backgroundClip: 'text',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						textShadow: '0 0 25px rgba(255,27,107,0.2), 0 0 20px rgba(69,202,255,0.2)',
						display: '-webkit-box',
					}}
					tw={cn('font-black leading-tight', headingSizes[headingSize].opengraph)}
				>
					{props.title}
				</h1>
			</div>

			{/* Bottom section - Subtitle or Motto with optional Call to Action */}
			<div tw="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center pb-4">
				{!!props.subtitle && (
					<p style={{ fontFamily: 'Rubik Mono One' }} tw="text-3xl text-[#f8fafc]/90 tracking-widest mb-2">
						{props.subtitle}
					</p>
				)}

				{!props.subtitle && (
					<p style={{ fontFamily: 'Rubik Mono One' }} tw="text-3xl text-[#f8fafc]/90 mb-2">
						IT ALL STARTS HERE
					</p>
				)}

				{/* Call to Action Button - ShadCN style */}
				{showCallToAction && (
					<div
						tw="mt-2 inline-flex items-center justify-center rounded-md text-xl font-medium transition-all px-6 py-2 bg-[#e11d48] text-[#f8fafc] shadow-sm hover:bg-[#e11d48]/90"
						style={{
							fontFamily: 'Rubik Mono One',
							boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
						}}
					>
						{callToActionText}
					</div>
				)}
			</div>
		</div>
	);
}

/**
 * Twitter-optimized version of the title image component
 *
 * Key differences from the OG version:
 * - Centered layout for better display on Twitter's platform
 * - Larger text elements for better readability at smaller sizes
 * - More compact design to avoid cropping issues
 * - Action-oriented with a clear call to action
 * - Optimized for mobile viewing
 */
export function TwitterTitleImage(props: {
	title: string;
	waveImageUrl: string;
	date?: string;
	location?: string;
	headingSize?: HeadingSize;
}) {
	const headingSize = props.headingSize ?? 'md';

	return (
		<div
			tw="flex flex-col items-center justify-center w-full h-full relative"
			style={{
				backgroundImage: `url(${props.waveImageUrl})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundColor: '#020817',
				backgroundRepeat: 'no-repeat',
			}}
		>
			{/* Overlay for better text contrast */}
			<div tw="absolute inset-0 bg-[#020817]/60" />

			{/* Content - All centered for Twitter */}
			<div tw="flex flex-col items-center justify-center text-center relative z-10 px-8">
				{/* Logo */}
				<div tw="flex flex-col items-center mb-6">
					<span style={{ fontFamily: 'Glitch' }} tw="text-[#e11d48] block text-7xl">
						TUES FEST
					</span>
					<span style={{ fontFamily: 'Glitch' }} tw="text-6xl text-[#6366f1]">
						{TF_YEAR}
					</span>
				</div>

				{/* Main Title - Larger and more prominent */}
				<h1
					style={{
						fontFamily: 'Rubik Mono One',
						backgroundImage: 'linear-gradient(to right, #ff1b6b, #45caff)',
						color: 'transparent',
						backgroundClip: 'text',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						textShadow: '0 0 25px rgba(255,27,107,0.2), 0 0 20px rgba(69,202,255,0.2)',
					}}
					tw={cn('font-black leading-tight mb-6', headingSizes[headingSize].twitter)}
				>
					{props.title}
				</h1>

				{/* Motto */}
				<p style={{ fontFamily: 'Rubik Mono One' }} tw="text-4xl text-[#f8fafc]/90 tracking-widest mb-8">
					IT ALL STARTS HERE
				</p>

				{/* Twitter-specific call to action */}
				{(props.date ?? props.location) && (
					<div tw="flex flex-col items-center">
						<p style={{ fontFamily: 'Rubik Mono One' }} tw="text-2xl text-[#f8fafc]/80 tracking-wider">
							{props.date && <span>{props.date}</span>}
							{props.date && props.location && <span> • </span>}
							{props.location && <span>{props.location}</span>}
						</p>
						<p style={{ fontFamily: 'Rubik Mono One' }} tw="mt-4 text-xl text-[#f8fafc]/70 tracking-wide">
							JOIN US NOW
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
