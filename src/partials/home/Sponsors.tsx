import { GradientHeading } from '@/components/ui/gradient-heading';
import {
	ALPHA_SPONSORS,
	BETA_SPONSORS,
	GAMMA_SPONSORS,
	MEDIA_PARTNERS,
	PARTNERS,
	Podkrepqsht,
} from '@/constants/home/sponsors';
import PodkrepqAutoDisplay from './sponsors/PodkrepqAutoDisplay';

async function randomStartIndex(podkrepqshti: Podkrepqsht[]) {
	return Math.floor(Math.random() * podkrepqshti.length);
}

export default async function Sponsors() {
	const [alphaStartIndex, betaStartIndex, gammaStartIndex, partnersStartIndex, mediaPartnersStartIndex] =
		await Promise.all([
			randomStartIndex(ALPHA_SPONSORS),
			randomStartIndex(BETA_SPONSORS),
			randomStartIndex(GAMMA_SPONSORS),
			randomStartIndex(PARTNERS),
			randomStartIndex(MEDIA_PARTNERS),
		]);

	return (
		<section id="sponsors" className="relative z-20 mb-20 p-8 md:p-12">
			<div className="py-4 pb-8">
				<GradientHeading size="lg">Спонсори</GradientHeading>
			</div>
			<h2 className="text-accent-foreground font-title mb-4 mt-32 text-center text-3xl font-black">
				Алфа Спонсори
			</h2>
			<PodkrepqAutoDisplay podkrepqshti={ALPHA_SPONSORS} startIndex={alphaStartIndex} />
			<h2 className="text-accent-foreground font-title mb-4 mt-32 text-center text-3xl font-black">
				Бета Спонсори
			</h2>
			<PodkrepqAutoDisplay podkrepqshti={BETA_SPONSORS} startIndex={betaStartIndex} />
			<h2 className="text-accent-foreground font-title mb-4 mt-32 text-center text-3xl font-black">
				Гама Спонсори
			</h2>
			<PodkrepqAutoDisplay podkrepqshti={GAMMA_SPONSORS} startIndex={gammaStartIndex} />
			<h2 className="text-accent-foreground font-title mb-4 mt-32 text-center text-3xl font-black">Партньори</h2>
			<PodkrepqAutoDisplay podkrepqshti={PARTNERS} startIndex={partnersStartIndex} />
			<h2 className="text-accent-foreground font-title mb-4 mt-32 text-center text-3xl font-black">
				Медийни Партньори
			</h2>
			<PodkrepqAutoDisplay podkrepqshti={MEDIA_PARTNERS} startIndex={mediaPartnersStartIndex} />
		</section>
	);
}
