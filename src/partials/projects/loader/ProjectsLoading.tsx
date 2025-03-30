const ProjectsLoading = () => {
	return (
		<div className="-mx-4 flex flex-wrap items-stretch justify-center">
			{/* generate 6 of these */}
			{[...Array(8)].map((_, i) => (
				<div className="w-full shrink-0 animate-pulse px-4 md:w-1/2 lg:w-1/3 2xl:w-1/4" key={i}>
					<div className="border-stroke bg-bg-color mb-10 rounded-xl border p-[18px]">
						<div className="relative mb-5 overflow-hidden rounded-lg">
							<div className="bg-bg-color aspect-video w-full rounded-lg object-cover" />
						</div>
						<div>
							<div className="hover:text-primary mb-3 inline-block h-[1.5rem] w-3 text-lg font-semibold text-white"></div>
							<div className="border-bg-color flex items-center justify-between border-t-2 pt-5">
								<div className="flex h-[2.75rem] w-4 items-center justify-center rounded-md px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-opacity-90 sm:px-5"></div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default ProjectsLoading;
