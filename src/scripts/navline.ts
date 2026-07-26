function initNavLine() {
	const indicator = document.getElementById('indicator') as HTMLElement;
	const currentPos = indicator.style.left;

	const currentLabel = document.querySelector('.nav-label.current') as HTMLElement;

	const targets = document.querySelectorAll('.nav-label[data-target], .point[data-target]');

	targets.forEach((target: any) => {
		target.addEventListener('mouseenter', () => {
			indicator.style.left = target.dataset.pos;

			// Only remove active if we're hovering a different page
			if (target.dataset.target !== currentLabel.dataset.target) {
				currentLabel.classList.remove('active');
			}
		});

		target.addEventListener('mouseleave', () => {
			indicator.style.left = currentPos;

			currentLabel.classList.add('active');
		});
	});
}

document.addEventListener('astro:page-load', initNavLine);
