import { Contributor } from '@/app/projects/[projectId]/page';

const Contributors = ({ contributors }: { contributors: Contributor[] }) => (
	<div className="w-full max-w-screen-lg">
		<div className="flex flex-col gap-4 px-8 py-4">
			<div className="flex flex-wrap items-center justify-center gap-4">
				{contributors?.map((creator) => (
					<div
						key={creator?.name}
						className="border-border bg-background hover:bg-sand flex w-full items-center gap-2 rounded-xl border-2 px-4 py-2 hover:text-black md:w-[calc(50%-1rem)]"
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
