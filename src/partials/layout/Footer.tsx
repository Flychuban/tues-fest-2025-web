import Link from 'next/link';
import { TbBrandLinktree } from 'react-icons/tb';

import { Separator } from '@/components/ui/separator';
import { TFLogo } from '../home/TFLogo';

const Socials = () => (
	<div className="flex items-center">
		<Link
			href="https://facebook.com/HackTUES"
			// name="social-link"
			aria-label="social-link"
			className="hover:text-primary mr-5 text-white"
		>
			<svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
				<path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.5701C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
			</svg>
		</Link>
		<Link
			href="https://www.instagram.com/hacktuesfest/"
			// name="social-link"
			aria-label="social-link"
			className="hover:text-primary mr-5 text-white"
		>
			<svg width="28" height="28" viewBox="0 0 24 24" className="fill-current">
				<svg fill="#ECECEC" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
					<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
					<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
					<g id="SVGRepo_iconCarrier">
						<path d="M20.445 5h-8.891A6.559 6.559 0 0 0 5 11.554v8.891A6.559 6.559 0 0 0 11.554 27h8.891a6.56 6.56 0 0 0 6.554-6.555v-8.891A6.557 6.557 0 0 0 20.445 5zm4.342 15.445a4.343 4.343 0 0 1-4.342 4.342h-8.891a4.341 4.341 0 0 1-4.341-4.342v-8.891a4.34 4.34 0 0 1 4.341-4.341h8.891a4.342 4.342 0 0 1 4.341 4.341l.001 8.891z"></path>
						<path d="M16 10.312c-3.138 0-5.688 2.551-5.688 5.688s2.551 5.688 5.688 5.688 5.688-2.551 5.688-5.688-2.55-5.688-5.688-5.688zm0 9.163a3.475 3.475 0 1 1-.001-6.95 3.475 3.475 0 0 1 .001 6.95zM21.7 8.991a1.363 1.363 0 1 1-1.364 1.364c0-.752.51-1.364 1.364-1.364z"></path>
					</g>
				</svg>
			</svg>
		</Link>
		<Link
			href="https://www.linkedin.com/company/hacktues-tuesfest/"
			// name="social-link"
			aria-label="social-link"
			className="hover:text-primary mr-5 text-white"
		>
			<svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
				<path d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z" />
			</svg>
		</Link>
		<Link
			href="https://linktr.ee/hacktuesfest"
			// name="social-link"
			aria-label="social-link"
			className="hover:text-primary mr-5 text-white"
		>
			<TbBrandLinktree size={24} />
		</Link>
		<Link
			href="https://www.youtube.com/@TUES"
			// name="social-link"
			aria-label="social-link"
			className="hover:text-primary mr-5 text-white"
		>
			<svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
				<path d="M10 15L15.19 12L10 9V15ZM21.56 7.17C21.69 7.64 21.78 8.27 21.84 9.07C21.91 9.87 21.94 10.56 21.94 11.16L22 12C22 14.19 21.84 15.8 21.56 16.83C21.31 17.73 20.73 18.31 19.83 18.56C19.36 18.69 18.5 18.78 17.18 18.84C15.88 18.91 14.69 18.94 13.59 18.94L12 19C7.81 19 5.2 18.84 4.17 18.56C3.27 18.31 2.69 17.73 2.44 16.83C2.31 16.36 2.22 15.73 2.16 14.93C2.09 14.13 2.06 13.44 2.06 12.84L2 12C2 9.81 2.16 8.2 2.44 7.17C2.69 6.27 3.27 5.69 4.17 5.44C4.64 5.31 5.5 5.22 6.82 5.16C8.12 5.09 9.31 5.06 10.41 5.06L12 5C16.19 5 18.8 5.16 19.83 5.44C20.73 5.69 21.31 6.27 21.56 7.17Z" />
			</svg>
		</Link>
	</div>
);

const Footer = () => (
	<footer className="relative z-20 mt-32 border-t bg-opacity-0 backdrop-blur-sm backdrop-filter sm:mt-10 sm:border-t-2 sm:backdrop-blur-md md:mt-14 lg:mt-0">
		<div className=" block w-full justify-center sm:flex sm:justify-between">
			<div className="m-1 justify-center pt-7 sm:justify-start sm:py-7 sm:pl-6">
				<TFLogo className="" />
			</div>
			<div className="py-4 sm:py-7">
				<p className="text-body-color text-center text-base font-medium">
					&copy; {new Date().getFullYear()} ТУЕС към ТУ-София. Всички права са запазени.
				</p>
			</div>
			<div className="flex justify-center sm:hidden ">
				<Separator decorative={true} className="w-2/3 " />
			</div>
			<div className="flex justify-center py-4 sm:justify-end sm:py-7">
				<Socials />
			</div>
		</div>
	</footer>
);

export default Footer;
