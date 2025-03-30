import { TF_YEAR } from '@/constants/event';
import { cn } from '@/lib/utils';

export const TFLogo = (props: React.ComponentProps<'span'>) => {
	return (
		<span
			{...props}
			className={cn(
				'text-md font-glitch text-primary text-center !leading-none !tracking-wide drop-shadow-lg',
				props.className
			)}
		>
			TUES Fest{' '}
			<span className="text-[oklch(0.6231782112201628_0.1879276416268245_259.7964101376824)]">{TF_YEAR}</span>
		</span>
	);
};
