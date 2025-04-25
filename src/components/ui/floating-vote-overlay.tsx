'use client';

import { Suspense, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Check, ChevronRight, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { PROJECT_CATEGORIES } from '@/constants/projects';
import { PROJECT_VOTE_LIMIT, VOTE_VERIFICATION_CODE_LENGTH } from '@/constants/voting';
import { useTRPC } from '@/lib/trpc/react';
import { cn } from '@/lib/utils';
import { useDeselectProject, useVotedProjects } from '@/stores/vote';
import { Alert, AlertDescription, AlertTitle } from './alert';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './dialog';
import { Skeleton } from './skeleton';

const registerFormSchema = z.object({
	name: z.string().min(2, {
		message: 'Името трябва да е поне 2 символа.',
	}),
	email: z.string().email({
		message: 'Моля, въведете валиден имейл адрес.',
	}),
});

const verificationEmailFormSchema = z.object({
	email: z.string().email({
		message: 'Моля, въведете валиден имейл адрес.',
	}),
});

const verificationCodeFormSchema = z.object({
	code: z
		.string()
		.length(VOTE_VERIFICATION_CODE_LENGTH, {
			message: `Кодът трябва да е точно ${VOTE_VERIFICATION_CODE_LENGTH} цифри.`,
		})
		.regex(/^\d+$/, {
			message: 'Кодът трябва да съдържа само цифри.',
		}),
});

export function FloatingVoteOverlay() {
	const trpc = useTRPC();
	const { data: currentVoter } = useQuery(trpc.voting.getCurrentVoter.queryOptions());
	const votedProjects = useVotedProjects();
	const deselectProject = useDeselectProject();
	const selectedCount = votedProjects.length;

	const progress = (selectedCount / PROJECT_VOTE_LIMIT) * 100;
	const isMaxSelected = selectedCount === PROJECT_VOTE_LIMIT;

	const hasVoted = currentVoter && currentVoter.isVerified && currentVoter.votedProjectIds.length > 0;
	const hasUnsavedChanges = useMemo(() => {
		const savedIdSet = new Set(currentVoter?.votedProjectIds ?? []);
		const localIdSet = new Set(votedProjects.map((project) => project.id));

		if (savedIdSet.size !== localIdSet.size) return true;
		return [...savedIdSet].some((id) => !localIdSet.has(id));
	}, [currentVoter, votedProjects]);

	return (
		<div className="fixed inset-x-0 bottom-0 z-50">
			<div
				className={cn(
					'bg-card/50 flex justify-center border-t py-3 shadow-lg backdrop-blur-xl transition-all duration-300',
					isMaxSelected || (hasVoted && hasUnsavedChanges && 'bg-primary/50'),
					!hasVoted && selectedCount === 0 && 'hidden'
				)}
			>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant={isMaxSelected ? 'default' : 'ghost'} className="relative h-12 gap-2 px-6">
							<div className="flex items-center gap-3">
								<div className="flex items-center gap-2">
									<div className="relative flex h-6 w-6 items-center justify-center">
										{isMaxSelected ? (
											<Check className="text-primary-foreground size-4" />
										) : (
											<>
												<div className="absolute inset-0">
													<Progress value={progress} className="h-6 w-6 rounded-full" />
												</div>
												<span
													className={cn(
														'relative text-sm font-medium',
														isMaxSelected ? 'text-primary-foreground' : 'text-foreground'
													)}
												>
													{selectedCount}
												</span>
											</>
										)}
									</div>
									<span
										className={cn(
											'text-sm font-medium',
											isMaxSelected ? 'text-primary-foreground' : 'text-foreground'
										)}
									>
										{hasVoted
											? hasUnsavedChanges
												? 'Запазете променения глас'
												: `Гласувахте за ${selectedCount} ${
														selectedCount === 1 ? 'проект' : 'проекта'
													}`
											: isMaxSelected
												? 'Запишете своя глас'
												: `Избрахте ${PROJECT_VOTE_LIMIT - selectedCount} ${
														PROJECT_VOTE_LIMIT - selectedCount === 1 ? 'проект' : 'проекта'
													}`}
									</span>
								</div>
								<ChevronRight
									className={cn(
										'size-4 transition-transform',
										isMaxSelected ? 'text-primary-foreground' : 'text-muted-foreground'
									)}
								/>
							</div>
						</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Вашият глас</SheetTitle>
							<SheetDescription>
								{selectedCount === PROJECT_VOTE_LIMIT
									? !hasVoted || hasUnsavedChanges
										? 'Готови сте да запишете своя глас'
										: `Вие избрахте ${selectedCount} проекта`
									: `Може да изберете още ${PROJECT_VOTE_LIMIT - selectedCount} ${
											PROJECT_VOTE_LIMIT - selectedCount === 1 ? 'проект' : 'проекта'
										}`}
							</SheetDescription>
						</SheetHeader>

						{votedProjects.length > 0 ? (
							<ScrollArea className="flex-1">
								<div className="space-y-4 px-4">
									{votedProjects.map((project) => (
										<div
											key={project.id}
											className="bg-card/50 group relative flex gap-4 rounded-lg border p-3 backdrop-blur-sm"
										>
											<SheetClose
												asChild
												className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-md"
											>
												<Link href={`/projects/${project.id}`}>
													<Image
														src={project.thumbnail}
														alt={`Снимка на ${project.title}`}
														className="object-cover"
														fill
														sizes="128px"
													/>
												</Link>
											</SheetClose>
											<div className="flex flex-1 flex-col justify-between gap-1">
												<div>
													<h3 className="line-clamp-1 font-medium">
														<SheetClose asChild>
															<Link href={`/projects/${project.id}`}>
																{project.title}
															</Link>
														</SheetClose>
													</h3>
													<p className="text-muted-foreground line-clamp-1 text-sm">
														{PROJECT_CATEGORIES[project.category]}
													</p>
												</div>
												<button
													className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary rounded-xs focus:outline-hidden absolute right-4 top-4 opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
													onClick={() => deselectProject(project.id)}
												>
													<X className="size-4" />
													<span className="sr-only">Премахни проект</span>
												</button>
											</div>
										</div>
									))}
								</div>
							</ScrollArea>
						) : (
							<>
								<div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2">
									<p>Нямате избрани проекти</p>
								</div>
							</>
						)}

						<SheetFooter>
							<Separator />
							{hasVoted && !hasUnsavedChanges && (
								<div className="flex flex-col gap-2 py-1">
									<p className="text-lg font-medium">Вашият глас е запазен</p>
									<p className="text-muted-foreground text-sm">
										Все още можете да добавяте и премахвате проекти към него до края на гласуването.
									</p>
								</div>
							)}
							{!hasVoted ? (
								<Suspense fallback={<Skeleton className="h-10 w-full" />}>
									<RegisterVoterButton />
								</Suspense>
							) : hasUnsavedChanges ? (
								<SheetClose asChild>
									<SaveVotesButton />
								</SheetClose>
							) : (
								<SheetClose asChild>
									<Button className="w-full" size="lg" variant="outline" asChild>
										<Link href="/projects">Промени глас</Link>
									</Button>
								</SheetClose>
							)}
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
}

function RegisterVoterStep(props: { onVerificationEmailSent: () => void }) {
	const form = useForm<z.infer<typeof registerFormSchema>>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			name: '',
			email: '',
		},
	});

	const trpc = useTRPC();
	const registerVoter = useMutation(
		trpc.voting.registerVoter.mutationOptions({
			onSuccess: (_data, variables) => {
				props.onVerificationEmailSent();
				const previousVoter = queryClient.getQueryData(trpc.voting.getCurrentVoter.queryKey());
				if (!previousVoter) {
					queryClient.setQueryData(trpc.voting.getCurrentVoter.queryKey(), {
						isVerified: false,
						email: variables.email,
						votedProjectIds: [],
					});
				}
			},
			onSettled: () => {
				queryClient.invalidateQueries(trpc.voting.getCurrentVoter.queryOptions());
			},
			trpc: {
				context: { disableStreaming: true },
			},
		})
	);
	const queryClient = useQueryClient();

	const name = form.watch('name');
	const email = form.watch('email');
	const isComplete = name.length >= 2 && email.length > 0;

	const handleSubmit = form.handleSubmit(async (data) => {
		await registerVoter.mutateAsync(data);
	});

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit} className="space-y-6">
				{registerVoter.isError && (
					<Alert variant="destructive">
						<AlertTitle>Възникна грешка</AlertTitle>
						<AlertDescription>{registerVoter.error.message}</AlertDescription>
					</Alert>
				)}
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Име</FormLabel>
							<FormControl>
								<Input placeholder="Иван Иванов" {...field} />
							</FormControl>
							<FormDescription>
								Вашето име ще бъде използвано за идентификация на гласа ви.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Имейл адрес</FormLabel>
							<FormControl>
								<Input type="email" placeholder="ivan@example.com" {...field} />
							</FormControl>
							<FormDescription>На този адрес ще получите код за потвърждение.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full" disabled={!isComplete || registerVoter.isPending}>
					Изпрати код за потвърждение
				</Button>
			</form>
		</Form>
	);
}

