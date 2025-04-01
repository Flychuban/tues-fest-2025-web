const TUESTalksPage = () => (
	<div className="flex h-[calc(100vh-var(--header-height)-var(--footer-height))] items-center justify-center p-8 md:p-12">
		<iframe
			className="w-[90%] max-w-[960px] overflow-hidden rounded-xl sm:w-[60%]"
			src="https://open.spotify.com/embed/show/2HGIZmqHAFtNwfXOrlTu7v?utm_source=generator"
			height="352"
			sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
			allow="autoplay *; encrypted-media *; clipboard-write"
			frameBorder="0"
			loading="lazy"
		></iframe>
	</div>
);

export default TUESTalksPage;
