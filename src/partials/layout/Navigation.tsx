'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDay } from '@/context/day';
import { TbMapPin, TbMenu2, TbSchool } from 'react-icons/tb';

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
		href: '/#lectors',
		title: 'Лектори',
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
			target={target || '_self'}
			className={`mx-2 flex whitespace-nowrap py-2 text-center text-base font-semibold 
				text-[#bababa]
			group-hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${className}`}
		>
			{children}
		</Link>
	);
};

const Navigation = () => {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const { day, setDay } = useDay();
	const [dayValue, setDayValue] = useState(`day-${day}`);
	const [isClient, setIsClient] = useState(false);
	const [desktopOpen, setDesktopOpen] = useState(false);
	const desktopMenuRef = useRef<HTMLDivElement>(null);
	const desktopButtonRef = useRef<HTMLButtonElement>(null);
	const mobileMenuRef = useRef<HTMLDivElement>(null);
	const mobileButtonRef = useRef<HTMLButtonElement>(null);

	const handleScroll = () => {
		const offset = window.scrollY;
		if (offset > 50) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (mobileOpen && mobileMenuRef.current && mobileButtonRef.current) {
				if (
					!mobileMenuRef.current.contains(event.target as Node) &&
					!mobileButtonRef.current.contains(event.target as Node)
				) {
					setMobileOpen(false);
				}
			}
			if (desktopOpen && desktopMenuRef.current && desktopButtonRef.current) {
				if (
					!desktopMenuRef.current.contains(event.target as Node) &&
					!desktopButtonRef.current.contains(event.target as Node)
				) {
					setDesktopOpen(false);
				}
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [mobileOpen, mobileMenuRef, mobileButtonRef, desktopOpen, desktopMenuRef, desktopButtonRef]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('day', day.toString());
			setDayValue(day == 1 ? 'day-1' : day == 2 ? 'day-2' : '');
		}
	}, [day]);

	useEffect(() => {
		setIsClient(true);
		if (typeof window !== 'undefined') {
			const storedDay = localStorage.getItem('day');
			if (storedDay) {
				setDay(parseInt(storedDay));
				setDayValue(storedDay == '1' ? 'day-1' : storedDay == '2' ? 'day-2' : '');
			}
		}

		window.addEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		const handleResize = () => {
			const buttonStyle = desktopButtonRef.current ? window.getComputedStyle(desktopButtonRef.current) : null;
			if (buttonStyle?.display === 'none') {
				setDesktopOpen(false);
			}
		};

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	if (!isClient) {
		return null;
	}

	let navbarClasses = [
		'header',
		'top-0',
		'left-0',
		'py-1',
		'flex',
		'w-full',
		'items-center',
		'transition',
		'fixed',
		'duration-500',
		'z-50',
		'bg-[#1E1E1E]',
		'bg-opacity-0',
		'shadow-sticky',
		'backdrop-blur-md',
		'duration-500',
		...(scrolled ? ['bg-opacity-60'] : ['bg-opacity-0']),
	];

	return (
		<header className={navbarClasses.join(' ')}>
			<div className="container">
				<div className="relative mx-[-16px] flex items-center justify-between text-center">
					<div className="w-60 max-w-full px-2 sm:px-4">
						<Link
							href="/"
							className={`header-logo	 text-md block w-full whitespace-nowrap py-2 md:text-lg lg:py-7`}
							style={{ fontFamily: 'origin', fontWeight: 800 }}
						>
							TUES <span className=" bg-gradient bg-clip-text font-normal text-transparent ">Fest</span>{' '}
							<br className="text-xl sm:hidden" />
							2024
						</Link>
					</div>
					<div className="flex w-min items-center justify-between sm:px-4">
						<div className="static lg:absolute  lg:left-48">
							<button
								onClick={() => setMobileOpen(!mobileOpen)}
								id="navbarToggler"
								name="navbarToggler"
								ref={mobileButtonRef}
								className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-2 py-2 ring-primary focus:ring-2 lg:hidden"
							>
								<TbMenu2 size={32} />
							</button>
							<nav
								id="navbarCollapse"
								ref={mobileMenuRef}
								className={
									`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-bg-color py-3 shadow-lg lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:px-4 lg:py-0 lg:shadow-none xl:px-6` +
									(mobileOpen ? ' block' : ' hidden')
								}
							>
								<ul className="block lg:flex">
									{LINKS.map((link) => {
										if (day == 1) {
											return (
												<li
													className="group relative"
													onClick={() => setMobileOpen(false)}
													key={link.title}
												>
													<Linky className="!mx-4" href={link.href}>
														{link.title == 'Програма'
															? day == 1
																? 'Програма - Ден 1'
																: 'Програма - Ден 2'
															: link.title}
													</Linky>
												</li>
											);
										}
										if (day == 2) {
											if (link.title != 'Лектори')
												return (
													<li
														className="group relative"
														onClick={() => setMobileOpen(false)}
														key={link.title}
													>
														<Linky className="!mx-4" href={link.href}>
															{link.title === 'Програма'
																? day === (1 as number)
																	? 'Програма - Ден 1'
																	: 'Програма - Ден 2'
																: link.title}
														</Linky>
													</li>
												);
										}
									})}

									{SCHOOL_LINKS.map((link) => (
										<li
											key={link.title}
											className="group relative block lg:hidden"
											onClick={() => setMobileOpen(false)}
										>
											<Linky className="!mx-4" href={link.href}>
												{link.title}
											</Linky>
										</li>
									))}
								</ul>
							</nav>
						</div>
						<div className="flex items-center justify-end pr-20 sm:pr-16 lg:pr-0">
							<button
								className="text-md mr-3 hidden h-full w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-lg lg:w-44 xl:flex"
								onClick={() => setDesktopOpen(!desktopOpen)}
								ref={desktopButtonRef}
							>
								<TbSchool size={24} />
								<p>{'За ТУЕС'}</p>
							</button>
							<nav
								id="navbarCollapse"
								ref={desktopMenuRef}
								className={
									`absolute right-96 top-full w-full max-w-[250px] justify-center rounded-lg bg-bg-color py-3 shadow-lg` +
									(desktopOpen ? ' block' : ' hidden')
								}
							>
								<ul className="block">
									{SCHOOL_LINKS.map((link) => (
										<li
											className="group relative"
											onClick={() => setDesktopOpen(false)}
											key={link.title}
										>
											<Linky target={link.target} href={link.href}>
												{link.title}
											</Linky>
										</li>
									))}
								</ul>
							</nav>
							<Link
								href="https://maps.app.goo.gl/RHDd9NVx11hVvQVh6"
								target="_blank"
								className="mr-2 hidden w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-lg sm:flex md:w-60"
							>
								<TbMapPin size={24} />
								<p>{'София Тех Парк'}</p>
							</Link>

							<Tabs defaultValue={`${dayValue}`}>
								<TabsList className="w-[200px] sm:w-min">
									<div className="flex w-min rounded-lg  border-2">
										<TabsTrigger value="day-1" onClick={() => setDay(1)} className="text-xl">
											Ден 1
										</TabsTrigger>
										<TabsTrigger value="day-2" onClick={() => setDay(2)} className="text-xl">
											Ден 2
										</TabsTrigger>
									</div>
								</TabsList>
							</Tabs>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navigation;
