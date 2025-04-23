'use client';

import { StaticImageData } from 'next/image';
import { Check } from 'lucide-react';

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useProjectVoteStatus, useToggleProjectSelect } from '@/stores/vote';

export function VoteSelectProjectButton({
	id,
	title,
	thumbnail,
	category,
	className,
	size = 'lg',
	...props
}: {
	id: number;
	title: string;
	thumbnail: StaticImageData;
	category: string;
	className?: string;
	size?: 'default' | 'sm' | 'lg' | 'xl' | 'icon';
}) {
	const { isSelected, hasReachedVoteLimit } = useProjectVoteStatus(id);
	const toggleProjectSelect = useToggleProjectSelect();

	return (
		<VoteLimitReachedDialog projectId={id} {...props}>
			<Button
				variant={isSelected ? 'secondary' : 'default'}
				className={cn(
					className,
					'cursor-pointer',
					isSelected && 'border-primary bg-secondary/80 hover:bg-secondary/90 border-2'
				)}
				size={size}
				onClick={() => toggleProjectSelect({ id, title, thumbnail, category })}
				{...props}
			>
				{isSelected ? (
					<>
						<Check className="size-4" />
						Премахни глас
					</>
				) : (
					'Гласувай'
				)}
			</Button>
		</VoteLimitReachedDialog>
	);
}

interface VoteLimitReachedDialogProps extends React.ComponentProps<typeof AlertDialogTrigger> {
	projectId: number;
}

function VoteLimitReachedDialog({ projectId, ...alertDialogTriggerProps }: VoteLimitReachedDialogProps) {
	const { isSelected, hasReachedVoteLimit } = useProjectVoteStatus(projectId);

	return (
		<AlertDialog open={hasReachedVoteLimit && !isSelected ? undefined : false}>
			<AlertDialogTrigger {...alertDialogTriggerProps} />
			<AlertDialogContent className="sm:max-w-[425px]">
				<AlertDialogHeader>
					<AlertDialogTitle>Edit profile</AlertDialogTitle>
				</AlertDialogHeader>
			</AlertDialogContent>
		</AlertDialog>
	);
}
