'use client';

import { use, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

const ProjectsPath = ({
	path,
}: {
	path:
		| {
				name: string;
				url: string;
		  }[]
		| null
		| undefined;
}) => {
	if (!path) return null;

	return (
		<section className="pt-28">
			<div className="container">
				<Card className="mx-4 rounded-lg opacity-100 bg-black text-white border-2 border-stroke px-8 py-5">
					<ul className="items-cente flex flex-wrap gap-3 text-ellipsis">
						{path.map((item) => (
							<>
								{item?.url ? (
									<>
										<Link
											key={item?.url}
											href={item?.url || '#'}
											className={`text-white ${item?.url && 'hover:text-primary'}`}
										>
											<li className="flex items-center text-base font-medium text-white">
												{item?.name}
												<span className="pl-3"> / </span>
											</li>
										</Link>
									</>
								) : (
									<li key={'end'} className="flex items-center text-base font-medium text-white">
										{item?.name}
									</li>
								)}
							</>
						))}
					</ul>
				</Card>
			</div>
		</section>
	);
};

export default ProjectsPath;
