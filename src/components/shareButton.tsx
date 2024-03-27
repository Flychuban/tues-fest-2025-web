'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { TbShare } from 'react-icons/tb';

const ShareButton = (): JSX.Element => {
	const path = usePathname();

	const [copied, setCopied] = useState(false);
	const [pageURL, setPageURL] = useState('');
	const [isNativeShare, setNativeShare] = useState(false);

	const handleCopy = () => {
		navigator?.clipboard.writeText(`${window.location.origin}${path}`);
		setCopied(true);

		try {
			navigator
				?.share({
					title: window.document.title,
					text: window.document.title,
					url: `${window.location.origin}${path}`,
				})
				.then(() => console.log('Successful share! 🎉'))
				.catch((err) => console.error(err));
		} catch (err) {
			console.warn("Browser doesn't support native share");
		}

		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="absolute right-0 top-0 z-10 p-4">
			<button
				className="hover:bg-bg-color-hover flex items-center gap-2 rounded-xl border-2 border-border bg-bg-color px-4 py-2"
				onClick={handleCopy}
			>
				<TbShare className="h-6 w-6" />
				<span className="text-sm">{copied ? 'Копирано!' : 'Сподели'}</span>
			</button>
		</div>
	);
};

export default ShareButton;
