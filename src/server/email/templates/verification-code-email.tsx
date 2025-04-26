import { Body, Container, Head, Heading, Html, Img, Link, Preview, Section, Text } from '@react-email/components';
import { Duration } from 'effect';

import { TF_TITLE } from '@/constants/seo';
import { VOTE_VERIFICATION_CODE_EXPIRATION_DURATION } from '@/constants/voting';

interface VerificationEmailProps {
	verificationCode: string;
	verificationCodeExpiresAt: Date;
	email: string;
	name: string;
	verificationCodeExpiryMinutes: number;
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export default function VerificationCodeEmail({
	verificationCode,
	email,
	name,
	verificationCodeExpiryMinutes,
}: VerificationEmailProps) {
	return (
		<Html>
			<Head />
			<Preview>Потвърждение на имейл за гласуване в {TF_TITLE}</Preview>
			<Body style={main}>
				<Section style={mottoSection}>
					<Img
						src={`${baseUrl}/logo/motto.png`}
						width={294}
						height={122}
						alt={`Логото на ${TF_TITLE}`}
						style={mottoImg}
					/>
				</Section>
				<Container style={container}>
					<Section style={contentSection}>
						<Heading style={h1}>Здравейте, {name}!</Heading>
						<Text style={mainText}>
							Започнахте процеса по гласуване за наградата "Избор на публиката" в {TF_TITLE}. За да
							потвърдите вашия глас, моля въведете следния код в уебсайта:
						</Text>

						<Section style={codeSection}>
							<Text style={codeText}>{verificationCode}</Text>
							<Text style={validityText}>(Кодът е валиден {verificationCodeExpiryMinutes} минути)</Text>
						</Section>

						<Text style={signatureText}>
							Поздрави,
							<br />
							Екипът на {TF_TITLE}
						</Text>
					</Section>

					<Section style={footerSection}>
						<Text style={footerText}>
							Този имейл е изпратен до {email}, защото някой въведе този адрес в процеса по гласуване в{' '}
							{TF_TITLE}. Ако не сте вие, можете спокойно да игнорирате това съобщение.
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

VerificationCodeEmail.PreviewProps = {
	verificationCode: '596853',
	verificationCodeExpiresAt: new Date(Date.now() + Duration.toMillis(VOTE_VERIFICATION_CODE_EXPIRATION_DURATION)),
	email: 'test@test.com',
	name: 'Иван Иванов',
	verificationCodeExpiryMinutes: 10,
} satisfies VerificationEmailProps;

const main = {
	backgroundColor: '#020817',
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
	margin: '40px auto',
	padding: '20px 0',
	backgroundColor: '#232c3d',
	borderRadius: '16px',
	border: '1px solid #334155',
	boxShadow: '0 4px 16px 0 rgba(30,41,59,0.25), 0 2px 4px -1px rgba(0,0,0,0.10)',
	maxWidth: '600px',
	backdropFilter: 'blur(8px)',
};

const mottoSection = {
	textAlign: 'center' as const,
	margin: '0 0 16px 0',
};

const mottoImg = {
	display: 'inline-block',
	width: '294px',
	height: '122px',
	maxWidth: '100%',
	borderRadius: '12px',
};

const contentSection = {
	padding: '0 32px',
};

const h1 = {
	color: '#f8fafc',
	fontSize: '24px',
	fontWeight: 'bold',
	textAlign: 'left' as const,
	margin: '16px 0',
};

const mainText = {
	color: '#f8fafc',
	fontSize: '16px',
	lineHeight: '24px',
	textAlign: 'left' as const,
	margin: '0 0 24px 0',
};

const codeSection = {
	margin: '32px 0',
	padding: '24px',
	backgroundColor: '#0f172a',
	borderRadius: '12px',
	border: '1px solid #1e293b',
	textAlign: 'center' as const,
};

const codeText = {
	// color: '#e11d48',
	color: '#f8fafc',
	fontSize: '48px',
	fontWeight: 'bold',
	letterSpacing: '0.1em',
	margin: '8px 0 8px 0',
};

const validityText = {
	color: '#94a3b8',
	fontSize: '14px',
	margin: '0',
};

const signatureText = {
	color: '#f8fafc',
	fontSize: '16px',
	lineHeight: '24px',
	margin: '32px 0',
};

const footerSection = {
	padding: '12px 32px 0 32px',
	borderTop: '1px solid #334155',
	marginTop: '32px',
};

const footerText = {
	color: '#94a3b8',
	fontSize: '12px',
	lineHeight: '18px',
	textAlign: 'center' as const,
};
