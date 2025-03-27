'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import CATEGORY from '@/constants/projects/CATEGORY';
import { saveVote } from '@/server/vote/actions';
import { encodeBitmap, projectIdsToMapString } from '@/utils/vote-projects-map';

export interface Vote {
	id: number;
	name: string;
	image?: string; // not sure if we need this
	category?: string;
}

const VoteContext = createContext(
	{} as {
		addVote: (category: string, id: number, name: string, image?: string) => void;
		addInfo: (name: string, email: string) => void;
		removeVote: (category: string) => void;
		getVotes: () => {
			software: Vote | null;
			embedded: Vote | null;
			battlebot: Vote | null;
		};
		anyVotes: () => boolean;
		getErrors: () => {
			softwareError: boolean;
			embeddedError: boolean;
			battlebotError: boolean;
			emailError: boolean;
			nameError: boolean;
			votingError: string;
		};
		validateVote: () => boolean;
		validateInfo: () => boolean;
		validateGivenInfo: (name: string, email: string) => boolean;
		submitVote: () => Promise<boolean>;
		hasVerifiedVote: boolean;
		name: string;
		email: string;
	}
);

const { Provider } = VoteContext;

const VoteProvider = ({ children }: { children: React.ReactNode }) => {
	const [software, setSoftware] = useState<Vote | null>(null);
	const [embedded, setEmbedded] = useState<Vote | null>(null);
	const [battlebot, setBattlebot] = useState<Vote | null>(null);

	const [softwareError, setSoftwareError] = useState(false);
	const [embeddedError, setEmbeddedError] = useState(false);
	const [battlebotError, setBattlebotError] = useState(false);

	const [email, setEmail] = useState('');
	const [name, setName] = useState('');

	const [emailError, setEmailError] = useState(false);
	const [nameError, setNameError] = useState(false);

	const [votingError, setVotingError] = useState('');

	const [hasVerifiedVote, setHasVerifiedVote] = useState(false);

	const addVote = (_: string, id: number, name: string, image?: string) => {
		if (software?.id === id || embedded?.id === id || battlebot?.id === id) return;

		const categories = [
			[CATEGORY.embedded, embedded, setEmbedded, setEmbeddedError],
			[CATEGORY.software, software, setSoftware, setSoftwareError],
			[CATEGORY.battlebot, battlebot, setBattlebot, setBattlebotError],
		] as const;

		// find empty category or last if all are full
		const [category, , setCategory, setError] =
			categories.find(([, vote]) => vote === null) || categories[categories.length - 1]!;
		const value = { id, name, image, category };

		setCategory(value);
		setError(false);
		setSoftwareError(false);
		setEmbeddedError(false);
		setBattlebotError(false);
	};

	const addInfo = (name: string, email: string) => {
		setName(name);
		setEmail(email);
	};

	const removeVote = (category: string) => {
		console.log(category);
		console.log([software, embedded, battlebot]);
		switch (category) {
			case CATEGORY.embedded:
				setEmbedded(software ? { ...software, category: CATEGORY.embedded } : null);
			case CATEGORY.software:
				setSoftware(battlebot ? { ...battlebot, category: CATEGORY.software } : null);
			case CATEGORY.battlebot:
				setBattlebot(null);
				break;
			default:
				break;
		}
	};

	const getVotes = () => {
		return {
			software,
			embedded,
			battlebot,
		};
	};

	const getErrors = () => {
		return {
			softwareError,
			embeddedError,
			battlebotError,
			emailError,
			nameError,
			votingError,
		};
	};

	const anyVotes = () => {
		return software !== null || embedded !== null || battlebot !== null;
	};

	const validateVote = () => {
		const canVote = !!software || !!embedded || !!battlebot;
		if (!canVote) {
			setSoftwareError(software === null);
			setEmbeddedError(embedded === null);
			setBattlebotError(battlebot === null);
		}
		if (!canVote) {
			console.error('No votes');
		}
		return canVote;
	};

	const validateInfo = () => {
		setEmailError(email === '');
		setNameError(name === '');

		const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

		if (emailRegex.test(email) && name !== '') {
			return true;
		} else {
			return false;
		}
	};

	const validateGivenInfo = (name: string, email: string) => {
		setEmailError(email === '');
		setNameError(name === '');

		const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

		if (emailRegex.test(email) && name !== '') {
			return true;
		} else {
			return false;
		}
	};

	const submitVote = async () => {
		if (validateVote() && validateInfo()) {
			const response = await saveVote({
				email,
				name,
				pm: encodeBitmap(
					BigInt(
						projectIdsToMapString(
							[software?.id, embedded?.id, battlebot?.id].filter((id): id is number => !!id)
						)
					)
				),
				cf: '',
				isSpam: false,
			}).catch((e) => {
				return {
					success: false,
					error: '',
				} as const;
			});
			if (!response.success) {
				setVotingError(response.error);
			}
			localStorage?.setItem('email', email);
			localStorage?.setItem('name', name);
			return response.success;
		} else {
			setVotingError('Моля попълнете всички полета');
			return false;
		}
	};

	useEffect(() => {
		console.warn(softwareError, embeddedError, battlebotError);
	}, [softwareError, embeddedError, battlebotError]);

	// save to local storage on change
	useMemo(() => {
		if (!anyVotes()) return; // TODO: Fix this, for removing last vote

		localStorage?.setItem(CATEGORY.software, JSON.stringify(software));
		localStorage?.setItem(CATEGORY.embedded, JSON.stringify(embedded));
		localStorage?.setItem(CATEGORY.battlebot, JSON.stringify(battlebot));
	}, [anyVotes, software, embedded, battlebot]);

	// load from local storage on mount
	useEffect(() => {
		const software = localStorage?.getItem(CATEGORY.software);
		const embedded = localStorage?.getItem(CATEGORY.embedded);
		const battlebot = localStorage?.getItem(CATEGORY.battlebot);
		const email = localStorage?.getItem('email');
		const name = localStorage?.getItem('name');
		const hasVerifiedVote = localStorage?.getItem('hasVerifiedVote');

		console.log('LOADED FROM LOCAL STORAGE');
		console.log(software);
		console.log(embedded);
		console.log(battlebot);
		console.log({ email });
		console.log({ name });
		console.log({ hasVerifiedVote });

		if (software) setSoftware(JSON.parse(software));
		if (embedded) setEmbedded(JSON.parse(embedded));
		if (battlebot) setBattlebot(JSON.parse(battlebot));
		if (email) setEmail(email);
		if (name) setName(name);
		if (hasVerifiedVote) setHasVerifiedVote(hasVerifiedVote === 'true');
	}, []);

	// add event listener on local storage change
	// if hasVerifiedVote was updated, update the state
	useEffect(() => {
		const listener = (e: StorageEvent) => {
			if (e.key === 'hasVerifiedVote') {
				setHasVerifiedVote(e.newValue === 'true');
			}
		};
		window.addEventListener('storage', listener);
		return () => window.removeEventListener('storage', listener);
	}, []);

	useEffect(() => {
		console.trace({ name, email });
	}, [email, name]);

	useEffect(() => {
		console.log({
			software,
			embedded,
			battlebot,
		});
	}, [software, embedded, battlebot]);

	return (
		<Provider
			value={{
				addVote,
				addInfo,
				removeVote,
				getVotes,
				getErrors,
				anyVotes,
				validateVote,
				validateInfo,
				validateGivenInfo,
				submitVote,
				hasVerifiedVote,
				name,
				email,
			}}
		>
			{children}
		</Provider>
	);
};

export const useVoteContext = () => useContext(VoteContext);
export default VoteProvider;
