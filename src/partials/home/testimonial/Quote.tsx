import Image, { StaticImageData } from 'next/image';

import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const Quote = ({ img, name, text, desc }: { img: StaticImageData; name: string; text: string; desc: string }) => (
	<Card className="relative flex w-full max-w-3xl flex-col items-stretch justify-start gap-4 p-6 sm:flex-row">
		<div className="flex shrink-0 flex-col items-center justify-center gap-4 sm:w-32">
			<Image key={img.src} src={img} alt={name} className="!aspect-square !h-32 !w-32 rounded-lg" />
			<h2 className="font-inter text-lg font-bold leading-6 tracking-wide">{name}</h2>
		</div>
		{/* <div className="bg-stroke h-[1px] w-full shrink-0 sm:h-auto sm:w-[1px]" /> */}
		<Separator orientation="vertical" />
		<div className="flex flex-col justify-between gap-4">
			{text.length > 300 && (
				<ScrollArea className="h-[300px] md:h-[200px] ">
					<p className="text-justify">{text}</p>
				</ScrollArea>
			)}
			{text.length <= 300 && <p className="text-justify">{text}</p>}
			<i className="opacity-50">{desc}</i>
		</div>
	</Card>
);

export default Quote;
