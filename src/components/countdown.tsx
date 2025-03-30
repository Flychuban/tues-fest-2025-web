'use client';

import { useEffect, useState } from 'react';

import 'animate.css';

import countdownStyles from '@/styles/home/countdown.module.css';
import { TF_DATE } from '@/constants/event';

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
		<div className={countdownStyles.stack /* + ' animate__animated animate__fadeInTopRight' */}>
			{Array.from({ length: 3 }, (_, i) => (
				<ul key={i} id={countdownStyles['stack' + i]} className={countdownStyles.countdown + ' gap-4'}>
					<li id={countdownStyles.days} className="bg-background border-border rounded-xl border">
						<div className={countdownStyles.number + ' ' + countdownStyles.animate}>
							{format(countdown.days)}
						</div>
						<div className={countdownStyles.label}>дни</div>
					</li>
					<li id={countdownStyles.hours} className="bg-background border-border rounded-xl border">
						<div className={countdownStyles.number + ' ' + countdownStyles.animate}>
							{format(countdown.hours)}
						</div>
						<div className={countdownStyles.label}>часове</div>
					</li>
					<li id={countdownStyles.minutes} className="bg-background border-border rounded-xl border">
						<div className={countdownStyles.number + ' ' + countdownStyles.animate}>
							{format(countdown.minutes)}
						</div>
						<div className={countdownStyles.label}>минути</div>
					</li>
					<li id={countdownStyles.seconds} className="bg-background border-border rounded-xl border">
						<div className={countdownStyles.number + ' ' + countdownStyles.animate}>
							{format(countdown.seconds)}
						</div>
						<div className={countdownStyles.label}>секунди</div>
					</li>
				</ul>
			))}
		</div>
	);
};

export default Countdown;
