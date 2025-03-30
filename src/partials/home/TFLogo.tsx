import { TF_YEAR } from '@/constants/event';

export const TFLogo = (props: React.ComponentProps<'div'>) => {
	return (
		<div {...props}>
			<h1 className="text-md font-origin text-center font-extrabold !leading-none !tracking-wide drop-shadow-lg">
				TUES{' '}
				<span className="text-md font-origin text-center font-extrabold !leading-none !tracking-wide drop-shadow-lg">
					Fest
				</span>{' '}
				<span className="text-md font-origin text-center font-extrabold !leading-none !tracking-wide drop-shadow-lg">
					{TF_YEAR}
				</span>
			</h1>
		</div>
	);
};
