'use client';

// Error components must be Client components
import { useEffect } from 'react';

import { GradientHeading } from '@/components/ui/gradient-heading';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
		console.log(error.cause);
	}, [error]);

	return (
		<div className="flex h-screen w-full flex-col items-center justify-center">
			<GradientHeading size="lg">Нещо се обърка, пробвай пак</GradientHeading>
			<button
				className="bg-primary mt-8 rounded-md px-5 py-2 text-white transition-all hover:scale-105"
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Опитай пак
			</button>
		</div>
	);
}
