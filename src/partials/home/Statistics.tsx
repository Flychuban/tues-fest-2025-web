'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Folder, FolderOpen } from 'lucide-react';
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GradientHeading } from '@/components/ui/gradient-heading';
import { FOLDERS } from '@/info/folders';
import { STATISTICS } from '@/info/statistics';

export default function Statistics() {
	const [selectedFolderIndex, setSelectedFolderIndex] = useState(9);

	return (
		<section id="statistics" className="px-4 py-12 md:px-8">
			<GradientHeading size="lg" className="mb-8">
				ТУЕС Фест през годините
			</GradientHeading>

			<div className="block w-full xl:flex xl:gap-8">
				{/* Folder Navigation */}
				<FolderNavigation
					selectedFolderIndex={selectedFolderIndex}
					setSelectedFolderIndex={setSelectedFolderIndex}
				/>

				{/* Desktop Statistics */}
				<div className="hidden w-full xl:block xl:w-1/3">
					<StatisticsCards selectedFolderIndex={selectedFolderIndex} />
				</div>

				{/* Images Container */}
				<div className="py-16 xl:hidden">
					<ImagesContainer selectedFolderIndex={selectedFolderIndex} />
				</div>
				<ImagesContainer className="hidden xl:block xl:w-1/2" selectedFolderIndex={selectedFolderIndex} />

				{/* Mobile/Tablet Statistics */}
				<div className="block w-full xl:hidden">
					<StatisticsCards selectedFolderIndex={selectedFolderIndex} />
				</div>
			</div>
		</section>
	);
}

function StatisticsCards({ selectedFolderIndex }: { selectedFolderIndex: number }) {
	return (
		<div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0 xl:flex xl:flex-col">
			{STATISTICS.map((statistic) => (
				<Card key={statistic.title} className="bg-card/80 border-border backdrop-blur-sm">
					<CardHeader className="flex flex-row items-center gap-2">
						<statistic.icon className="text-primary h-5 w-5" />
						<CardTitle>{statistic.title}</CardTitle>
					</CardHeader>
					<CardContent>
						<BarStatistic selectedFolderIndex={selectedFolderIndex} data={statistic.data} />
					</CardContent>
				</Card>
			))}
		</div>
	);
}

function BarStatistic({
	selectedFolderIndex,
	data,
}: {
	selectedFolderIndex: number;
	data: {
		name: string;
		total: number;
	}[];
}) {
	const folder = FOLDERS.find((folder) => folder.id === selectedFolderIndex);

	return (
		<ResponsiveContainer width="100%" height={200}>
			<BarChart data={data}>
				<XAxis dataKey="name" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} />
				<YAxis
					stroke="currentColor"
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => `${value}`}
				/>
				<Bar dataKey="total" radius={[4, 4, 0, 0]}>
					{data.map((entry, index) => (
						<Cell
							key={`cell-${index}`}
							fill={folder?.name === entry.name ? 'var(--primary)' : 'var(--muted)'}
						/>
					))}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
}

function FolderNavigation({
	selectedFolderIndex,
	setSelectedFolderIndex,
}: {
	selectedFolderIndex: number;
	setSelectedFolderIndex: (id: number) => void;
}) {
	return (
		<div className="w-full xl:w-1/6">
			<div className="grid grid-cols-3 gap-2 lg:grid-cols-9 xl:grid-cols-2">
				{FOLDERS.map((folder) => (
					<Button
						key={folder.id}
						variant={selectedFolderIndex === folder.id ? 'default' : 'outline'}
						className="flex h-auto flex-col items-center gap-2 p-4"
						onClick={() => setSelectedFolderIndex(folder.id)}
					>
						{selectedFolderIndex === folder.id ? (
							<FolderOpen className="h-8 w-8" />
						) : (
							<Folder className="h-8 w-8" />
						)}
						<span>{folder.name}</span>
					</Button>
				))}
			</div>
		</div>
	);
}

function ImagesContainer({ selectedFolderIndex, className }: { selectedFolderIndex: number; className?: string }) {
	const folder = FOLDERS.find((folder) => folder.id === selectedFolderIndex);
	const [isFirstImageVisible, setIsFirstImageVisible] = useState(false);
	const [isSecondImageVisible, setIsSecondImageVisible] = useState(false);

	useEffect(() => {
		setIsFirstImageVisible(false);
		setIsSecondImageVisible(false);

		const timer1 = setTimeout(() => {
			setIsFirstImageVisible(true);
		}, 300);

		const timer2 = setTimeout(() => {
			setIsSecondImageVisible(true);
		}, 600);

		return () => {
			clearTimeout(timer1);
			clearTimeout(timer2);
		};
	}, [selectedFolderIndex]);

	if (!folder) return null;

	return (
		<div className={`relative h-[500px] ${className ?? 'w-full'}`}>
			<div
				className={`absolute left-4 top-4 z-20 w-[280px] overflow-hidden rounded-lg shadow-lg transition-all 
          duration-500 sm:w-[310px] lg:w-[360px] xl:w-[400px] 2xl:w-[450px] 
          ${isFirstImageVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}
			>
				<Image
					key={`${folder.id}-image-1`}
					alt={`${folder.name} image 1`}
					src={folder.image1 || '/placeholder.svg'}
					className="h-auto w-full"
				/>
			</div>
			<div
				className={`absolute bottom-4 right-4 z-30 w-[280px] overflow-hidden rounded-lg shadow-lg transition-all 
          duration-500 sm:w-[310px] lg:w-[360px] xl:w-[400px] 2xl:w-[450px] 
          ${isSecondImageVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
			>
				<Image
					key={`${folder.id}-image-2`}
					alt={`${folder.name} image 2`}
					src={folder.image2 || '/placeholder.svg'}
					className="h-auto w-full"
				/>
			</div>
		</div>
	);
}
