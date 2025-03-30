'use client';

import { useEffect, useState } from 'react';

const EMPTY_CALC = {
	bgl: 0,
	math: 0,
	math7: 2,
	phys7: 2,
};

const EMPTY_ERR = {
	bgl: '',
	math: '',
	math7: '',
	phys7: '',
};

const CalculatorField = ({ name, label, min, max, value, error, onChange }: any) => {
	return (
		<div>
			<label htmlFor={name} className="mb-2 block text-base font-medium text-white">
				{label}
			</label>
			<input
				type="number"
				id={name}
				name={name}
				className="text-body-color w-full  appearance-none rounded-md border  bg-transparent px-6 py-3 text-base font-medium outline-none backdrop-blur-sm transition-all sm:backdrop-blur-md"
				min={min}
				max={max}
				value={value}
				onChange={onChange}
			/>
			{error && <p>{error}</p>}
		</div>
	);
};

const Calculator = () => {
	const [result, setResult] = useState(0);
	const [calculator, setCalculator] = useState<{
		bgl: number | '';
		math: number | '';
		math7: number | '';
		phys7: number | '';
	}>(EMPTY_CALC);
	const [errorCalculator, setErrorCalculator] = useState(EMPTY_ERR);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCalculator({ ...calculator, [e.target.name]: e.target.value === '' ? '' : parseFloat(e.target.value) });
	};

	useEffect(() => {
		if (calculator.bgl === '' || calculator.math === '' || calculator.math7 === '' || calculator.phys7 === '')
			return;

		const errors = EMPTY_ERR;

		errors.bgl = calculator.bgl < 0 || calculator.bgl > 100 ? 'НВО по БЕЛ трябва да е между 0 и 100т.' : '';

		errors.math =
			calculator.math < 0 || calculator.math > 100 ? 'НВО по Математика трябва да е между 0 и 100т.' : '';

		errors.math7 =
			calculator.math7 < 2 || calculator.math7 > 6
				? 'Оценка по Математика за 7 клас трябва да е между 2 и 6.'
				: '';

		errors.phys7 =
			calculator.phys7 < 2 || calculator.phys7 > 6 ? 'Оценка по Физика за 7 клас трябва да е между 2 и 6.' : '';

		setErrorCalculator(errors);
		if (errors.bgl || errors.math || errors.math7 || errors.phys7) return;

		const result = calculator.bgl + calculator.math * 3 + (calculator.math7 - 1) * 10 + (calculator.phys7 - 1) * 10;
		setResult(result);
	}, [calculator]);

	return (
		<div className="relative z-10 flex w-full shrink-0 flex-col gap-5 overflow-hidden rounded-xl border  bg-opacity-0 bg-clip-padding p-8 drop-shadow-lg backdrop-blur-sm backdrop-filter  sm:p-10 sm:backdrop-blur-sm md:w-full lg:w-96 xl:w-[38rem] ">
			<div className="flex w-fit flex-col gap-1">
				<h2 className="text-accent-foreground font-title text-3xl font-black sm:text-5xl">Изчисли си БАЛ-а</h2>
				<p className="text-sm opacity-70">
					Друг начин, по който може да си изчислиш бала, е да ползваш този калкулатор
				</p>
			</div>
			<div className="flex w-full flex-col items-center justify-around gap-4 md:flex-row lg:flex-col xl:flex-row">
				<form className="flex w-full flex-col gap-5">
					<CalculatorField
						name="bgl"
						label="НВО БЕЛ"
						min={0}
						max={100}
						value={calculator.bgl}
						error={errorCalculator.bgl}
						onChange={handleChange}
					/>

					<CalculatorField
						name="math"
						label="НВО Математика"
						min={0}
						max={100}
						value={calculator.math}
						error={errorCalculator.math}
						onChange={handleChange}
					/>

					<CalculatorField
						name="math7"
						label="Оценка Математика"
						min={2}
						max={6}
						value={calculator.math7}
						error={errorCalculator.math7}
						onChange={handleChange}
					/>

					<CalculatorField
						name="phys7"
						label="Оценка Физика"
						min={2}
						max={6}
						value={calculator.phys7}
						error={errorCalculator.phys7}
						onChange={handleChange}
					/>
				</form>
				{result !== 0 && (
					<div className="flex aspect-square h-48  w-48 items-center justify-center rounded-full border  p-8 backdrop-blur-sm sm:backdrop-blur-md">
						<p className="text-accent-foregroundtext-5xl font-black">{result.toFixed(2)}</p>
					</div>
				)}
				{!result && result === 0 && (
					<div className="flex aspect-square h-48  w-48 items-center justify-center rounded-full border  p-8 backdrop-blur-sm sm:backdrop-blur-md" />
				)}
			</div>
		</div>
	);
};

export default Calculator;