function SendVerificationEmailStep(props: { onVerificationEmailSent: () => void }) {
	const trpc = useTRPC();
	const { data: currentVoter } = useSuspenseQuery(trpc.voting.getCurrentVoter.queryOptions());
	const queryClient = useQueryClient();
	const resendVerificationCode = useMutation(
		trpc.voting.resendVerificationCode.mutationOptions({
			onSuccess: () => {
				props.onVerificationEmailSent();
			},
			onSettled: () => {
				queryClient.invalidateQueries(trpc.voting.getCurrentVoter.queryOptions());
			},
		})
	);

	const form = useForm<z.infer<typeof verificationEmailFormSchema>>({
		resolver: zodResolver(verificationEmailFormSchema),
		defaultValues: {
			email: currentVoter?.email ?? '',
		},
	});

	const email = form.watch('email');
	const isComplete = email.length > 0;

	const handleSubmit = form.handleSubmit(async (data) => {
		await resendVerificationCode.mutateAsync(data);
	});

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit} className="space-y-6">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Имейл адрес</FormLabel>
							<FormControl>
								<Input type="email" placeholder="ivan@example.com" {...field} />
							</FormControl>
							<FormDescription>Можете да промените имейл адреса си, ако желаете.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full" disabled={!isComplete}>
					Изпрати нов код за потвърждение
				</Button>
			</form>
		</Form>
	);
}

