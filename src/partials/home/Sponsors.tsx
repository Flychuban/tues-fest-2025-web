import { ALPHA_SPONSORS, BETA_SPONSORS, GAMMA_SPONSORS, MEDIA_PARTNERS, PARTNERS } from '@/constants/home/sponsors';
import PodkrepqAutoDisplay from './sponsors/PodkrepqAutoDisplay';

const Sponsors = () => (
	<section id="sponsors" className="relative z-20 mb-20 p-8 md:p-12">
		<div className="py-4 pb-8">
			<h2 className="text-accent-foreground font-title text-5xl font-black">Спонсори</h2>
		</div>
		<h2 className="text-accent-foreground font-title mb-4 mt-32 text-center text-3xl font-black">Алфа Спонсори</h2>
		<PodkrepqAutoDisplay podkrepqshti={ALPHA_SPONSORS} />
		<h2 className="text-accent-foreground font-title mb-4 mt-32 text-center text-3xl font-black">Бета Спонсори</h2>

		<PodkrepqAutoDisplay podkrepqshti={BETA_SPONSORS} />
		<h2 className="text-accent-foreground font-title mb-4 mt-32 text-center text-3xl font-black">Гама Спонсори</h2>
		<PodkrepqAutoDisplay podkrepqshti={GAMMA_SPONSORS} />
		<h2 className="text-accent-foreground font-title mb-4 mt-32 text-center text-3xl font-black">Партньори</h2>
		<PodkrepqAutoDisplay podkrepqshti={PARTNERS} />
		<h2 className="text-accent-foreground font-title mb-4 mt-32 text-center text-3xl font-black">
			Медийни Партньори
		</h2>
		<PodkrepqAutoDisplay podkrepqshti={MEDIA_PARTNERS} />
	</section>
);

export default Sponsors;
