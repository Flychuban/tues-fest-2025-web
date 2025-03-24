'use client';

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { STATISTICS } from '@/info/statistics';
import { BsPeople } from 'react-icons/bs';
import { FaRegBuilding } from 'react-icons/fa';
import { GrAchievement } from 'react-icons/gr';
import { PiProjectorScreenChart } from 'react-icons/pi';
import { TbSTurnDown } from 'react-icons/tb';
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import About from './About';

import './styles.css';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FOLDERS } from '@/info/folders';
import { FaRegFolder, FaRegFolderOpen } from 'react-icons/fa';

export default function Statistics() {
	const [selectedFolder, setSelectedFolder] = useState(8);

	return (
		<div className="block w-full  rounded-xl border border-[#F2F2F2] bg-opacity-0  bg-clip-padding backdrop-blur-sm backdrop-filter sm:border-2  sm:backdrop-blur-md">
			<About />
			<div className="px-2 md:px-6 lg:px-10 xl:px-14 ">
				<h2 className="bg-gradient bg-clip-text p-4 text-4xl font-black text-transparent sm:text-5xl">
					ТУЕС Фест през годините
				</h2>
				<div className="block w-full xl:flex">
					<History selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} />

					<div className="hidden w-full p-2 xl:block xl:w-1/3">
						{STATISTICS.map((statistic) => (
							<Card
								key={statistic.title}
								className={`my-4 h-[300px] overflow-hidden rounded-xl border-2 border-[#FEFEFE] bg-transparent bg-opacity-0 bg-clip-padding pl-0 pr-6 pt-6 text-white shadow-none backdrop-blur-sm backdrop-filter md:w-full md:backdrop-blur-md lg:p-6 lg:pr-10`}
							>
								<div className="m-2 flex justify-center">
									<HeaderIcon icon={statistic.icon} />
									<CardTitle className="ml-2">{statistic.title}</CardTitle>
								</div>
								<div className="bg-transparent">
									<BarStatistic selectedFolder={selectedFolder} data={statistic.data} />
								</div>
							</Card>
						))}
					</div>
					<div className="pb-28 pt-28 xl:hidden">
						<ImagesContainer selectedFolder={selectedFolder} />
					</div>
					<ImagesContainer className="hidden xl:block" selectedFolder={selectedFolder} />
					<div className="block w-full p-2 lg:flex lg:gap-6 xl:hidden xl:w-1/3">
						{STATISTICS.map((statistic) => (
							<Card
								key={statistic.title}
								className="my-4 h-[300px] overflow-hidden rounded-xl border border-[#F2F2F2] bg-opacity-0 bg-clip-padding pl-0 pr-6 pt-6 text-white shadow-none  backdrop-blur-sm backdrop-filter md:mt-10 md:w-full md:backdrop-blur-md lg:p-6 lg:pr-10"
							>
								<div className="m-2 flex justify-center">
									<HeaderIcon icon={statistic.icon} />
									<CardTitle className="ml-2">{statistic.title}</CardTitle>
								</div>
								<div>
									<BarStatistic selectedFolder={selectedFolder} data={statistic.data} />
								</div>
							</Card>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

function HeaderIcon({ icon }: { icon: string }) {
	switch (icon) {
		case 'TbSTurnDown':
			return <TbSTurnDown size={24} />;
		case 'BsPeople':
			return <BsPeople size={24} />;
		case 'PiProjectorScreenChart':
			return <PiProjectorScreenChart size={24} />;
		case 'FaRegBuilding':
			return <FaRegBuilding size={24} />;
		case 'GrAchievement':
			return <GrAchievement size={24} />;
		default:
			return null;
	}
}

function BarStatistic({
	selectedFolder,
	data,
}: {
	selectedFolder: number;
	data: {
		name: string;
		total: number;
	}[];
}) {
	const folder = FOLDERS.find((folder) => folder.id == selectedFolder);

	return (
		<ResponsiveContainer width="100%" className="my-6" height={200}>
			<BarChart data={data}>
				<XAxis dataKey="name" stroke="#fff" fontSize={12} tickLine={false} axisLine={false} />
				<YAxis
					stroke="#fff"
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => `${value}`}
				/>
				<Bar dataKey="total" radius={[4, 4, 0, 0]}>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={folder?.name == entry.name ? '#fbebb7' : 'currentColor'} />
					))}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
}

function History({
	selectedFolder,
	setSelectedFolder,
}: {
	selectedFolder: number;
	setSelectedFolder: (id: number) => void;
}) {
	return (
		<div className="flex w-full justify-center align-middle xl:mx-10 xl:w-1/6">
			<div className="my-[10%] grid h-2/3 grid-cols-4 gap-1 gap-y-0 lg:grid-cols-8 xl:grid-cols-2">
				{FOLDERS.map((folder) => (
					<div
						className="rounded-xl p-5 hover:bg-gradient-to-br hover:shadow-lg sm:hover:cursor-pointer sm:hover:bg-gradient sm:hover:text-black"
						key={folder.id}
						onClick={() => setSelectedFolder(folder.id)}
					>
						<div className="w-[36px] md:w-[40px] lg:w-[56px]">
							{selectedFolder == folder.id ? (
								<FaRegFolderOpen size="100%" />
							) : (
								<FaRegFolder size="100%" />
							)}
						</div>
						<h1 className="text-xl">{folder.name}</h1>
					</div>
				))}
			</div>
		</div>
	);
}

function ImagesContainer({ selectedFolder, className }: { selectedFolder: number; className?: string | undefined }) {
	const folder = FOLDERS.find((folder) => folder.id == selectedFolder);
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
	}, [selectedFolder]);

	if (folder) {
		return (
			<div className={`relative w-full p-10 py-12 xl:w-1/2 ${className}`}>
				<div
					className={`scaleUp absolute left-2 top-4/12  z-20 w-[280px]  overflow-hidden rounded-xl sm:left-6 sm:w-[310px] lg:-top-4/12 lg:left-1/12 lg:w-[360px] lg:overflow-visible xl:left-6 xl:top-2/12 xl:w-[400px] xl:overflow-hidden 2xl:w-[450px] ${
						isFirstImageVisible ? 'visible' : 'hidden'
					}`}
				>
					<Image key={`${folder.id} image 1`} alt={`${folder?.name} image 1`} src={folder.image1} />
				</div>
				<div
					className={`scaleUp absolute bottom-1/12 right-2 z-30  w-[280px] overflow-hidden rounded-xl sm:right-6 sm:w-[310px] lg:-bottom-10 lg:right-1/12 lg:w-[360px] lg:overflow-visible xl:bottom-10 xl:right-10 xl:w-[400px] xl:overflow-hidden 2xl:w-[450px] ${
						isSecondImageVisible ? 'visible' : 'hidden'
					}`}
				>
					<Image key={`${folder.id} image 2`} alt={`${folder?.name} image 2`} src={folder.image2} />
				</div>
			</div>
		);
	} else {
		return null;
	}
}
