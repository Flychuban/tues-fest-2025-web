export function ProjectDescription({ description }: { description: string }) {
	return description.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>);
}
