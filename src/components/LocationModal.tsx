'use client';

import { useEffect } from 'react';

export default function LocationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-black bg-opacity-50"
			onClick={onClose}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="relative w-[90%] max-w-xl rounded-lg border border-white bg-stroke p-4"
			>
				<button
					onClick={onClose}
					className="bg-gray-800 hover:bg-gray-700 absolute right-2 top-2 h-8 w-8 rounded-full text-white"
				>
					X
				</button>
				<h2 className="mb-4 text-xl font-bold">Ларго, пл. Независимост</h2>
				<p className="mb-4">Информация за мястото на събитието...</p>
				<div className="border-gray-300 overflow-hidden rounded-lg border">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d733.0729700320611!2d23.32159637614092!3d42.6975400791878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa856ee63f96cf%3A0xa6d65ce76c5bbe5f!2sSofia%20Center%2C%20pl.%20%22Nezavisimost%22%2C%201000%20Sofia!5e0!3m2!1sen!2sbg!4v1742839905608!5m2!1sen!2sbg"
						width="100%"
						height="400"
						className="border-0"
						allowFullScreen={true}
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					></iframe>
				</div>
			</div>
		</div>
	);
}
