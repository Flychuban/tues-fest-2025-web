import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';

const Controls = ({ handlePrev, handleNext }: { handlePrev: () => void; handleNext: () => void }) => (
	<div className="flex items-center justify-center gap-2">
		<button onClick={handlePrev} className="bg-background rounded-lg border p-2 text-2xl hover:opacity-90">
			<TbChevronLeft />
		</button>
		<button onClick={handleNext} className="bg-background rounded-lg border p-2 text-2xl hover:opacity-90">
			<TbChevronRight />
		</button>
	</div>
);

export default Controls;
