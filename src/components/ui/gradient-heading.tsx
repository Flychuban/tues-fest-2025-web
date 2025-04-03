import React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

const sizeVariants = {
	xs: 'text-lg md:text-2xl',
	sm: 'text-xl md:text-3xl',
	md: 'text-2xl md:text-4xl',
	lg: 'text-3xl md:text-5xl',
	xl: 'text-4xl md:text-6xl',
	'2xl': 'text-5xl md:text-7xl',
};

interface GradientHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
	asChild?: boolean;
	size?: keyof typeof sizeVariants;
	children: React.ReactNode;
}

export function GradientHeading({ asChild, size = 'lg', className, children, ...props }: GradientHeadingProps) {
	const Comp = asChild ? Slot : 'h1';

	return (
		<Comp
			className={cn(
				'font-title bg-clip-text font-black text-transparent',
				'from-primary via-primary bg-gradient-to-r via-10% to-indigo-500',
				'transition-transform duration-500 ease-out group-hover:scale-[1.01]',
				'[text-shadow:0_0_25px_rgba(245,66,109,0.15),0_0_20px_rgba(99,102,241,0.15)]',
				sizeVariants[size],
				className
			)}
			{...props}
		>
			{children}
		</Comp>
	);
}
