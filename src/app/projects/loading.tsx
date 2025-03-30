import { Card } from '@/components/ui/card';
import { TF_TITLE } from '@/constants/seo';
import ProjectsPath from '@/partials/layout/ProjectsPath';

const PATH: {
	name: string;
	url: string;
}[] = [
	{
		name: TF_TITLE,
		url: '/',
	},
	{
		name: 'Проекти',
		url: '',
	},
];

const ProjectsLoading = () => {
	return (
		<div className="container">
			<ProjectsPath path={PATH} />
			<div className="">
				<section className="pt-8">
					<div className="mx-4 ">
						<Card className="border-stroke m-4 mb-14 rounded-lg border-2 bg-black px-5 py-4 text-white opacity-100">
							<div className="-mx-4 flex flex-wrap items-center justify-between">
								<div className="w-full px-4">
									<div className="flex flex-wrap justify-center gap-4 overflow-x-auto lg:justify-start">
										<button className="hover:bg-primary inline-flex items-center justify-center whitespace-nowrap rounded-md bg-[#353444] px-5 py-[10px] text-base font-semibold text-white transition-all">
											Всички
										</button>
										<button className="hover:bg-primary inline-flex items-center justify-center whitespace-nowrap rounded-md bg-[#353444] px-5 py-[10px] text-base font-semibold text-white transition-all">
											Хардуер
										</button>
										<button className="hover:bg-primary inline-flex items-center justify-center whitespace-nowrap rounded-md bg-[#353444] px-5 py-[10px] text-base font-semibold text-white transition-all">
											Софтуер
										</button>
										<button className="hover:bg-primary inline-flex items-center justify-center whitespace-nowrap rounded-md bg-[#353444] px-5 py-[10px] text-base font-semibold text-white transition-all">
											Battle Bots
										</button>
										<button className="hover:bg-primary inline-flex items-center justify-center whitespace-nowrap rounded-md bg-[#353444] px-5 py-[10px] text-base font-semibold text-white transition-all">
											Мрежи
										</button>
									</div>
								</div>
							</div>
						</Card>
					</div>
				</section>
			</div>
		</div>
	);
};

export default ProjectsLoading;
