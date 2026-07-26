function initCrosshairWidget() {
	const stage = document.getElementById('stage')!;
	const svg = stage.querySelector('svg')!;

	// --- intro animation ---
	const axis = document.querySelector<SVGLineElement>('.axis')!;
	const axisLength = axis.getTotalLength();

	axis.style.transition = 'none';
	axis.style.strokeDasharray = `${axisLength}`;
	axis.style.strokeDashoffset = `${axisLength}`;
	axis.getBoundingClientRect();
	axis.style.transition = '';

	const diags = [
		{ el: document.getElementById('d1'), delay: 0 },
		{ el: document.getElementById('d2'), delay: 150 },
	];

	const DIAG_ROTATE_DURATION = 500; // .diag transform transition: 1s
	const AXIS_DRAW_DURATION = 300; // .axis stroke-dashoffset transition: 0.8s

	const lastDiagDelay = Math.max(...diags.map((d) => d.delay));
	const axisStart = lastDiagDelay + DIAG_ROTATE_DURATION;
	const loadedAt = axisStart + AXIS_DRAW_DURATION;

	requestAnimationFrame(() => {
		diags.forEach(({ el, delay }) => {
			setTimeout(() => {
				el!.style.transform = `rotate(${el!.dataset.angle}deg)`;
			}, delay);
		});
		setTimeout(() => {
			axis.style.strokeDashoffset = `0`;
		}, axisStart); // was: 300
		setTimeout(() => {
			svg.classList.add('loaded');
		}, loadedAt); // was: 1000
	});

	// --- cursor parallax ---
	stage.addEventListener('mousemove', (e) => {
		const rect = stage.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width - 0.5;
		const y = (e.clientY - rect.top) / rect.height - 0.5;
		svg.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
	});
	stage.addEventListener('mouseleave', () => {
		svg.style.transform = 'rotateY(0deg) rotateX(0deg)';
	});

	// --- dot position helper ---
	type Point = { x: number; y: number };

	const glow = document.querySelector<SVGCircleElement>('.glow')!;
	const dotCore = document.querySelector<SVGCircleElement>('.dot-core')!;
	const CENTER: Point = { x: 180, y: 150 };

	function setDotPosition(p: Point) {
		glow.setAttribute('cx', `${p.x}`);
		glow.setAttribute('cy', `${p.y}`);
		dotCore.setAttribute('cx', `${p.x}`);
		dotCore.setAttribute('cy', `${p.y}`);
	}

	const highlightLengths = new Map<SVGLineElement, number>();
	document.querySelectorAll<SVGLineElement>('.diag-highlight').forEach((el) => {
		const len = el.getTotalLength();
		highlightLengths.set(el, len);
		el.style.transition = 'none';
		el.style.strokeDasharray = `${len}`;
		el.style.strokeDashoffset = `${len}`;
		el.getBoundingClientRect();
		el.style.transition = '';
	});

	// --- hover-to-highlight (only the center-to-corner half) + dot travels there ---
	function link(labelId: string, highlightId: string, target: Point) {
		const label = document.getElementById(labelId);
		if (!label) return;
		const highlight = document.getElementById(highlightId) as SVGLineElement | null;
		const hit = label.nextElementSibling;
		const elements: Element[] = hit ? [label, hit] : [label];

		elements.forEach((el: Element) => {
			el.addEventListener('mouseenter', () => {
				label.classList.add('active');
				highlight?.classList.add('active');
				if (highlight) highlight.style.strokeDashoffset = '0';
				setDotPosition(target);
			});
			el.addEventListener('mouseleave', () => {
				label.classList.remove('active');
				highlight?.classList.remove('active');
				if (highlight) highlight.style.strokeDashoffset = `${highlightLengths.get(highlight)}`;
				setDotPosition(CENTER);
			});
		});
	}

	link('lAbout', 'hAbout', { x: 30, y: 30 });
	link('lBlog', 'hBlog', { x: 330, y: 30 });
	link('lContact', 'hContact', { x: 330, y: 270 });
	link('lLab', 'hLab', { x: 30, y: 270 });
}

document.addEventListener('astro:page-load', initCrosshairWidget);
