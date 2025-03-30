'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { TbChevronDown, TbChevronUp, TbX } from 'react-icons/tb';

import { PROJECT_CATEGORY_MAP, ProjectCategoryMapValue } from '@/constants/projects';
import { useVoteContext, Vote } from '@/context/vote';

const VotingModal = ({ closeModal }: { closeModal: () => void }) => {
	const { addInfo, validateGivenInfo, getErrors, submitVote, hasVerifiedVote } = useVoteContext();

	const [info, setInfo] = useState({ name: '', email: '' });
	const [showLast, setShowLast] = useState(false);
	const [showResult, setShowResult] = useState(hasVerifiedVote);

	const { emailError, nameError, votingError } = getErrors();

	const handleInfo = () => {
		if (validateGivenInfo(info.name, info.email)) {
			addInfo(info.name, info.email);
			setShowLast(true);
		}
	};

	const handleVote = async () => {
		if (await submitVote()) {
			setShowResult(true);
			setShowLast(false);
		}
	};

	const handleClose = () => {
		setShowLast(false);
		setShowResult(false);
		closeModal();
	};

	return (
		<div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
			{!showLast && !showResult && (
				<div className="flex h-full w-full items-center justify-center">
					<div className="z-50 w-full max-w-2xl rounded-lg border border-border bg-bg-color p-4">
						<div className="flex items-center justify-between">
							<h2 className="text-2xl font-bold">Още малко остава</h2>
							<button
								onClick={closeModal}
								className="p-2 opacity-75 transition-all duration-300 hover:opacity-100"
							>
								<TbX size={24} />
							</button>
						</div>
						<div className="mt-4 flex w-full flex-col gap-4">
							<p className="-mt-2 text-sm opacity-70">
								Моля, попълнете име и имейл, за да можем да ви изпратим линк за потвържение за
								гласуването.
							</p>
							<div className="flex w-full flex-col gap-2">
								<label htmlFor="name" className="text-sm font-medium">
									Име
								</label>
								<input
									type="text"
									id="name"
									className={`w-full border bg-bg-color ${
										nameError ? 'border-error' : 'border-border'
									} rounded-lg p-2`}
									value={info.name}
									placeholder="Иван Иванов"
									onChange={(e) => setInfo({ ...info, name: e.target.value })}
								/>
								{votingError || (nameError && <p className="text-sm text-error">Моля, въведете име</p>)}
							</div>
							<div className="flex w-full flex-col gap-2">
								<label htmlFor="email" className="text-sm font-medium">
									Имейл
								</label>
								<input
									type="email"
									id="email"
									className={`w-full border bg-bg-color ${
										emailError ? 'border-error' : 'border-border'
									} rounded-lg p-2`}
									value={info.email}
									placeholder="ivanivanov@gmail.com"
									onChange={(e) => setInfo({ ...info, email: e.target.value })}
								/>
								{votingError ||
									(emailError && <p className="text-sm  text-error">Моля, въведете валиден имейл</p>)}
							</div>
						</div>
						<button
							className="bg-primary-color mt-4 w-full rounded-lg border border-stroke bg-border py-2 font-bold text-white transition-all duration-300 hover:bg-primary"
							onClick={handleInfo}
						>
							Потвърди
						</button>
					</div>
				</div>
			)}
			{showLast && (
				<div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
					<div className="flex h-full w-full items-center justify-center">
						<div className="z-50 w-full max-w-2xl rounded-lg border border-border bg-bg-color p-4">
							<p className="text-error">
								Сигурни ли сте, че искате да използвате{' '}
								<span className="font-bold italic text-error underline">{info.email}</span>, за да
								получите линк за потвърждение?
							</p>
							<div className="mt-4 flex w-full items-center justify-between gap-4">
								<button
									className="bg-primary-color w-1/2 rounded-lg border border-stroke bg-border py-2 font-bold text-white transition-all duration-300 hover:bg-primary"
									onClick={handleVote}
								>
									Гласувай
								</button>
								<button
									className="w-1/2 rounded-lg border border-border bg-bg-color p-2 transition-all duration-300"
									onClick={() => setShowLast(false)}
								>
									Отказ
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
			{showResult && (
				<div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
					<div className="flex h-full w-full items-center justify-center">
						<div className="z-50 w-full max-w-2xl rounded-lg border border-border bg-bg-color p-4">
							{votingError ? (
								<p className="text-error">
									Възникна грешка при гласуването. Моля, опитайте отново.
									<br />
									{votingError}
								</p>
							) : !hasVerifiedVote ? (
								<p className="text-success">
									Гласувахте успешно! Моля, проверете имейла си за линк за потвърждение.
								</p>
							) : (
								<p className="text-success">Вашият глас бе актуализиран успешно!</p>
							)}
							<button
								className="bg-primary-color mt-4 w-full rounded-lg border border-stroke bg-border py-2 font-bold text-white transition-all duration-300 hover:bg-primary"
								onClick={() => handleClose()}
							>
								ОК
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

const VotingCategory = ({
	category,
	cat,
	error,
}: {
	category: Vote | null;
	cat: ProjectCategoryMapValue;
	error: boolean | null;
}) => {
	const { removeVote } = useVoteContext();

	if (category === null) {
		return (
			<Link
				href={cat.href}
				className={`flex w-full items-center justify-between py-2 ${error ? '!text-error' : ''}`}
			>
				<div className="flex items-center gap-4">
					<div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-bg-color" />
					<p className={`text-md line-clamp-1 font-bold ${error ? '!text-error' : ''}`}>{cat.text}</p>
				</div>
				<p className="p-2 text-sm font-medium opacity-75 transition-all duration-300 hover:opacity-100">
					Избери
				</p>
			</Link>
		);
	}

	return (
		<div className={`flex w-full items-center justify-between py-2 ${error ? '!text-error' : ''}`}>
			<div className="flex items-center gap-4">
				<div className="relative flex aspect-square h-12 w-12 shrink-0 items-center justify-center overflow-hidden break-words rounded-full border border-border bg-bg-color">
					<img
						src={category.image ?? ''}
						alt={category.name}
						className="aspect-square h-full w-full object-cover"
					/>
				</div>
				<Link
					href={`/projects/${category.id}`}
					title={category.name}
					className={`text-md line-clamp-1 font-bold ${error ? '!text-error' : ''}`}
				>
					{category.name}
				</Link>
			</div>
			<button
				className="p-2 opacity-75 transition-all duration-300 hover:opacity-100"
				onClick={() => removeVote(category.category!)}
			>
				<TbX size={24} />
			</button>
		</div>
	);
};

const VotingOverlay = ({ showModal }: { showModal: () => void }) => {
	const [minimized, setMinimized] = useState(false);
	const { getVotes, getErrors, hasVerifiedVote, submitVote } = useVoteContext();

	const { software, embedded, battlebot } = getVotes();
	const { softwareError, embeddedError, battlebotError } = getErrors();

	return (
		<motion.div className="fixed bottom-5 right-0 z-50 w-screen" animate={minimized}>
			<div className="container relative">
				<div className="absolute bottom-0 left-0 flex w-full items-center justify-start sm:w-fit">
					<div
						className={`mx-4 w-full sm:w-96 ${
							minimized ? 'flex h-16 items-center' : 'h-[26rem] pt-4'
						} rounded-xl border border-border bg-bg-color bg-opacity-75 p-2  drop-shadow-lg backdrop-blur-md transition-all duration-300`}
					>
						<div className={`relative ${minimized ? 'h-fit w-full shrink-0' : 'h-16'}`}>
							<div className="relative flex w-full items-center justify-between px-4">
								<p className="text-2xl font-bold">
									Вашият глас
									<span className="ml-2 text-sm opacity-50">
										{
											Object.values({
												software,
												embedded,
												battlebot,
											}).filter((v) => v !== null).length
										}{' '}
										/ 3
									</span>
								</p>
								<button
									className="rounded-full border border-border bg-bg-color bg-opacity-75 p-2 transition-all duration-300 hover:border-stroke hover:bg-border"
									onClick={() => setMinimized(!minimized)}
								>
									{!minimized ? (
										<TbChevronDown size={24} className="transition-all duration-300" />
									) : (
										<TbChevronUp size={24} className="transition-all duration-300" />
									)}
								</button>
							</div>
						</div>
						<div
							className={`flex w-full flex-col items-center justify-center gap-4 px-4 ${
								minimized ? 'hidden' : 'block'
							}`}
						>
							<div className="flex w-full flex-col divide-y divide-stroke">
								<VotingCategory
									category={embedded}
									cat={{ ...PROJECT_CATEGORY_MAP.software, text: 'Избор 1', href: '/projects' }}
									error={embeddedError}
								/>
								<VotingCategory
									category={software}
									cat={{ ...PROJECT_CATEGORY_MAP.embedded, text: 'Избор 2', href: '/projects' }}
									error={softwareError}
								/>
								<VotingCategory
									category={battlebot}
									cat={{ ...PROJECT_CATEGORY_MAP.battlebot, text: 'Избор 3', href: '/projects' }}
									error={battlebotError}
								/>
							</div>
							<button
								className="flex items-center justify-center rounded-xl border border-border bg-primary bg-opacity-75 px-6 py-2 text-lg font-bold transition-all duration-300 hover:border-stroke hover:bg-primary"
								onClick={
									!hasVerifiedVote
										? showModal
										: () => void submitVote().then(showModal)
											
								}
							>
								{!hasVerifiedVote ? 'Гласувай' : 'Запиши глас'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

const VotingLayout = () => {
	const { anyVotes, validateVote } = useVoteContext();

	const [showOverlay, setShowOverlay] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const continueVoting = () => {
		if (!validateVote()) return;

		setShowOverlay(false);
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);

		if (anyVotes()) {
			setShowOverlay(true);
		}
	};

	useEffect(() => {
		if (anyVotes()) {
			setShowOverlay(true);
		}
	}, [anyVotes]);

	const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
	const isVotePage = pathname.startsWith('/vote/');

	if (isVotePage) {
		return null;
	}

	return (
		null && (
			<>
				{showOverlay && !showModal && <VotingOverlay showModal={continueVoting} />}
				{showModal && <VotingModal closeModal={closeModal} />}
			</>
		)
	);
};

export default VotingLayout;
