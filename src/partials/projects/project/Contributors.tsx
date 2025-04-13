import { buttonVariants } from '@/components/ui/button';
import { Contributor } from '@/app/projects/[projectId]/page';
import { cn } from '@/lib/utils';

const Contributors = ({ contributors }: { contributors: Contributor[] }) => (
	<div className="w-full max-w-screen-lg">
		<div className="flex flex-col gap-4 px-8 py-4">
			<div className="flex flex-wrap items-center justify-center gap-4">
				{contributors?.map((creator) => (
					<div
						key={creator?.name}
						className={cn(
							buttonVariants({ variant: 'outline', size: 'xl' }),
							'w-full md:w-[calc(50%-1rem)]'
						)}
					>
						<p className="flex w-full break-before-avoid flex-col gap-1 whitespace-pre-line text-center sm:block">
							{creator?.name} <span className="text-sm opacity-70">от {creator?.class} клас</span>
						</p>
					</div>
				))}
			</div>
		</div>
	</div>
);

export default Contributors;
