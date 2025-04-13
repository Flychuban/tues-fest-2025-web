'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { StaticImageData } from 'next/image';
import { TbChevronLeft, TbChevronRight, TbX } from 'react-icons/tb';
import invariant from 'tiny-invariant';

import { Card } from '@/components/ui/card';

const GalleryModal = ({
	images,
	startingIndex,
	closeModal,
}: {
	images: StaticImageData[];
	startingIndex: number;
	closeModal: () => void;
}) => {
	const [index, setIndex] = useState(startingIndex);
	const modalRef = useRef<HTMLDivElement>(null);

	const next = useCallback(() => {
		if (index === images.length - 1) {
			setIndex(0);
		} else {
			setIndex(index + 1);
		}
	}, [index, images.length]);

	const prev = useCallback(() => {
		if (index === 0) {
			setIndex(images.length - 1);
		} else {
			setIndex(index - 1);
		}
	}, [index, images.length]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeModal();
			}

			if (e.key === 'ArrowRight') {
				next();
			}

			if (e.key === 'ArrowLeft') {
				prev();
			}

			if (e.key === ' ') {
				e.preventDefault();
			}

			if (e.key === 'Enter') {
				e.preventDefault();
			}

			if (e.key === 'Tab') {
				e.preventDefault();
			}

			if (e.key === 'Backspace') {
				e.preventDefault();
			}
		};

		const handleWheel = (e: WheelEvent) => {
			e.preventDefault();

			setTimeout(() => {
				if (e.deltaY > 0) {
					next();
				} else {
					prev();
				}
			}, 500);
		};

		// const handleTouch = (e: TouchEvent) => {
		// 	e.preventDefault();

		// 	setTimeout(() => {
		// 		if (e.touches[0].clientX < e.touches[1].clientX) {
		// 			next();
		// 		} else {
		// 			prev();
		// 		}
		// 	}, 500);
		// };

		const handleOutsideClick = (e: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				closeModal();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('wheel', handleWheel);
		// modalRef.current?.addEventListener('touchstart', handleTouch);
		document.addEventListener('click', handleOutsideClick);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('wheel', handleWheel);
			// modalRef.current?.removeEventListener('touchstart', handleTouch);
			document.removeEventListener('click', handleOutsideClick);
		};
	}, [closeModal, modalRef, next, prev]);

	const activeImage = images[index];
	invariant(activeImage, 'Invalid gallery image index');

	return (
		<div className="fixed left-0 top-0 z-[1001] flex h-full w-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
			<div ref={modalRef} className="relative h-full w-full max-w-screen-lg">
				<div className="absolute left-0 top-12 z-[1001] p-4">
					<button
						className="hover:bg-background-hover border-border bg-background flex items-center gap-2 rounded-xl border-2 px-4 py-2"
						onClick={closeModal}
					>
						<TbX className="h-6 w-6" />
						<span className="text-sm">Затвори</span>
					</button>
				</div>
				<div className="absolute left-0 top-1/2 z-[1001] p-4 !pl-10">
					<button
						className="border-border bg-background hover:bg-border flex items-center gap-2 rounded-xl border-2 px-4 py-2 transition-all duration-300 ease-in-out"
						onClick={prev}
					>
						<span className="text-sm">
							<TbChevronLeft size={32} />
						</span>
					</button>
				</div>
				<div className="absolute right-0 top-1/2 z-[1001] p-4 pr-10">
					<button
						className="border-border bg-background hover:bg-border flex items-center gap-2 rounded-xl border-2 px-4 py-2 transition-all duration-300 ease-in-out"
						onClick={next}
					>
						<span className="text-sm">
							<TbChevronRight size={32} />
						</span>
					</button>
				</div>
				<div className="h-full">
					<div className="flex h-full flex-col gap-4">
						<div className="flex h-full items-center justify-center gap-4 p-4">
							<div className="flex h-full max-h-screen w-full shrink-0 items-center justify-center overflow-hidden object-contain">
								<img
									src={activeImage.src}
									alt={`снимка ${index + 1} на проект`}
									className=" h-full rounded-xl object-contain"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const Gallery = ({ name, images }: { name: string; images: StaticImageData[] }) => {
	const [modal, setModal] = useState(false);
	const [index, setIndex] = useState(0);

	const openModal = (index: number) => {
		setIndex(index);
		setModal(true);
	};

	const closeModal = () => {
		setModal(false);
	};

	return (
		<>
			<Card className="relative mx-auto flex h-64 w-full flex-col">
				<div className="h-full">
					<div className="flex h-full shrink-0 flex-col gap-4">
						<div className="flex h-full items-center justify-start gap-4 overflow-x-auto p-4">
							{images.map((image, index) => (
								<div
									key={image.src}
									className="border-border !aspect-square h-full shrink-0 overflow-hidden rounded-xl border-2"
								>
									<img
										src={image.src}
										alt={`снимка ${index + 1} от проект ${name}`}
										width={512}
										height={512}
										onClick={() => openModal(index)}
										className="!aspect-square h-full shrink-0 cursor-pointer object-cover transition-transform duration-300 ease-in-out hover:scale-110"
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</Card>
			{modal && <GalleryModal images={images} startingIndex={index} closeModal={closeModal} />}
		</>
	);
};

export default Gallery;
