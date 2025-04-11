'use client';

import React, { use, useEffect } from 'react';
import Link from 'next/link';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card } from '@/components/ui/card';

export type PathItem = {
	name: string;
	url: string;
};

const ProjectsPath = ({ path }: { path?: PathItem[] | null | undefined }) => {
	if (!path) return null;

	return (
		<section>
			<Card className="rounded-lg border-2 px-8 py-5">
				<Breadcrumb>
					<BreadcrumbList className="text-white">
						{path.map((item, index) => (
							<React.Fragment key={item?.url || `end-${index}`}>
								<BreadcrumbItem>
									{item?.url ? (
										<BreadcrumbLink asChild className="hover:text-primary text-white">
											<Link href={item.url}>{item.name}</Link>
										</BreadcrumbLink>
									) : (
										<BreadcrumbPage className="text-white">{item?.name}</BreadcrumbPage>
									)}
								</BreadcrumbItem>
								{index < path.length - 1 && <BreadcrumbSeparator className="text-white" />}
							</React.Fragment>
						))}
					</BreadcrumbList>
				</Breadcrumb>
			</Card>
		</section>
	);
};

export default ProjectsPath;
