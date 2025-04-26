'use client';

import { useEffect, useState } from 'react';

import { TF_DATE } from '@/constants/event';
import { cn } from '@/lib/utils';

const Countdown = () => {
	const [countdown, setCountdown] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	const count = () => {
		const countDate = TF_DATE.getTime();
		const now = new Date().getTime();
		const gap = countDate - now;

		// how time works
		const second = 1000;
		const minute = second * 60;
		const hour = minute * 60;
		const day = hour * 24;

		// calculate
		const textDay = Math.floor(gap / day);
		const textHour = Math.floor((gap % day) / hour);
		const textMinute = Math.floor((gap % hour) / minute);
		const textSecond = Math.floor((gap % minute) / second);

		setCountdown({
			days: textDay,
			hours: textHour,
			minutes: textMinute,
			seconds: textSecond,
		});
	};

	const getFinalValues = () => {
		const countDate = TF_DATE.getTime();
		const now = new Date().getTime();
		const gap = countDate - now;

		// how time works
		const second = 1000;
		const minute = second * 60;
		const hour = minute * 60;
		const day = hour * 24;

		// calculate
		const textDay = Math.floor(gap / day);
		const textHour = Math.floor((gap % day) / hour);
		const textMinute = Math.floor((gap % hour) / minute);
		const textSecond = Math.floor((gap % minute) / second);

		return {
			days: textDay,
			hours: textHour,
			minutes: textMinute,
			seconds: textSecond,
		};
	};

	const startCountdown = () => {
		const { days, hours, minutes, seconds } = getFinalValues();
		const duration = 1800;

		const newInterval = setInterval(() => {
			setCountdown((prevCountdown) => ({
				...prevCountdown,
				days: prevCountdown.days + 1 > days ? days : prevCountdown.days + 1,
			}));
		}, duration / days);

		const newWInterval = setInterval(() => {
			setCountdown((prevCountdown) => ({
				...prevCountdown,
				hours: prevCountdown.hours + 1 > hours ? hours : prevCountdown.hours + 1,
			}));
		}, duration / hours);

		const newMInterval = setInterval(() => {
			setCountdown((prevCountdown) => ({
				...prevCountdown,
				minutes: prevCountdown.minutes + 1 > minutes ? minutes : prevCountdown.minutes + 1,
			}));
		}, duration / minutes);

		const newSInterval = setInterval(() => {
			setCountdown((prevCountdown) => ({
				...prevCountdown,
				seconds: prevCountdown.seconds + 1 > seconds ? seconds : prevCountdown.seconds + 1,
			}));
		}, duration / seconds);

		// stop interval after 5 seconds
		setTimeout(() => {
			clearInterval(newInterval);
			clearInterval(newWInterval);
			clearInterval(newMInterval);
			clearInterval(newSInterval);
		}, duration);
	};

	const format = (item: number) => (item < 10 ? `0${item}` : item);

	// call countdown function
	useEffect(() => {
		startCountdown();
		const interval = setInterval(count, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="text-foreground/80 grid grid-cols-1 text-center text-5xl font-bold">
			{Array.from({ length: 3 }, (_, i) => (
				<ul
					key={i}
					className={cn(
						'text-foreground/80 mt-4 flex items-center justify-center gap-4 py-4 text-4xl font-bold',
						'col-start-1 row-start-1',
						'animate-in fade-in-0 zoom-in-95 duration-300',
						// Glitch effect styles
						'odd:glitch-odd even:glitch-even'
					)}
					style={
						{
							// Use proper typing for CSS variables
							'--stack-height': `calc(100% / 3 - 1px)`,
							'--index': `${i}`,
							'--inverse-index': `calc(2 - ${i})`,
							'--clip-top': `calc(var(--stack-height) * var(--index))`,
							'--clip-bottom': `calc(var(--stack-height) * var(--inverse-index))`,
							clipPath: 'inset(var(--clip-top) 0 var(--clip-bottom) 0)',
							animation: `stack 340ms cubic-bezier(0.46, 0.29, 0, 1.24) 1 backwards calc(${i} * 120ms), glitch 2s ease infinite 2s alternate-reverse`,
						} as React.CSSProperties
					}
				>
					<li className="border-border bg-card text-card-foreground xs:h-20 xs:w-20 flex h-32 w-32 flex-col items-center justify-center rounded-xl border shadow-sm transition-all sm:h-24 sm:w-24 md:h-28 md:w-28">
						<span className="animate-countUp xs:text-xl text-4xl sm:text-2xl md:text-3xl">
							{format(countdown.days)}
						</span>
						<span className="text-muted-foreground xs:text-sm text-xl font-light sm:text-base md:text-lg">
							{countdown.days === 1 ? 'ден' : 'дни'}
						</span>
					</li>
					<li className="border-border bg-card text-card-foreground xs:h-20 xs:w-20 flex h-32 w-32 flex-col items-center justify-center rounded-xl border shadow-sm transition-all sm:h-24 sm:w-24 md:h-28 md:w-28">
						<span className="animate-countUp xs:text-xl text-4xl sm:text-2xl md:text-3xl">
							{format(countdown.hours)}
						</span>
						<span className="text-muted-foreground xs:text-sm text-xl font-light sm:text-base md:text-lg">
							{countdown.hours === 1 ? 'час' : 'часа'}
						</span>
					</li>
					<li className="border-border bg-card text-card-foreground xs:h-20 xs:w-20 flex h-32 w-32 flex-col items-center justify-center rounded-xl border shadow-sm transition-all sm:h-24 sm:w-24 md:h-28 md:w-28">
						<span className="animate-countUp xs:text-xl text-4xl sm:text-2xl md:text-3xl">
							{format(countdown.minutes)}
						</span>
						<span className="text-muted-foreground xs:text-sm text-xl font-light sm:text-base md:text-lg">
							{countdown.minutes === 1 ? 'минута' : 'минути'}
						</span>
					</li>
					<li className="border-border bg-card text-card-foreground xs:h-20 xs:w-20 flex h-32 w-32 flex-col items-center justify-center rounded-xl border shadow-sm transition-all sm:h-24 sm:w-24 md:h-28 md:w-28">
						<span className="animate-countUp xs:text-xl text-4xl sm:text-2xl md:text-3xl">
							{format(countdown.seconds)}
						</span>
						<span className="text-muted-foreground xs:text-sm text-xl font-light sm:text-base md:text-lg">
							{countdown.seconds === 1 ? 'секунда' : 'секунди'}
						</span>
					</li>
				</ul>
			))}

			{/* Add the CSS for glitch effect animations */}
			<style jsx>{`
				@keyframes stack {
					0% {
						opacity: 0;
						transform: translateX(-50%);
						text-shadow:
							-2px 3px 0 hsl(var(--destructive)),
							2px -3px 0 hsl(var(--primary));
					}
					60% {
						opacity: 0.5;
						transform: translateX(50%);
					}
					80% {
						transform: none;
						opacity: 1;
						text-shadow:
							2px -3px 0 hsl(var(--destructive)),
							-2px 3px 0 hsl(var(--primary));
					}
					100% {
						text-shadow: none;
					}
				}

				@keyframes glitch {
					0% {
						text-shadow:
							-2px 3px 0 hsl(var(--destructive)),
							2px -3px 0 hsl(var(--primary));
						transform: translate(var(--glitch-translate));
					}
					2% {
						text-shadow:
							2px -3px 0 hsl(var(--destructive)),
							-2px 3px 0 hsl(var(--primary));
					}
					4%,
					100% {
						text-shadow: none;
						transform: none;
					}
				}

				@keyframes countUp {
					0% {
						opacity: 0;
					}
					100% {
						opacity: 1;
					}
				}

				.glitch-odd {
					--glitch-translate: 8px;
				}

				.glitch-even {
					--glitch-translate: -8px;
				}

				.animate-countUp {
					animation: countUp 0.75s ease-in forwards;
				}

				/* Responsive layout for mobile */
				@media screen and (max-width: 410px) {
					ul {
						display: grid;
						grid-template-columns: 1fr 1fr;
						grid-template-rows: 1fr 1fr;
						gap: 1rem;
					}
				}
			`}</style>
		</div>
	);
};

export default Countdown;