function EnterVerificationCodeStep() {
	const form = useForm<z.infer<typeof verificationCodeFormSchema>>({
		resolver: zodResolver(verificationCodeFormSchema),
		defaultValues: {
			code: '',
		},
	});

	const code = form.watch('code');
	const isComplete = code.length === VOTE_VERIFICATION_CODE_LENGTH;

	return (
		<Form {...form}>
			<form className="space-y-8">
				<FormField
					control={form.control}
					name="code"
					render={({ field }) => (
						<FormItem className="space-y-6">
							<FormLabel className="sr-only">Код за потвърждение</FormLabel>
							<FormControl>
								<div className="flex justify-center">
									<InputOTP
										maxLength={VOTE_VERIFICATION_CODE_LENGTH}
										value={field.value}
										pattern={REGEXP_ONLY_DIGITS}
										onChange={field.onChange}
										onBlur={field.onBlur}
										name={field.name}
									>
										<InputOTPGroup>
											{Array.from({ length: Math.ceil(VOTE_VERIFICATION_CODE_LENGTH / 2) }).map(
												(_, i) => (
													<InputOTPSlot key={i} index={i} />
												)
											)}
										</InputOTPGroup>
										<InputOTPGroup>
											{Array.from({ length: Math.floor(VOTE_VERIFICATION_CODE_LENGTH / 2) }).map(
												(_, i) => (
													<InputOTPSlot
														key={i + Math.ceil(VOTE_VERIFICATION_CODE_LENGTH / 2)}
														index={i + Math.ceil(VOTE_VERIFICATION_CODE_LENGTH / 2)}
													/>
												)
											)}
										</InputOTPGroup>
									</InputOTP>
								</div>
							</FormControl>
							<FormDescription className="text-center">
								Въведете {VOTE_VERIFICATION_CODE_LENGTH}-цифрения код, който получихте на имейла си.
							</FormDescription>
							<FormMessage className="text-center" />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full" disabled={!isComplete}>
					Потвърди код
				</Button>
			</form>
		</Form>
	);
}

function SuccessStep() {
	return (
		<div className="flex flex-col items-center gap-8 py-6">
			<div className="bg-primary flex h-16 w-16 items-center justify-center rounded-full">
				<Check className="text-primary-foreground size-8" />
			</div>
			<div className="space-y-4 text-center">
				<div>
					<p className="text-xl font-medium">Успешно потвърдихте своя глас!</p>
					<p className="text-muted-foreground mt-2">
						Вашият глас е записан и ще бъде отчетен при крайното класиране.
					</p>
				</div>
				<p className="text-muted-foreground text-sm">
					До края на гласуването можете да добавяте или премахвате проекти от своя глас. Използвайте бутона
					„Промени глас“, за да запазите промените си.
				</p>
			</div>
			<SheetClose asChild>
				<DialogClose asChild>
					<Button asChild className="w-full" size="lg">
						<Link href="/projects">Разгледай още проекти</Link>
					</Button>
				</DialogClose>
			</SheetClose>
		</div>
	);
}

function RegisterVoterButton({ ...props }: React.ComponentPropsWithoutRef<typeof Button>) {
	const trpc = useTRPC();
	const { data: currentVoter } = useSuspenseQuery(trpc.voting.getCurrentVoter.queryOptions());
	const [wasVerificationEmailSent, setWasVerificationEmailSent] = useState(false);
	const votedProjects = useVotedProjects();
	const selectedCount = votedProjects.length;

	const step = !currentVoter
		? ('register' as const)
		: !wasVerificationEmailSent
			? ('send-verification-email' as const)
			: !currentVoter.isVerified
				? ('enter-verification-code' as const)
				: ('success' as const);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-full" size="lg" disabled={selectedCount === 0} {...props}>
					{selectedCount === 0
						? 'Изберете поне един проект'
						: `Гласувайте за ${selectedCount} ${selectedCount === 1 ? 'проект' : 'проекта'}`}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					{step === 'register' ? (
						<>
							<DialogTitle>Потвърждение на имейл</DialogTitle>
							<DialogDescription>
								За да гласувате, е необходимо да потвърдите вашия имейл адрес.
							</DialogDescription>
						</>
					) : step === 'send-verification-email' ? (
						<>
							<DialogTitle>Потвърждение на имейл</DialogTitle>
							<DialogDescription>
								Моля, въведете вашия имейл адрес, за да можете да гласувате.
							</DialogDescription>
						</>
					) : step === 'enter-verification-code' ? (
						<>
							<DialogTitle>Въведете кода за потвърждение</DialogTitle>
							<DialogDescription>
								Моля, въведете кода за потвърждение, който ви е изпратен на имейла ви.
							</DialogDescription>
						</>
					) : (
						<>
							<DialogTitle>Успешно потвърждение</DialogTitle>
							<DialogDescription>Вашият глас е успешно потвърден и записан.</DialogDescription>
						</>
					)}
				</DialogHeader>

				{step === 'register' && (
					<RegisterVoterStep onVerificationEmailSent={() => setWasVerificationEmailSent(true)} />
				)}
				{step === 'send-verification-email' && (
					<SendVerificationEmailStep onVerificationEmailSent={() => setWasVerificationEmailSent(true)} />
				)}
				{step === 'enter-verification-code' && <EnterVerificationCodeStep />}
				{step === 'success' && <SuccessStep />}
			</DialogContent>
		</Dialog>
	);
}

function SaveVotesButton(props: React.ComponentProps<typeof Button>) {
	const votedProjects = useVotedProjects();
	const selectedCount = votedProjects.length;

	return (
		<Button className="w-full" size="lg" disabled={selectedCount === 0} {...props}>
			Промени глас
		</Button>
	);
}
