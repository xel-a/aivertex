export function getReadingTime(text: string, wordsPerMinute = 225) {
	const words = text
		.replace(/<[^>]*>/g, '')
		.trim()
		.split(/\s+/)
		.filter(Boolean).length;

	return {
		words,
		minutes: Math.ceil(words / wordsPerMinute),
	};
}
