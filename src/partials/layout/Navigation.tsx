'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { TbMapPin, TbMenu2, TbSchool } from 'react-icons/tb';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { TF_LOCATION, TF_YEAR } from '@/constants/event';
import { TF_TITLE } from '@/constants/seo';
import { cn } from '@/lib/utils';
import { TFLogo } from '../home/TFLogo';

const LINKS = [
	// {
	// 	href: '/',
	// 	title: 'Начало',
	// },
	{
		href: '/projects',
		title: 'Проекти',
	},
	{
		href: '/#schedule',
		title: 'Програма',
	},
	// {
	// 	href: '/projects',
	// 	title: 'Гласуване',
	// },
];

const SCHOOL_LINKS = [
	{
		href: '/about',
		title: 'Училището',
	},
	{
		href: '/apply',
		title: 'Кандидатстване',
	},
	{
		href: 'https://elsys-bg.org/uchilishteto/prepodavatelski-ekip',
		title: 'Преподавателски екип',
		target: '_blank',
	},
	{
		href: '/tuestalks',
		title: 'TUES Talks',
	},
];

const Linky = ({
	href,
	children,
	className,
	target,
}: {
	href: string;
	children: string;
	className?: string | null;
	target?: string | null;
}) => {
	return (
		<Link
			href={href}
			target={target ?? '_self'}
			className={`mx-2 flex whitespace-nowrap py-2 text-center text-base font-semibold 
				text-[#bababa]
			group-hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${className}`}
		>
			{children}
		</Link>
	);
};

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
	return (
		<Link
			href={href}
			onClick={onClick}
			className="data-[state=open]:bg-accent/50 bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[state=open]:text-accent-foreground data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
		>
			{children}
		</Link>
	);
}

export function Navigation() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header
			className={cn(
				'fixed top-0 z-50 flex w-full items-center justify-center px-4 shadow-sm transition-colors duration-300',
				isScrolled ? 'bg-background/90 backdrop-blur-sm' : 'bg-transparent'
			)}
		>
			<div className="h-(--header-height) container flex items-center justify-center">
				<div className="flex h-16 w-full items-center justify-between px-4">
					<div className="flex items-center gap-4">
						<Link href="/" className="text-lg font-bold">
							<TFLogo />
						</Link>

						{/* Desktop Navigation */}
						<nav className="hidden items-center space-x-2 lg:flex">
							{LINKS.map((link) => (
								<NavLink key={link.title} href={link.href}>
									{link.title}
								</NavLink>
							))}
						</nav>
					</div>

					<div className="flex items-center gap-4">
						<DropdownMenu modal={false}>
							<DropdownMenuTrigger asChild>
								<Button className="hidden sm:inline-flex" variant="secondary" size="lg">
									<TbSchool className="mr-2 h-4 w-4" />
									За ТУЕС
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								{SCHOOL_LINKS.map((link) => (
									<DropdownMenuItem asChild key={link.title}>
										<Link href={link.href} target={link.target}>
											{link.title}
										</Link>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
						<Button className="hidden sm:inline-flex" variant="outline" size="lg" asChild>
							<Link href="/location">
								<TbMapPin className="mr-2 h-4 w-4" />
								{TF_LOCATION}
							</Link>
						</Button>
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon" className="inline-flex lg:hidden">
									<TbMenu2 className="h-5 w-5" />
								</Button>
							</SheetTrigger>
							<SheetContent side="right" className="gap-2 sm:max-w-sm">
								<SheetHeader>
									<SheetTitle className="m-auto py-3">
										<TFLogo />
									</SheetTitle>
								</SheetHeader>
								<div className="grid gap-4">
									{LINKS.map((link) => (
										<NavLink key={link.title} href={link.href}>
											{link.title}
										</NavLink>
									))}
									{SCHOOL_LINKS.map((link) => (
										<NavLink key={link.title} href={link.href}>
											{link.title}
										</NavLink>
									))}
									<NavLink href="/location">Локация</NavLink>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
	);
}
